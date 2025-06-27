import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType, ChartOptions } from 'chart.js';
import { ChartConfig } from './chart.types';


@Component({
    selector: 'app-chart-container',
    standalone: true,
    imports: [CommonModule, BaseChartDirective],
    templateUrl: './chart-container.component.html',
    styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit, OnChanges {
    @Input() config: ChartConfig = {};
    @Input() data: any; // Input for chart data

    public chartData: ChartData;
    public chartOptions: ChartOptions;
    public chartType: ChartType = 'bar'; // Default chart type

    constructor() {
        // Initialize with basic default values
        this.chartData = {
            datasets: [],
            labels: []
        };
        this.chartOptions = {};
    }

    ngOnInit(): void {
        this.updateChart();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] || changes['config']) {
            this.updateChart();
        }
    }

    private updateChart(): void {
        if (!this.data || !this.config) {
            return;
        }

        // Example: Simple bar chart configuration
        this.chartType = 'bar';
        this.chartData = {
            labels: Object.keys(this.data[0] || {}).filter(key => key !== 'name'), // Assuming 'name' is for labels
            datasets: this.data.map((item: any) => {
                const dataset: any = {
                    label: item.name,
                    data: Object.keys(item).filter(key => key !== 'name').map(key => item[key]),
                };

                // Apply color from config if available
                if (this.config[item.name]?.color) {
                    dataset.backgroundColor = this.config[item.name].color;
                }

                return dataset;
            })
        };
        this.chartOptions = {}; // Add more options based on ChartConfig and desired appearance
    }
}
