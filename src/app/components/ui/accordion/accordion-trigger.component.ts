import { Component, Output, EventEmitter, HostListener, Inject, SkipSelf } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { AccordionItemComponent } from './accordion-item.component';


@Component({
  selector: 'app-accordion-trigger',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './accordion-trigger.component.html',
  styleUrl: './accordion-trigger.component.scss',
})
export class AccordionTriggerComponent {
  constructor(@Inject(AccordionItemComponent) @SkipSelf() private accordionItem: AccordionItemComponent) {}

  @Output() toggle = new EventEmitter<void>();

  @HostListener('click')
  onClick() {
    this.toggle.emit();
  }

  get isOpen(): boolean {
    return this.accordionItem.isOpen;
  }
}

