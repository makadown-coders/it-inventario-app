// angular-inventory-app/src/app/components/ui/form/form-field/form-field.component.ts
import { Component, AfterContentInit, ContentChild, OnDestroy, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormControlDirective as AngularFormControlDirective, FormGroupDirective } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

// Import placeholder components (will be created next)
// import { FormItemComponent } from '../form-item/form-item.component';
// import { FormLabelComponent } from '../form-label/form-label.component';
// import { FormMessageComponent } from '../form-message/form-message.component';


@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>', // Use content projection
  // Remove the providers section:
  // providers: [
  //   {
  //     provide: ControlContainer,
  //     useFactory: (container: ControlContainer) => container,
  //     deps: [[new Optional(), new Self(), ControlContainer]],
  //   },
  // ],
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {
  // Get references to child components
  @ContentChild(AngularFormControlDirective) formControlDirective!: AngularFormControlDirective;
  // @ContentChild(FormItemComponent) formItem!: FormItemComponent; // Placeholder
  // @ContentChild(FormLabelComponent) formLabel!: FormLabelComponent; // Placeholder
  // @ContentChild(FormMessageComponent) formMessage!: FormMessageComponent; // Placeholder

  private destroy$ = new Subject<void>();

  constructor(@Optional() @Self() private controlContainer: ControlContainer) {
      // Access the parent form group/control if this is inside a form
   }

  ngAfterContentInit(): void {
    if (this.formControlDirective && this.formControlDirective.control) {
        // You can access the FormControl instance here
        // console.log('FormControl:', this.formControlDirective.control);

        // Example: Subscribe to status changes to update message visibility
        this.formControlDirective.control.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(status => {
            // Logic to show/hide error messages based on status (VALID, INVALID, PENDING)
            // and touched/dirty state
        });
         this.formControlDirective.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
            // Handle value changes if needed
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Expose the FormControl instance to child components if needed
  get control(): any { // Use 'any' or a more specific type if known
     return this.formControlDirective ? this.formControlDirective.control : null;
  }
}
