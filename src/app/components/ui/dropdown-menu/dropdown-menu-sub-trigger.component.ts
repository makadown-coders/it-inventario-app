// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-sub-trigger/dropdown-menu-sub-trigger.component.ts
import { Component, HostBinding, Input, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRightIcon } from 'lucide-angular'; // Import icon
import { DropdownMenuSubComponent } from './dropdown-menu-sub.component'; // Import parent sub component
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: '[appDropdownMenuSubTrigger]', // Attribute selector
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <ng-content></ng-content>
    <lucide-icon [img]="chevronRightIcon" class="ml-auto"></lucide-icon>
  `,
 // styleUrls: ['./dropdown-menu-sub-trigger.component.scss'],
})
export class DropdownMenuSubTriggerComponent implements AfterViewInit, OnDestroy {
  chevronRightIcon = ChevronRightIcon;
  @Input() className: string = '';
  @Input() inset: boolean = false;
  @Output() subTriggerAction = new EventEmitter<void>(); // Event for hover/click

  private destroy$ = new Subject<void>();

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';
    const insetClass = this.inset ? 'pl-8' : '';
     // Note: data-[state=open] and [&_svg] require specific handling
    return `${baseClasses} ${insetClass} ${this.className}`;
  }

  constructor(public el: ElementRef, private subComponent: DropdownMenuSubComponent) {}

  ngAfterViewInit(): void {
    // Add hover and click listeners
    this.el.nativeElement.addEventListener('mouseenter', () => {
       this.subComponent.openSubMenu();
    });
     this.el.nativeElement.addEventListener('click', () => {
       this.subComponent.openSubMenu();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
