// angular-inventory-app/src/app/components/ui/dialog/dialog-title/dialog-title.component.ts
import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-title',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
//  styleUrls: ['./dialog-title.component.scss'],
})
export class DialogTitleComponent {
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'text-lg font-semibold leading-none tracking-tight';
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
