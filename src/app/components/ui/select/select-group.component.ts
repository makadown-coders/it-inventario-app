// angular-inventory-app/src/app/components/ui/select/select-group/select-group.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-group',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
})
export class SelectGroupComponent {
  constructor() {}
}
