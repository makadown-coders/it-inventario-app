import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'app-accordion-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-content.component.html',
  styleUrls: ['./accordion-content.component.scss']
})
export class AccordionContentComponent {
  @Input() isOpen = false;
  constructor(public accordionItem: AccordionItemComponent) {}
}


