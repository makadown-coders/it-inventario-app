// angular-inventory-app/src/app/components/ui/select/select-separator/select-separator.component.ts
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-separator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: '', // No content needed
  styleUrls: ['./select-separator.component.scss'],
})
export class SelectSeparatorComponent {
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = '-mx-1 my-1 h-px bg-muted';
    return `${baseClasses} ${this.className}`;
  }

  constructor() {}
}
