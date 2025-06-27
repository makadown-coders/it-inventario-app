// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu-sub-content/dropdown-menu-sub-content.component.ts
import { Component, HostBinding, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuSubComponent } from './dropdown-menu-sub.component'; // Import parent sub component
import { DropdownMenuPortalDirective } from './dropdown-menu-portal.directive'; // Import the portal directive

@Component({
  selector: 'app-dropdown-menu-sub-content',
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
  //styleUrls: ['./dropdown-menu-sub-content.component.scss'],
})
export class DropdownMenuSubContentComponent {
  @Input() className: string = '';
  
   // Get a reference to the ng-template and make it public
  @ViewChild(TemplateRef) public contentTemplate!: TemplateRef<any>; // Make public

  // Expose the ViewContainerRef publicly
  constructor(public viewContainerRef: ViewContainerRef) {} // Make public


  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';
     // Note: Animations and data attributes require additional implementation
    return `${baseClasses} ${this.className}`;
  }
  
}
