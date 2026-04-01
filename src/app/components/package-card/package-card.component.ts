import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackageWithDeps } from '../../shared/models/package.model';
import { PackageHoverDirective } from '../../shared/directives/package-hover.directive';
import { ShortNumberPipe } from '../../shared/pipes/short-number-pipe';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    PackageHoverDirective,
    ShortNumberPipe],
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.scss',
})
export class PackageCardComponent {
  pkg = input.required<PackageWithDeps>();
  hoveredId = input<string | null>();
  hoveredDependencies = input.required<string[]>();
  packageEnter = output<PackageWithDeps>();
  packageLeave = output<void>();

  hoveredDependenciesSet = computed(() => new Set(this.hoveredDependencies()));

  constructor(){}
}
