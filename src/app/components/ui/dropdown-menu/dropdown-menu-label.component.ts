// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-label/dropdown-menu-label.component.ts
import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu-label',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
//  styleUrls: ['./dropdown-menu-label.component.scss'],
})
export class DropdownMenuLabelComponent {
  @Input() className: string = '';
  @Input() inset: boolean = false;

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'px-2 py-1.5 text-sm font-semibold';
    const insetClass = this.inset ? 'pl-8' : '';
    return `${baseClasses} ${insetClass} ${this.className}`;
  }

  constructor() {}
}
