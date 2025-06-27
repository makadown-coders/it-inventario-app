// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-radio-group/dropdown-menu-radio-group.component.ts
import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { DropdownMenuRadioItemComponent } from './dropdown-menu-radio-item.component';

@Component({
  selector: 'app-dropdown-menu-radio-group',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
})
export class DropdownMenuRadioGroupComponent implements AfterContentInit {
  @Input() value: any; // The currently selected value
  @Output() valueChange = new EventEmitter<any>(); // Event when selection changes

  // Get references to all radio items within this group
  @ContentChildren(DropdownMenuRadioItemComponent) radioItems!: QueryList<DropdownMenuRadioItemComponent>;

  constructor() {}

  ngAfterContentInit(): void {
    // Subscribe to click events from radio items
    this.radioItems.forEach(item => {
      // We need an event emitter on the radio item for clicks
      // item.itemClick.pipe(takeUntil(this.destroy$)).subscribe(() => {
      //    this.selectItem(item.value);
      // });
    });
    // Set the initial selected state of the radio items
    this.updateSelectedState();
  }

   selectItem(value: any): void {
     this.value = value;
     this.valueChange.emit(value);
     this.updateSelectedState();
     // TODO: Close the dropdown menu after selection
   }

   private updateSelectedState(): void {
     this.radioItems.forEach(item => {
       item.isSelected = item.value === this.value;
     });
   }
}
