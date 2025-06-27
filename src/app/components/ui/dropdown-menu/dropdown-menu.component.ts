// angular-inventory-app/src/app/components/ui/dropdown-menu/dropdown-menu.component.ts
import { Component, EventEmitter, Output, Input, AfterContentInit, ContentChild, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Overlay, OverlayConfig, OverlayRef, OverlayModule } from '@angular/cdk/overlay'; // Import OverlayModule
import { TemplatePortal, PortalModule } from '@angular/cdk/portal'; // Import PortalModule

import { DropdownMenuTriggerDirective } from './dropdown-menu-trigger.directive';
import { DropdownMenuContentComponent } from './dropdown-menu-content.component';


@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule, // Add OverlayModule here
    PortalModule,  // Add PortalModule here
//    DropdownMenuTriggerDirective, // Make sure directives are imported
 //   DropdownMenuContentComponent // Make sure components are imported
  ],
  template: '<ng-content></ng-content>',
})
export class DropdownMenuComponent implements AfterContentInit, OnDestroy {
  private _open = false;
  private destroy$ = new Subject<void>();
  private overlayRef: OverlayRef | null = null;

  @ContentChild(DropdownMenuTriggerDirective) trigger!: DropdownMenuTriggerDirective;
  @ContentChild(DropdownMenuContentComponent) content!: DropdownMenuContentComponent;

  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
    if (value) {
      this.openMenu();
    } else {
      this.close();
    }
  }

  constructor(private overlay: Overlay, private el: ElementRef) {}

  ngAfterContentInit(): void {
    if (this.trigger) {
      this.trigger.triggerClick.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.toggle();
      });
    }
     // Implement click outside to close using OverlayRef's backdropClick
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.close();
  }

  toggle(): void {
    this.open = !this.open;
  }

  openMenu(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      return;
    }

    if (!this.trigger || !this.content) {
      console.error('DropdownMenu requires a trigger and content.');
      return;
    }

    const strategy = this.overlay.position()
      .flexibleConnectedTo(this.trigger.el)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: this.content.sideOffset
        },
         {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -this.content.sideOffset
        },
        {
           originX: 'end',
           originY: 'bottom',
           overlayX: 'end',
           overlayY: 'top',
           offsetY: this.content.sideOffset
        },
         {
           originX: 'end',
           originY: 'top',
           overlayX: 'end',
           overlayY: 'bottom',
           offsetY: -this.content.sideOffset
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
      this.close();
    });
     this.overlayRef.detachments().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this._open = false;
    });
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
