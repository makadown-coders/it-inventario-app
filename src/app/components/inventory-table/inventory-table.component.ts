// angular-inventory-app/src/app/components/inventory-table/inventory-table.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs'; // Import Observable
// Import Angular Material modules for MatSnackBar
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Equipment, EquipmentStatus, EquipmentType, EQUIPMENT_STATUSES, EQUIPMENT_TYPES } from '../../shared/models/equipment.model'; // Adjust path as needed
import { InventoryService } from '../../shared/services/inventory.service';
import { BadgeComponent } from '../ui/badge'; // Assuming badge component is in ui
import { Circle, 
         Wrench, Archive, 
         LaptopIcon, MonitorIcon, 
         PrinterIcon, ProjectorIcon, 
         SearchIcon, MoreHorizontalIcon } from 'lucide-angular'; // Import icons
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { AddEquipmentFormComponent } from '../add-equipment-form/add-equipment-form.component';

interface StatusConfig {
  icon: any; // Use 'any' for now, or a specific type if lucide-angular provides one
  color: string;
  label: string;
}

const statusConfig: Record<EquipmentStatus, StatusConfig> = {
  "En Uso": { icon: Circle, color: "bg-green-500", label: "En Uso" },
  "En Reparación": { icon: Wrench, color: "bg-yellow-500", label: "En Reparación" },
  "En Resguardo": { icon: Archive, color: "bg-blue-500", label: "En Resguardo" },
};

const iconMap: Record<EquipmentType, any> = { // Use 'any' for now
  Laptop: LaptopIcon,
  Desktop: MonitorIcon,
  Impresora: PrinterIcon,
  Proyector: ProjectorIcon,
};

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule, // MatSnackBarModule para usar MatSnackBar   
    BadgeComponent,
    LucideAngularModule, // para los iconos
    AddEquipmentFormComponent,
  ],
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent implements OnInit {
  // @Input() initialInventory: Equipment[] = []; // No longer needed as service manages state

  filteredInventory$: Observable<Equipment[]>; // Use the observable from the service
  selectedItemId: string | null = null;

  EQUIPMENT_TYPES = EQUIPMENT_TYPES; // Expose constants to template
  EQUIPMENT_STATUSES = EQUIPMENT_STATUSES; // Expose constants to template
  statusConfig = statusConfig; // Expose to template
  iconMap = iconMap; // Expose to template
  searchIcon = SearchIcon;
  moreHorizontalIcon = MoreHorizontalIcon;

  constructor(
    public inventoryService: InventoryService, // Inject the service
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.filteredInventory$ = this.inventoryService.filteredInventory$; // Get the observable from the service
  }

  ngOnInit(): void {
    // The service handles initial loading
  }

  handleEquipmentAdded(newEquipment: Equipment): void {
    this.inventoryService.addEquipment(newEquipment);
  }

  handleStatusUpdate(equipmentId: string, newStatus: EquipmentStatus): void {
    this.inventoryService.updateEquipmentStatus(equipmentId, newStatus);
    this.snackBar.open(
      `El estado del equipo ha sido actualizado a "${statusConfig[newStatus].label}".`,
      'Cerrar', // Action button text
      {
        duration: 3000, // Duration in milliseconds
        panelClass: ['centered-snackbar'] // Apply the custom class
      }
    );
  }

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.inventoryService.setSearchTerm(inputElement.value);
  }

  onTypeFilterChange(value: string): void {
    this.inventoryService.setTypeFilter(value);
  }

  onStatusFilterChange(value: string): void {
    this.inventoryService.setStatusFilter(value);
  }

   cn(...inputs: (string | boolean | undefined | null)[]): string {
    return inputs.filter(Boolean).join(' ');
  }
}
