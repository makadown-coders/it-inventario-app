import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-collapsible',
  standalone: true,
  imports: [CommonModule, CdkAccordionModule],
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss']
})
export class CollapsibleComponent { }