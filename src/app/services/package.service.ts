import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { Package, PackageWithDeps } from '../shared/models/package.model';
import { API_URL } from '../tokens/api-url.token';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  // for caching request
  #packagesWithDependencies$?: Observable<PackageWithDeps[]>; 

  constructor(private http: HttpClient, @Inject(API_URL) private url: string){}

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.url}/packages`)
  }

  getPackageDependencies (id: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/packages/${id}/dependencies`)
  }

  getPackagesWithDependencies(): Observable<PackageWithDeps[]> {    
    if (!this.#packagesWithDependencies$) {
      this.#packagesWithDependencies$ = this.getPackages()
      .pipe(
        switchMap(packages => {
          const requests = packages.map((pkg: Package) => {
            const [prefix, ...rest] = pkg.id.split('/');
            const basePkg: Required<Package> = {
              ...pkg, 
              prefix: rest.length ? `${prefix}/` : prefix,
              suffix: rest.join('/')
            };

            if (!pkg.dependencyCount) {
              return of({
                ...basePkg, 
                dependencies: []
              })
            }

            return this.getPackageDependencies(pkg.id)
              .pipe(
                map(dependencies => ({
                  ...basePkg,
                  dependencies
                })),
                catchError(_ => of({
                  ...basePkg,
                  dependencies: []
                }))
              )
          });
          
          return forkJoin(requests)
        }),
        catchError(_ => of([])),
        shareReplay(1)
      )
    }

    return this.#packagesWithDependencies$;
  }
}
