import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart-legend-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-legend-content.component.html',
  styleUrls: ['./chart-legend-content.component.scss']
})
export class ChartLegendContentComponent {
  @Input() payload: any[] = []; // Define input for legend payload
  @Input() verticalAlign: 'top' | 'bottom' = 'bottom';
  @Input() nameKey?: string;
  @Input() hideIcon = false;
}
