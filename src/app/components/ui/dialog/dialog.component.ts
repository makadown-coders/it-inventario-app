// angular-inventory-app/src/app/components/ui/dialog/dialog.component.ts
import { Component, Input, Output, EventEmitter, ContentChild, AfterContentInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Overlay, OverlayConfig, OverlayRef, OverlayModule } from '@angular/cdk/overlay'; // Import OverlayModule
import { TemplatePortal, PortalModule } from '@angular/cdk/portal'; // Import PortalModule

import { DialogContentComponent } from './dialog-content.component';
import { DialogTriggerDirective } from './dialog-trigger.directive';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, OverlayModule, PortalModule],
  template: '<ng-content></ng-content>', // Use content projection
})
export class DialogComponent implements AfterContentInit, OnDestroy {
  @Input() open: boolean = false; // Input for controlling open state externally
  @Output() openChange = new EventEmitter<boolean>(); // Output for external control

  private _internalOpen = false; // Internal state
  private destroy$ = new Subject<void>();
  private overlayRef: OverlayRef | null = null;

  @ContentChild(DialogTriggerDirective) trigger!: DialogTriggerDirective;
  @ContentChild(DialogContentComponent) content!: DialogContentComponent;


  get isOpen(): boolean {
    return this._internalOpen;
  }

  set isOpen(value: boolean) {
    this._internalOpen = value;
    this.openChange.emit(value); // Emit to parent
    if (value) {
      this.openDialog();
    } else {
      this.close();
    }
  }

  constructor(private overlay: Overlay, private el: ElementRef) {}

  ngAfterContentInit(): void {
    if (this.trigger) {
      this.trigger.triggerClick.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.isOpen = true; // Toggle internal state on trigger click
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.close();
  }

  openDialog(): void {
     if (this.overlayRef && this.overlayRef.hasAttached()) {
      return; // Dialog is already open
    }

    if (!this.content) {
      console.error('Dialog requires content.');
      return;
    }

    const positionStrategy = this.overlay.position()
      .global() // Center the dialog globally
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(), // Block scrolling when open
      hasBackdrop: true, // Add a backdrop
      backdropClass: 'cdk-overlay-dark-backdrop', // Dark backdrop
      panelClass: 'dialog-panel' // Custom class for dialog panel styling
    });

    this.overlayRef = this.overlay.create(overlayConfig);

    // Attach the portal to the overlay
    const portal = new TemplatePortal(this.content.contentTemplate, this.content.viewContainerRef);
    this.overlayRef.attach(portal);

    // Subscribe to backdrop clicks to close the dialog
    this.overlayRef.backdropClick().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isOpen = false; // Update state on backdrop click
    });
     // Subscribe to detachment to update internal state
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
