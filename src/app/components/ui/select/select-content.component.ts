// angular-inventory-app/src/app/components/ui/select/select-content/select-content.component.ts
import { Component, HostBinding, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component'; // Import parent component
import { SelectScrollUpButtonComponent } from './select-scrollup-button.component'; // Import
import { SelectScrollDownButtonComponent } from './select-scrolldown-button.component'; // Import

@Component({
  selector: 'app-select-content',
  standalone: true,
  imports: [CommonModule, SelectScrollUpButtonComponent, SelectScrollDownButtonComponent], // Import scroll buttons
  template: `
    <div *ngIf="selectComponent.open" class="select-content-container">
      <app-select-scroll-up-button></app-select-scroll-up-button>
      <div class="select-viewport">
        <ng-content></ng-content>
      </div>
      <app-select-scroll-down-button></app-select-scroll-down-button>
    </div>
  `,
  styleUrls: ['./select-content.component.scss'],
})
export class SelectContentComponent implements AfterViewInit {
  @Input() className: string = '';
  @Input() position: 'popper' | 'item-aligned' = 'popper';

  // Combine base classes with input className
  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';
    const positionClasses = this.position === 'popper' ? 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1' : '';
    // Note: Animations and data attributes like data-[state] and data-[side]
    // will need a different implementation strategy in Angular, potentially
    // using Angular's Animation module or managing classes based on state.
    // This is a simplified application of classes based on the React code.
    return `${baseClasses} ${positionClasses} ${this.className}`;
  }

  constructor(public selectComponent: SelectComponent, private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // You might need to implement positioning logic here based on the 'position' input
    // and the trigger element's position. Libraries like @angular/cdk/overlay can help.
  }
}
