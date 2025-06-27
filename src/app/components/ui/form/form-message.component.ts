// angular-inventory-app/src/app/components/ui/form/form-message/form-message.component.ts
import { Component, HostBinding, Input, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component'; // Import parent

@Component({
  selector: 'app-form-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p *ngIf="showErrors" [ngClass]="hostClasses">
      {{ errorMessage }}
    </p>
  `,
  // styleUrls: ['./form-message.component.scss'],
})
export class FormMessageComponent {
  @Input() className: string = '';
  @Input() customErrors: { [key: string]: string } = {}; // Optional custom error messages

  @HostBinding('class') get hostClasses(): string {
    const baseClasses = 'text-sm font-medium text-destructive';
    return `${baseClasses} ${this.className}`;
  }

  constructor(@Optional() @Inject(FormFieldComponent) private formField: FormFieldComponent) {} // Inject parent FormFieldComponent


  get showErrors(): boolean {
    const control = this.formField ? this.formField.control : null;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  get errorMessage(): string {
    const control = this.formField ? this.formField.control : null;
    if (control && control.errors) {
      // Iterate through errors and find the first matching message
      const errors = control.errors;
      // Check custom error messages first
      for (const errorKey of Object.keys(this.customErrors)) {
        if (errors[errorKey]) {
          return this.customErrors[errorKey];
        }
      }
      // Fallback to default Angular validation messages (you'd need to map these)
      if (errors['required']) {
        return 'Este campo es requerido.';
      }
      if (errors['minlength']) {
        return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }
       if (errors['maxlength']) {
        return `Máximo ${errors['maxlength'].requiredLength} caracteres.`;
      }
       if (errors['email']) {
        return 'Formato de correo inválido.';
      }
      // Add more default messages as needed
    }
    return ''; // No error message
  }
}
