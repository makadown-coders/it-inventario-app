// angular-inventory-app/src/app/shared/models/equipment.model.ts

export interface Equipment {
  id: string;
  type: EquipmentType; // Use the defined type
  model: string;
  serialNumber: string;
  location: string;
  status: EquipmentStatus; // Use the defined type
  assignedTo: string;
  purchaseDate: string; // Consider using Date type if you'll work with dates
}

// Define the possible equipment types using a union type
export type EquipmentType = 'Laptop' | 'Desktop' | 'Printer' | 'Projector';

// Define a constant array for the equipment types
export const EQUIPMENT_TYPES = ['Laptop', 'Desktop', 'Printer', 'Projector'] as const;

// Define the possible equipment statuses using a union type
export type EquipmentStatus = 'In Use' | 'In Repair' | 'In Storage';

// Define a constant array for the equipment statuses
export const EQUIPMENT_STATUSES = ['In Use', 'In Repair', 'In Storage'] as const;
