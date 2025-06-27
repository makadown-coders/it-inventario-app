// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-shortcut/dropdown-menu-shortcut.component.ts
import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu-shortcut',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
  //styleUrls: ['./dropdown-menu-shortcut.component.scss'],
})
export class DropdownMenuShortcutComponent {
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'ml-auto text-xs tracking-widest opacity-60';
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
