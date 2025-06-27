// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-group/dropdown-menu-group.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu-group',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
})
export class DropdownMenuGroupComponent {
  constructor() {}
}
