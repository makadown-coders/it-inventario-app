// angular-inventory-app/src/app/components/ui/select/select-scroll-up-button/select-scroll-up-button.component.ts
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronUpIcon } from 'lucide-angular'; // Import icon

@Component({
  selector: 'app-select-scroll-up-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <lucide-icon [img]="chevronUpIcon" class="h-4 w-4"></lucide-icon>
  `,
 // styleUrls: ['./select-scroll-up-button.component.scss'],
})
export class SelectScrollUpButtonComponent {
  chevronUpIcon = ChevronUpIcon;
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'flex cursor-default items-center justify-center py-1';
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
