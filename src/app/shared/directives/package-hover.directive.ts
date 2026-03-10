import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { PackageWithDeps } from '../models/package.model';

@Directive({
  selector: '[appPackageHover]',
})
export class PackageHoverDirective {
  @Input() pkg!: PackageWithDeps;
  @Output() packageEnter = new EventEmitter<PackageWithDeps>();
  @Output() packageLeave = new EventEmitter<void>()
  
  constructor() {}

  @HostBinding('style.cursor') cursor = 'pointer';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.packageEnter.emit(this.pkg)
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.packageLeave.emit()
  }
}
