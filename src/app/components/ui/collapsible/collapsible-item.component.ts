import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule, CdkAccordionItem } from '@angular/cdk/accordion';

@Component({
  selector: 'app-collapsible-item',
  standalone: true,
  imports: [CommonModule, CdkAccordionModule],
  templateUrl: './collapsible-item.component.html',
  styleUrls: ['./collapsible-item.component.scss']
})
export class CollapsibleItemComponent {}
