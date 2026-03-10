import { ChangeDetectorRef, Component } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackageService } from '../../services/package.service';
import { PackageCardComponent } from '../package-card/package-card.component';
import { PackageWithDeps } from '../../shared/models/package.model';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    PackageCardComponent],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.scss',
})
export class PackageListComponent {
  #destroy$ = new Subject<void>();
  searchedItem!: string;
  packages: PackageWithDeps[] = [];
  filteredPackages: PackageWithDeps[] = [];
  hoveredId: string | null = null;
  hoveredDependencies: string[] = [];
  isLoading: boolean = false;

  constructor(private packageService: PackageService, private cd: ChangeDetectorRef){}

  ngOnInit(){
    this.getPackagesWithDependencies()
  }

  ngOnDestroy(){
    this.#destroy$.next();
    this.#destroy$.complete()
  }

  getPackagesWithDependencies() {
    this.isLoading = true
    this.packageService.getPackagesWithDependencies()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.searchedItem = '';
        }),
        takeUntil(this.#destroy$)
      )
      .subscribe(packages => {
        this.packages = this.filteredPackages = packages;
        this.cd.markForCheck();
      })
  }

  filterByName() {
    // for large data is better to use fromEvent with debounceTime and distinctUntilChange
    const search = this.searchedItem.trim().toLowerCase();
    this.filteredPackages = this.searchedItem ? 
      this.packages.filter(pkg => pkg.id.toLowerCase().includes(search)) : 
      this.packages
  }

  trackById(index: number, pkg: PackageWithDeps) {
    return pkg.id
  }

  onPackageEnter(pkg: PackageWithDeps) {
    this.hoveredId = pkg.id;
    this.hoveredDependencies = pkg.dependencies;
  }

  onPackageLeave() {
    this.hoveredId = null;
    this.hoveredDependencies = []
  }
}
