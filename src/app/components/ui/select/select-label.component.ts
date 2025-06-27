// angular-inventory-app/src/app/components/ui/select/select-label/select-label.component.ts
import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-label',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
  styleUrls: ['./select-label.component.scss'],
})
export class SelectLabelComponent {
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'py-1.5 pl-8 pr-2 text-sm font-semibold';
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
