// angular-inventory-app/src/app/components/ui/dialog/dialog-trigger.directive.ts
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDialogTrigger]', // Attribute selector
  standalone: true,
})
export class DialogTriggerDirective {
  @Output() triggerClick = new EventEmitter<void>();

  constructor(public el: ElementRef) {} // Make el public

  @HostListener('click') onClick(): void {
    this.triggerClick.emit();
  }
}
