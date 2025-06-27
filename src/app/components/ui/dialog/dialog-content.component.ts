// angular-inventory-app/src/app/components/ui/dialog/dialog-content/dialog-content.component.ts
import { Component, HostBinding, Input, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [CommonModule],
  template: `
     <ng-template> <!-- Wrap content in ng-template -->
      <div [ngClass]="hostClasses">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
 // styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent {
  @Input() className: string = '';

  // Get a reference to the ng-template and make it public
  @ViewChild(TemplateRef) public contentTemplate!: TemplateRef<any>; // Make public

  // Expose the ViewContainerRef publicly
  constructor(public viewContainerRef: ViewContainerRef) {} // Make public


  @HostBinding('class') get hostClasses(): string {
     // Apply base styles for dialog content here
    const baseClasses = 'relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full';
    return `${baseClasses} ${this.className}`;
  }
}
