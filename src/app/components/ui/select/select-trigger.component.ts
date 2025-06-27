// angular-inventory-app/src/app/components/ui/select/select-trigger/select-trigger.component.ts
import { Component, HostBinding, Input, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter, Optional, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDownIcon } from 'lucide-angular';
import { SelectComponent } from './select.component'; // Import parent component
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-trigger',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <ng-content></ng-content>
    <lucide-icon [img]="chevronDownIcon" class="h-4 w-4 opacity-50"></lucide-icon>
  `,
  styleUrls: ['./select-trigger.component.scss'],
})
export class SelectTriggerComponent implements AfterViewInit, OnDestroy {
  @Input() className: string = '';
  @Output() triggerClick = new EventEmitter<void>();
  chevronDownIcon = ChevronDownIcon;

  private destroy$ = new Subject<void>();

  // Use @HostBinding to apply base and input classes
  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1';
    // Add disabled class based on parent SelectComponent state
    const disabledClass = this.selectComponent.disabled ? 'disabled:cursor-not-allowed disabled:opacity-50' : '';
    return `${baseClasses} ${disabledClass} ${this.className}`;
  }

  // Inject the parent SelectComponent
  constructor(public el: ElementRef, @Optional() private selectComponent: SelectComponent) {} // Make el public, make parent optional


  ngAfterViewInit(): void {
    if (this.selectComponent) { // Ensure parent component exists
        // Add click listener to the host element
        this.el.nativeElement.addEventListener('click', () => {
          if (!this.selectComponent.disabled) { // Check if parent is not disabled
             this.triggerClick.emit();
             this.selectComponent.open = !this.selectComponent.open; // Toggle the parent select's open state using the setter
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
