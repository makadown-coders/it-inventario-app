// angular-inventory-app/src/app/components/ui/popover/popover.component.ts
import { Component, Input, Output, EventEmitter, ContentChild, AfterContentInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Overlay, OverlayConfig, OverlayRef, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';

import { PopoverContentComponent } from './popover-content.component';
import { PopoverTriggerDirective } from './popover-trigger.directive';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule, OverlayModule, PortalModule],
  template: '<ng-content></ng-content>',
})
export class PopoverComponent implements AfterContentInit, OnDestroy {
  @Input() open: boolean = false; // Input for controlling open state externally
  @Output() openChange = new EventEmitter<boolean>(); // Output for external control

  private _internalOpen = false; // Internal state
  private destroy$ = new Subject<void>();
  private overlayRef: OverlayRef | null = null;

  @ContentChild(PopoverTriggerDirective) trigger!: PopoverTriggerDirective;
  @ContentChild(PopoverContentComponent) content!: PopoverContentComponent;

  get isOpen(): boolean {
    return this._internalOpen;
  }

  set isOpen(value: boolean) {
    this._internalOpen = value;
    this.openChange.emit(value); // Emit to parent
    if (value) {
      this.openPopover();
    } else {
      this.close();
    }
  }

  constructor(private overlay: Overlay, private el: ElementRef) {}

  ngAfterContentInit(): void {
    if (this.trigger) {
      this.trigger.triggerClick.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.isOpen = !this.isOpen; // Toggle internal state on trigger click
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.close();
  }

  openPopover(): void {
     if (this.overlayRef && this.overlayRef.hasAttached()) {
      return; // Popover is already open
    }

    if (!this.trigger || !this.content) {
      console.error('Popover requires a trigger and content.');
      return;
    }

    const strategy = this.overlay.position()
      .flexibleConnectedTo(this.trigger.el) // Position relative to the trigger element
      .withPositions([
        // Define preferred positions for the popover
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8 // Example offset
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -8 // Example offset
        },
         {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8 // Example offset
        },
         {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -8 // Example offset
        },
      ])
      .withPush(true);

    const overlayConfig = new OverlayConfig({
      positionStrategy: strategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    this.overlayRef = this.overlay.create(overlayConfig);

    const portal = new TemplatePortal(this.content.contentTemplate, this.content.viewContainerRef);
    this.overlayRef.attach(portal);

     this.overlayRef.backdropClick().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isOpen = false; // Close on backdrop click
    });
    this.overlayRef.detachments().pipe(takeUntil(this.destroy$)).subscribe(() => {
        this._internalOpen = false; // Update internal state when overlay is detached
     });
      // Optional: Close on Escape key
     this.overlayRef.keydownEvents().pipe(takeUntil(this.destroy$)).subscribe(event => {
        if (event.key === 'Escape') {
          this.isOpen = false;
        }
     });
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
