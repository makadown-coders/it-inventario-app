// angular-inventory-app/src/app/components/ui/select/select-scroll-down-button/select-scroll-down-button.component.ts
import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDownIcon } from 'lucide-angular'; // Import icon

@Component({
  selector: 'app-select-scroll-down-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <lucide-icon [img]="chevronDownIcon" class="h-4 w-4"></lucide-icon>
  `,
  //styleUrls: ['./select-scroll-down-button.component.scss'],
})
export class SelectScrollDownButtonComponent {
  chevronDownIcon = ChevronDownIcon
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'flex cursor-default items-center justify-center py-1';
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
