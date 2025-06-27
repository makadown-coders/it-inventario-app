// angular-inventory-app/src/app/components/ui/popover/popover-trigger.directive.ts
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appPopoverTrigger]', // Attribute selector
  standalone: true,
})
export class PopoverTriggerDirective {
  @Output() triggerClick = new EventEmitter<void>();

  constructor(public el: ElementRef) {} // Make el public

  @HostListener('click') onClick(): void {
    this.triggerClick.emit();
  }
}
