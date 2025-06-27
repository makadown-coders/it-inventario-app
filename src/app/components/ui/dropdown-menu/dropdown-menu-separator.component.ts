// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-separator/dropdown-menu-separator.component.ts
import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu-separator',
  standalone: true,
  imports: [CommonModule],
  template: '', // No content needed
//  styleUrls: ['./dropdown-menu-separator.component.scss'],
})
export class DropdownMenuSeparatorComponent {
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = '-mx-1 my-1 h-px bg-muted';
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
