// angular-inventory-app/src/app/components/ui/input/input.component.ts
import { Component, Input, HostBinding, ElementRef, Renderer2, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; // Import necessary classes


// Define the Value Accessor provider
export const INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent), // Refer to the component class
  multi: true, // Allow multiple value accessors
};

@Component({
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [INPUT_VALUE_ACCESSOR],
})
export class InputComponent {
  @Input() className: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  @Input() value: any; // Internal value state

  // ControlValueAccessor methods
  onChange: any = () => {}; // Placeholder for the change handler
  onTouched: any = () => {}; // Placeholder for the touched handler

  constructor(public el: ElementRef, public renderer: Renderer2) {}

  // Writes a new value to the element.
  writeValue(value: any): void {
    this.value = value;
    // Optional: Manually set the native input value if needed, but [value] binding usually suffices
    // this.renderer.setProperty(this.el.nativeElement.querySelector('input'), 'value', value);
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
    const inputElement = this.el.nativeElement.querySelector('input');
    if (inputElement) {
      this.renderer.setProperty(inputElement, 'disabled', isDisabled);
    }
  }

  // Handle native input event and notify Angular forms
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value); // Notify Angular forms about the change
  }

  // Optional: Method to access the native input element if needed by parent components
  get nativeElement(): HTMLInputElement {
    return this.el.nativeElement.querySelector('input');
  }
}
