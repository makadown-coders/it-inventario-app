// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-checkbox-item/dropdown-menu-checkbox-item.component.ts
import { Component, HostBinding, Input, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckIcon } from 'lucide-angular'; // Import icon
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dropdown-menu-checkbox-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <span class="absolute left-2 flex items-center justify-center h-3.5 w-3.5">
      <!-- Show checkmark based on the 'checked' input -->
      <lucide-icon [img]="checkedIcon" class="h-4 w-4" *ngIf="checked"></lucide-icon>
    </span>
    <ng-content></ng-content>
  `,
 // styleUrls: ['./dropdown-menu-checkbox-item.component.scss'],
})
export class DropdownMenuCheckboxItemComponent implements AfterViewInit, OnDestroy {
  checkedIcon = CheckIcon;
  @Input() className: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

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
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
