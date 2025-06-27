// angular-inventory-app/src/app/components/ui/form/form-label/form-label.component.ts
import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-label',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
 // styleUrls: ['./form-label.component.scss'],
})
export class FormLabelComponent {
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';
     // Note: peer-disabled requires specific handling
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
