// angular-inventory-app/src/app/components/add-equipment-form/add-equipment-form.component.ts
import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { format } from 'date-fns'; // Assuming date-fns is installed and used
import { PlusCircleIcon, Loader2Icon, CalendarIcon } from 'lucide-angular'; // Import icons
import { LucideAngularModule } from 'lucide-angular'; // Import IconDirective
import { v4 as uuidv4 } from 'uuid'; // Assuming uuid library is installed for ID generation
import { Equipment, EQUIPMENT_STATUSES, EQUIPMENT_TYPES } from '../../shared/models/equipment.model'; // Adjust path as needed
import { ToastService } from '../../shared/services/toast.service';



@Component({
  selector: 'app-add-equipment-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, LucideAngularModule
  ],
  templateUrl: './add-equipment-form.component.html',
  // styleUrls: ['./add-equipment-form.component.scss'],
})
export class AddEquipmentFormComponent implements OnInit {
  @Output() equipmentAdded = new EventEmitter<Equipment>();
  plusCircleIcon = PlusCircleIcon;
  loader2Icon = Loader2Icon;
  calendarIcon = CalendarIcon;
  cdRef = inject(ChangeDetectorRef);

  equipmentForm!: FormGroup; // Use FormGroup for the form
  isOpen: boolean = false;
  isSubmitting: boolean = false;

  readonly EQUIPMENT_TYPES = EQUIPMENT_TYPES; // Expose constants to template
  readonly EQUIPMENT_STATUSES = EQUIPMENT_STATUSES; // Expose constants to template

  constructor(
    private fb: FormBuilder, // Inject FormBuilder
    private toastService: ToastService // Inject ToastService
  ) { }

  ngOnInit(): void {
    this.initForm(); // Initialize the form
  }

  initForm(): void {
    this.equipmentForm = this.fb.group({
      type: [null, Validators.required], // Initialize with null and required validator
      model: ['', [Validators.required, Validators.minLength(2)]], // Initial value and validators
      serialNumber: ['', [Validators.required, Validators.minLength(5)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      status: [null, Validators.required],
      assignedTo: [''], // Optional, no validators needed initially
      purchaseDate: [null, Validators.required], // Use null for date initially
    });
  }

  // Method to handle dialog open/close state changes from the DialogComponent
  onOpenChange(open: boolean): void {
    this.isOpen = open;
    if (!open) {
      this.equipmentForm.reset({ // Reset form when dialog closes
        model: '', serialNumber: '', location: '', assignedTo: ''
      });
      // Reset specific controls that don't have empty string as default
      this.equipmentForm.get('type')?.reset(null);
      this.equipmentForm.get('status')?.reset(null);
      this.equipmentForm.get('purchaseDate')?.reset(null);
    }
    this.cdRef.detectChanges();
  }

  async onSubmit(): Promise<void> {
    if (this.equipmentForm.valid) {
      this.isSubmitting = true;

      const formValues = this.equipmentForm.value;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newEquipment: Equipment = {
        id: uuidv4(), // Generate UUID
        type: formValues.type,
        model: formValues.model,
        serialNumber: formValues.serialNumber,
        location: formValues.location,
        status: formValues.status,
        assignedTo: formValues.assignedTo,
        purchaseDate: formValues.purchaseDate.toISOString().split("T")[0], // Format date
      };

      this.equipmentAdded.emit(newEquipment); // Emit the new equipment
      this.toastService.show({ // Use the ToastService
        title: "Éxito",
        description: "Equipo agregado correctamente.",
      });

      this.isSubmitting = false;
      this.isOpen = false; // Close the dialog
    } else {
      // Mark all fields as touched to display validation errors
      this.equipmentForm.markAllAsTouched();
      this.toastService.show({ // Use the ToastService
        title: "Error de Validación",
        description: "Por favor, complete los campos requeridos.",
        type: 'error' // Assuming your ToastService supports types
      });
    }
  }

  // Helper to format date for display in the button
  formatDate(date: Date | null): string {
    return date ? format(date, "PPP") : 'Seleccione una fecha';
  }

  // Define the date disabling function as a property
  disableDates: (date: Date) => boolean = (date: Date) => {
    const today = new Date();
    // Set time to midnight for accurate comparison
    today.setHours(0, 0, 0, 0);
    const minDate = new Date('1990-01-01');
    minDate.setHours(0, 0, 0, 0);

    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);


    return compareDate > today || compareDate < minDate;
  };

  setTodayAsPurchaseDate(): void {
    const today = new Date();
    this.equipmentForm.get('purchaseDate')?.setValue(today);
  }

  abrirModal() {
    this.isOpen = true;
  }
}
