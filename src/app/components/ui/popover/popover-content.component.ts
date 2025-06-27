// angular-inventory-app/src/app/components/ui/popover/popover-content/popover-content.component.ts
import { Component, HostBinding, Input, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popover-content',
  standalone: true,
  imports: [CommonModule],
  template: `
     <ng-template> <!-- Wrap content in ng-template -->
      <div [ngClass]="hostClasses">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
//  styleUrls: ['./popover-content.component.scss'],
})
export class PopoverContentComponent {
  @Input() className: string = '';
  @Input() align: 'start' | 'center' | 'end' = 'start'; // Default align for popover

  // Get a reference to the ng-template and make it public
  @ViewChild(TemplateRef) public contentTemplate!: TemplateRef<any>; // Make public

  // Expose the ViewContainerRef publicly
  constructor(public viewContainerRef: ViewContainerRef) {} // Make public

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';
    // Note: Animations and data attributes require additional implementation
    return `${baseClasses} ${this.className}`;
  }
}
