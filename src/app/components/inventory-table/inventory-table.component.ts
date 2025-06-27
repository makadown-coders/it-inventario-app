// angular-inventory-app/src/app/components/inventory-table/inventory-table.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs'; // Import Observable

// Import Angular Material modules for MatSnackBar
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import the module

import { Equipment, EquipmentStatus, EquipmentType, EQUIPMENT_STATUSES, EQUIPMENT_TYPES } from '../../shared/models/equipment.model'; // Adjust path as needed
import { InventoryService } from '../../shared/services/inventory.service'; // Import the service
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../ui/card'; // Assuming card components are in ui
import { BadgeComponent } from '../ui/badge'; // Assuming badge component is in ui
import { ButtonComponent } from '../ui/button'; // Assuming button component is in ui
import { DropdownMenuComponent,
  DropdownMenuTriggerDirective,
  DropdownMenuContentComponent,
  DropdownMenuLabelComponent,
  DropdownMenuSeparatorComponent,
  DropdownMenuItemComponent,
  DropdownMenuSubComponent,
  DropdownMenuSubTriggerComponent,
  DropdownMenuSubContentComponent,
  DropdownMenuPortalDirective 
} from '../ui/dropdown-menu'; // Assuming dropdown components are in ui
import { Search, MoreHorizontal, Circle, Wrench, Archive, Laptop, Monitor, Printer, Projector, LaptopIcon, MonitorIcon, PrinterIcon, ProjectorIcon, SearchIcon, MoreHorizontalIcon } from 'lucide-angular'; // Import icons
import { LucideAngularModule } from 'lucide-angular'; // Import IconDirective
import { AddEquipmentFormComponent } from '../add-equipment-form/add-equipment-form.component'; // Assuming this component exists
import { InputComponent } from '../ui/input';
import { SelectComponent, SelectContentComponent, SelectItemComponent, SelectTriggerComponent, SelectValueComponent } from '../ui/select';

interface StatusConfig {
  icon: any; // Use 'any' for now, or a specific type if lucide-angular provides one
  color: string;
  label: string;
}

const statusConfig: Record<EquipmentStatus, StatusConfig> = {
  "In Use": { icon: Circle, color: "bg-green-500", label: "En Uso" },
  "In Repair": { icon: Wrench, color: "bg-yellow-500", label: "En Reparación" },
  "In Storage": { icon: Archive, color: "bg-blue-500", label: "En Resguardo" },
};

const iconMap: Record<EquipmentType, any> = { // Use 'any' for now
  Laptop: LaptopIcon,
  Desktop: MonitorIcon,
  Printer: PrinterIcon,
  Projector: ProjectorIcon,
};


@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule, // Add MatSnackBarModule here
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    InputComponent,
    SelectComponent,
    SelectTriggerComponent,
    SelectValueComponent,
    SelectContentComponent,
    SelectItemComponent,
    BadgeComponent,
    ButtonComponent,
    DropdownMenuComponent,
    DropdownMenuTriggerDirective,
    DropdownMenuContentComponent,
    DropdownMenuLabelComponent,
    DropdownMenuSeparatorComponent,
    DropdownMenuItemComponent,
    DropdownMenuSubComponent,
    DropdownMenuSubTriggerComponent,
    DropdownMenuSubContentComponent,
   // DropdownMenuPortalDirective,
    LucideAngularModule, // Add IconDirective here
    AddEquipmentFormComponent // Import and add the component
  ],
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent implements OnInit {
  // @Input() initialInventory: Equipment[] = []; // No longer needed as service manages state

  filteredInventory$: Observable<Equipment[]>; // Use the observable from the service

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
