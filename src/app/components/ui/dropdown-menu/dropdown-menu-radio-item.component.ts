// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-radio-item/dropdown-menu-radio-item.component.ts
import { Component, HostBinding, Input, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CircleIcon } from 'lucide-angular'; // Import icon
import { Subject, takeUntil } from 'rxjs';
// We'll need a way to manage the selected radio item within a group

@Component({
  selector: 'app-dropdown-menu-radio-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <span class="absolute left-2 flex items-center justify-center h-3.5 w-3.5">
      <!-- Show circle based on whether this item is selected in the group -->
      <!-- We'll need to determine selection based on the parent radio group -->
      <lucide-icon [img]="circleIcon" class="h-2 w-2 fill-current" *ngIf="isSelected"></lucide-icon>
    </span>
    <ng-content></ng-content>
  `,
 // styleUrls: ['./dropdown-menu-radio-item.component.scss'],
})
export class DropdownMenuRadioItemComponent implements AfterViewInit, OnDestroy {
  circleIcon = CircleIcon
  @Input() className: string = '';
  @Input() value: any; // The value of the radio item
  @Input() disabled: boolean = false;

  // We'll need an input or a service to know the selected value of the radio group
  isSelected: boolean = false; // Placeholder

  private destroy$ = new Subject<void>();

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50';
    return `${baseClasses} ${this.className}`;
  }

    @HostBinding('attr.data-disabled') get dataDisabledAttr(): boolean | null {
    return this.disabled ? true : null;
  }


  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
     this.el.nativeElement.addEventListener('click', () => {
      if (!this.disabled) {
        // TODO: Notify parent radio group of selection
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
