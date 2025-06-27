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

export type EquipmentType = 'Laptop' | 'Desktop' | 'Impresora' | 'Proyector';

export const EQUIPMENT_TYPES = ['Laptop', 'Desktop', 'Impresora', 'Proyector'] as const;

export type EquipmentStatus = 'En Uso' | 'En Reparación' | 'En Resguardo';

export const EQUIPMENT_STATUSES = ['En Uso', 'En Reparación', 'En Resguardo'] as const;
