import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-collapsible-content',
  standalone: true,
  imports: [CommonModule, CdkAccordionModule],
  templateUrl: './collapsible-content.component.html',
  styleUrls: ['./collapsible-content.component.scss']
})
export class CollapsibleContentComponent {
}