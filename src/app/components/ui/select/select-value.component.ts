// angular-inventory-app/src/app/components/ui/select/select-value/select-value.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-value',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
})
export class SelectValueComponent {
  constructor() {}
}
