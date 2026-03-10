import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() pkg!: PackageWithDeps;
  @Input() hoveredId!: string | null;
  @Input() hoveredDependencies!: string[];

  @Output() packageEnter = new EventEmitter<PackageWithDeps>();
  @Output() packageLeave = new EventEmitter<void>();

  constructor(){}

  ngOnInit() {}
}
