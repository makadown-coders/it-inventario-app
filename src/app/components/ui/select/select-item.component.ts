// angular-inventory-app/src/app/components/ui/select/select-item/select-item.component.ts
import { Component, HostBinding, Input, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component'; // Import parent component
import { LucideAngularModule, CheckIcon } from 'lucide-angular'; // Import icon
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <span class="absolute left-2 flex items-center justify-center h-3.5 w-3.5">
      <!-- We'll handle the checkmark visibility based on selection -->
      <lucide-icon [img]="checkIcon" class="h-4 w-4" *ngIf="isSelected"></lucide-icon>
    </span>
    <ng-content></ng-content>
  `,
  styleUrls: ['./select-item.component.scss'],
})
export class SelectItemComponent implements AfterViewInit, OnDestroy {
  checkIcon = CheckIcon;
  @Input() className: string = '';
  @Input() value: any; // The value of the item
  @Input() disabled: boolean = false; // Disabled state

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50';
     // Note: data-[disabled] requires handling with [attr.data-disabled] or [class.data-\[disabled\]]
    return `${baseClasses} ${this.className}`;
  }

  @HostBinding('attr.data-disabled') get dataDisabledAttr(): boolean | null {
    return this.disabled ? true : null;
  }

  get isSelected(): boolean {
    return this.selectComponent.value === this.value;
  }

  private destroy$ = new Subject<void>();

  constructor(private selectComponent: SelectComponent, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Add click listener to the host element
    this.el.nativeElement.addEventListener('click', () => {
      if (!this.disabled) {
        this.selectComponent.selectItem(this.value); // Notify parent SelectComponent of selection
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
