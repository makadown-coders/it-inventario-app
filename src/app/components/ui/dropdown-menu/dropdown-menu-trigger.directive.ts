// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-trigger.directive.ts
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { DropdownMenuComponent } from './dropdown-menu.component'; // Import parent component

@Directive({
  selector: '[appDropdownMenuTrigger]', // Attribute selector
  standalone: true,
})
export class DropdownMenuTriggerDirective {
  @Output() triggerClick = new EventEmitter<void>();

  constructor(public el: ElementRef, private dropdownMenuComponent: DropdownMenuComponent) {}

  @HostListener('click') onClick(): void {
    this.triggerClick.emit();
    // The parent component will handle the toggle based on this event
  }
}
