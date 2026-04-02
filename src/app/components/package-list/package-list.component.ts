import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  isLoading = signal<boolean>(false);
  searchedItem = signal<string>('');
  private readonly packages = signal<PackageWithDeps[]>([]);

  filteredPackages = computed(() => {
    const name = (this.searchedItem() ?? '').trim().toLowerCase();
    const filteredPackages = name ? this.packages().filter(pkg => pkg.id.toLowerCase().includes(name)) : [...this.packages()];
    return filteredPackages;
  })
  
  hoveredId = signal<string | null>(null);
  hoveredDependencies = signal<string[]>([]);

  private packageService = inject(PackageService);
  private destroyRef = inject(DestroyRef);

  constructor(){}

  ngOnInit(){
    this.getPackagesWithDependencies()
  }

  getPackagesWithDependencies() {
    this.isLoading.set(true);

    this.packageService.getPackagesWithDependencies()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(packages => this.packages.set(packages))
  }

  onPackageEnter(pkg: PackageWithDeps) {
    this.hoveredId.set(pkg.id);
    this.hoveredDependencies.set(pkg.dependencies);
  }

  onPackageLeave() {
    this.hoveredId.set(null);
    this.hoveredDependencies.set([])
  }
}
