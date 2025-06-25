import { Component, Input, Inject, Optional, HostBinding } from '@angular/core';
import { AccordionComponent } from './accordion.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion-item',
  standalone: true, // This is already set, just confirming
  imports: [CommonModule],
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss']
})
export class AccordionItemComponent {
  @Input() value!: string;

  // Inject the parent AccordionComponent
  constructor(@Optional() @Inject(AccordionComponent) private accordion: AccordionComponent) {}

  // Getter to check if the item is open
  get isOpen(): boolean {
    // Check if accordion exists and if the item's value is in the accordion's value (string or array)
    return this.accordion && (
      (typeof this.accordion.value === 'string' && this.accordion.value === this.value) ||
      (Array.isArray(this.accordion.value) && this.accordion.value.includes(this.value))
    );
  }
}
