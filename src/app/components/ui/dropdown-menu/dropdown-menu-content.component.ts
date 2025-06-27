// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-content/dropdown-menu-content.component.ts
import { Component, HostBinding, inject, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu.component'; // Import parent component
import { DropdownMenuPortalDirective } from './dropdown-menu-portal.directive'; // Import the portal directive

@Component({
  selector: 'app-dropdown-menu-content',
  standalone: true,
  imports: [CommonModule, 
  //  DropdownMenuPortalDirective
  ], // Import the portal directive here
  template: `
    <ng-template>
      <div [ngClass]="hostClasses">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
 // styleUrls: ['./dropdown-menu-content.component.scss'],
})
export class DropdownMenuContentComponent {
  @Input() className: string = '';
  @Input() sideOffset: number = 4; // Still useful for positioning logic later
  @Input() align: 'start' | 'center' | 'end' = 'end'; // Still useful for positioning logic later

  // Get a reference to the ng-template and make it public
  @ViewChild(TemplateRef) public contentTemplate!: TemplateRef<any>; // Make public
  public viewContainerRef = inject(ViewContainerRef);

  // Combine base classes with input className - applied to the *inner* div
  get hostClasses(): string {
    const baseClasses = 'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';
    // Removed positionClasses logic
    // Note: Animations and data attributes require additional implementation in Angular.
    return `${baseClasses} ${this.className}`;
  }

  constructor(public dropdownMenuComponent: DropdownMenuComponent) {}
}
