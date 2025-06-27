// angular-inventory-app/src/app/shared/services/inventory.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Equipment, EquipmentStatus, EquipmentType, EQUIPMENT_STATUSES, EQUIPMENT_TYPES } from '../models/equipment.model'; // Adjust path as needed
import { mockInventory } from '../mock/mock-inventory';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventorySubject = new BehaviorSubject<Equipment[]>([]);
  inventory$ = this.inventorySubject.asObservable();

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  private typeFilterSubject = new BehaviorSubject<string>('all');
  typeFilter$ = this.typeFilterSubject.asObservable();

  private statusFilterSubject = new BehaviorSubject<string>('all');
  statusFilter$ = this.statusFilterSubject.asObservable();

  filteredInventory$: Observable<Equipment[]>;

  constructor() {
    // Initialize with mock data for now
    this.inventorySubject.next(mockInventory);

    this.filteredInventory$ = combineLatest([
      this.inventory$,
      this.searchTerm$,
      this.typeFilter$,
      this.statusFilter$
    ]).pipe(
      map(([inventory, searchTerm, typeFilter, statusFilter]) => {
        return inventory.filter(item => {
          const searchMatch =
            item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

          const typeMatch = typeFilter === "all" || item.type === typeFilter;
          const statusMatch = statusFilter === "all" || item.status === statusFilter;

          return searchMatch && typeMatch && statusMatch;
        });
      })
    );

    // TODO: Implement loading from localStorage in ngOnInit or a dedicated load method
  }

  addEquipment(newEquipment: Equipment): void {
    const currentInventory = this.inventorySubject.value;
    this.inventorySubject.next([newEquipment, ...currentInventory]);
    // TODO: Implement saving to localStorage
  }

  updateEquipmentStatus(equipmentId: string, newStatus: EquipmentStatus): void {
    const currentInventory = this.inventorySubject.value;
    const updatedInventory = currentInventory.map(item =>
      item.id === equipmentId ? { ...item, status: newStatus } : item
    );
    this.inventorySubject.next(updatedInventory);
    // TODO: Implement saving to localStorage
  }

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  setTypeFilter(type: string): void {
    this.typeFilterSubject.next(type);
  }

  setStatusFilter(status: string): void {
    this.statusFilterSubject.next(status);
  }

  // TODO: Add methods for loading and saving to localStorage
}
