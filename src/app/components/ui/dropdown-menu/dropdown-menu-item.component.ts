// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-item/dropdown-menu-item.component.ts
import { Component, HostBinding, Input, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dropdown-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
  // styleUrls: ['./dropdown-menu-item.component.scss'],
})
export class DropdownMenuItemComponent implements AfterViewInit, OnDestroy {
  @Input() className: string = '';
  @Input() inset: boolean = false;
  @Input() disabled: boolean = false;
  @Output() itemClick = new EventEmitter<void>();

  private destroy$ = new Subject<void>();

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';
     // Note: data-[disabled] and [&_svg] require specific handling
    const insetClass = this.inset ? 'pl-8' : '';
    return `${baseClasses} ${insetClass} ${this.className}`;
  }

  @HostBinding('attr.data-disabled') get dataDisabledAttr(): boolean | null {
    return this.disabled ? true : null;
  }

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.addEventListener('click', () => {
      if (!this.disabled) {
        this.itemClick.emit();
        // TODO: Close the dropdown menu after clicking an item (unless it's a checkbox/radio)
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
