// angular-inventory-app/src/app/components/ui/dialog/dialog-header/dialog-header.component.ts
import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-header',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
  // styleUrls: ['./dialog-header.component.scss'],
})
export class DialogHeaderComponent {
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'flex flex-col space-y-1.5 text-center sm:text-left';
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
