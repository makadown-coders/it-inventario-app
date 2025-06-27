import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-collapsible-trigger',
  standalone: true,
  imports: [CommonModule, CdkAccordionModule],
  templateUrl: './collapsible-trigger.component.html',
  styleUrls: ['./collapsible-trigger.component.scss']
})
export class CollapsibleTriggerComponent {
}