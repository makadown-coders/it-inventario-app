// angular-inventory-app/src/app/components/ui/select/select.component.ts
import { Component, EventEmitter, Output, Input, ContentChild, AfterContentInit, OnDestroy, ElementRef, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'; // Import BehaviorSubject
import { Overlay, OverlayConfig, OverlayRef, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; // Import necessary classes


// Define the Value Accessor provider
export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent), // Refer to the component class
  multi: true, // Allow multiple value accessors
};


@Component({
  selector: 'app-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, PortalModule],
  template: '<ng-content></ng-content>', // Use content projection
  providers: [SELECT_VALUE_ACCESSOR], // Register the Value Accessor provider
})
export class SelectComponent implements AfterContentInit, OnDestroy, ControlValueAccessor { // Implement ControlValueAccessor
  // @Input() value: any; // Remove this input, value is managed by CVA
  @Output() valueChange = new EventEmitter<any>();

  private _open = false;
  private destroy$ = new Subject<void>();
  private overlayRef: OverlayRef | null = null;

  @ContentChild('trigger') trigger!: any; // We'll need to update this type later
  @ContentChild('content') content!: any; // We'll need to update this type later

  // ControlValueAccessor methods and properties
  @Input() value: any; // Internal value state
  onChange: any = () => {};
  onTouched: any = () => {};
  disabled: boolean = false; // Track disabled state

  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
     if (value) {
       this.openSelect();
     } else {
       this.close();
       this.onTouched(); // Mark as touched when closing
     }
  }

  constructor(private overlay: Overlay, private el: ElementRef) {}

  ngAfterContentInit(): void {
    if (this.trigger) {
      // Assuming SelectTriggerComponent emits a click event
      // this.trigger.triggerClick.pipe(takeUntil(this.destroy$)).subscribe(() => {
      //   if (!this.disabled) {
      //      this.isOpen = true; // Use the setter
      //   }
      // });
    }
    // TODO: Implement click outside to close
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.close();
  }

   // Writes a new value to the element.
  writeValue(value: any): void {
    this.value = value;
    // Update the displayed value in the SelectValueComponent if you have one
    // This might require accessing SelectValueComponent via @ContentChild
  }

  // Registers a handler that performs a action when the control writes a new value.
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registers a handler that wakes the control up on touch.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Enables or disables a form control.
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    // You might need to propagate this disabled state to the trigger button
    if (this.trigger) {
      // Assuming trigger has a method or input to set disabled state
      // this.trigger.setDisabled(isDisabled);
    }
  }


  openSelect(): void {
    if (this.overlayRef && this.overlayRef.hasAttached() || this.disabled) {
      return;
    }

     if (!this.trigger || !this.content) {
      console.error('Select requires a trigger and content.');
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
          offsetY: 8 // Example offset
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
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
       this._open = false;
     });
      this.overlayRef.detachments().pipe(takeUntil(this.destroy$)).subscribe(() => {
         this._open = false;
      });
       this.overlayRef.keydownEvents().pipe(takeUntil(this.destroy$)).subscribe(event => {
         if (event.key === 'Escape') {
           this._open = false;
         }
      });
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  selectItem(value: any): void {
    this.value = value; // Update internal value
    this.onChange(this.value); // Notify Angular forms
    this.valueChange.emit(this.value); // Emit to parent component if needed
    this._open = false; // Close the select
  }
}
