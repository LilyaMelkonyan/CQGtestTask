import { Directive, HostBinding, HostListener, input, output } from '@angular/core';
import { PackageWithDeps } from '../models/package.model';

@Directive({
  selector: '[appPackageHover]',
})
export class PackageHoverDirective {
  pkg = input.required<PackageWithDeps>();
  packageEnter = output<PackageWithDeps>();
  packageLeave = output<void>();
  
  constructor() {}

  @HostBinding('style.cursor') cursor = 'pointer';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.packageEnter.emit(this.pkg())
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.packageLeave.emit()
  }
}
