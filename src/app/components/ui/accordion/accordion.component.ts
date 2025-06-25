import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() value: string | string[] | undefined;
  @Output() valueChange = new EventEmitter<string | string[] | undefined>();

  toggleItem(itemValue: string) {
    if (this.type === 'single') {
      const newValue = this.value === itemValue ? undefined : itemValue;
      this.value = newValue;
      this.valueChange.emit(newValue);
    } else if (this.type === 'multiple') {
      let newValue: string[] = Array.isArray(this.value) ? [...this.value!] : [];

      if (newValue.includes(itemValue)) {
        newValue = newValue.filter((value) => value !== itemValue);
      } else {
        newValue.push(itemValue);
      }
      this.value = newValue;
      this.valueChange.emit(newValue);
    }
  }
}

