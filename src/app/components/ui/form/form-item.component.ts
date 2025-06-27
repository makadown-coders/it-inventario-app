// angular-inventory-app/src/app/components/ui/form/form-item/form-item.component.ts
import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
//  styleUrls: ['./form-item.component.scss'],
})
export class FormItemComponent {
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'space-y-2';
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
