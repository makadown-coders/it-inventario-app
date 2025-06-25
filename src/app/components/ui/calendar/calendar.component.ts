import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

type CalendarMode = 'single' | 'multiple' | 'range';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule, MatDatepickerModule, MatCardModule, MatNativeDateModule],
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
    // @Input() selected: Date | Date[] | { from: Date, to: Date } | null = null;
    @Input() selected: Date | null = null;
    @Input() mode: CalendarMode = 'single';
    @Input() initialFocus: boolean = false; // Placeholder for potential library option
    @Input() numberOfMonths: number = 1; // Placeholder for potential library option

    @Output() select = new EventEmitter<MatDatepickerInputEvent<Date | null>>();

    onSelect(event: any /*MatDatepickerInputEvent<Date | null>*/): void {
        this.select.emit(event);
    }

    dateClass = (date: Date): string | string[] => {
        if (date.getDate() === 26 && date.getMonth() === 9 && date.getFullYear() === 2023) { // Month is 0-indexed
            return 'my-custom-date';
        }
        return '';
    }

}
