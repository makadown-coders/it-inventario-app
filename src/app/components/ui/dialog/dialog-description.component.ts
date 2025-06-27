// angular-inventory-app/src/app/components/ui/dialog/dialog-description/dialog-description.component.ts
import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-description',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
  //styleUrls: ['./dialog-description.component.scss'],
})
export class DialogDescriptionComponent {
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'text-sm text-muted-foreground';
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
