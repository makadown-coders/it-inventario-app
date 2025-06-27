import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chart-tooltip-content',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chart-tooltip-content.component.html',
    styleUrls: ['./chart-tooltip-content.component.scss']
})
export class ChartTooltipContentComponent {
    @Input() active: any; // TODO: Define a more specific type based on the charting library
    @Input() payload: any; // TODO: Define a more specific type based on the charting library
    @Input() hideLabel: boolean = false;
    @Input() hideIndicator: boolean = false;
    @Input() indicator: 'line' | 'dot' | 'dashed' = 'dot';
    @Input() label: any; // TODO: Define a more specific type
    @Input() labelFormatter: any; // TODO: Define a more specific type
    @Input() labelClassName: string = '';
    @Input() formatter: any; // TODO: Define a more specific type
    @Input() color: any; // TODO: Define a more specific type
    @Input() nameKey: string = '';
    @Input() labelKey: string = '';
}
