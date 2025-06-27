// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-sub/dropdown-menu-sub.component.ts
import { Component, ContentChild, AfterContentInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
// Import sub-trigger and sub-content components (forward declare initially)
// import { DropdownMenuSubTriggerComponent } from '../dropdown-menu-sub-trigger/dropdown-menu-sub-trigger.component';
// import { DropdownMenuSubContentComponent } from '../dropdown-menu-sub-content/dropdown-menu-sub-content.component';


@Component({
  selector: 'app-dropdown-menu-sub',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
})
export class DropdownMenuSubComponent implements AfterContentInit, OnDestroy {
   private _open = false;
   private destroy$ = new Subject<void>();

   // Get references to the sub-trigger and sub-content
   @ContentChild('subTrigger') subTrigger!: any; // Placeholder
   @ContentChild('subContent') subContent!: any; // Placeholder

   get open(): boolean {
     return this._open;
   }

   set open(value: boolean) {
     this._open = value;
     // You might emit an openChange event here
     // Notify sub-content component about the open state change
   }

  constructor() {}

  ngAfterContentInit(): void {
    if (this.subTrigger) {
      // We'll need an event emitter on SubTrigger for hover/click
      // this.subTrigger.hoverOrClick.pipe(takeUntil(this.destroy$)).subscribe(() => {
      //   this.toggle();
      // });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggle(): void {
    this.open = !this.open;
  }

  openSubMenu(): void {
    this.open = true;
  }

  close(): void {
    this.open = false;
  }
}
