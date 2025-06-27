// angular-inventory-app/src/app/components/ui/form/form-control.directive.ts
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { NgControl } from '@angular/forms'; // Import NgControl to access form control status

@Directive({
  selector: '[appFormControl]', // Attribute selector
  standalone: true,
})
export class FormControlDirective {
  @Input() className: string = '';

  @HostBinding('class') get hostClasses(): string {
    // Apply base styles to the form control element
    const baseClasses = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';
    return `${baseClasses} ${this.className}`;
  }

  // You can use the NgControl to apply classes based on validation state
  // @HostBinding('class.is-invalid') get isInvalid(): boolean {
  //   return !!(this.ngControl && this.ngControl.invalid && (this.ngControl.dirty || this.ngControl.touched));
  // }

  constructor(public el: ElementRef, public ngControl: NgControl) {
     // NgControl provides access to the FormControl instance and its state
     // console.log('FormControlDirective:', this.ngControl);
   }
}
