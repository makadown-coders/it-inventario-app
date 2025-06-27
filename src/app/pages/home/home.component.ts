// src/app/pages/home/home.component.ts
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InventoryTableComponent } from '../../components/inventory-table/inventory-table.component';
import { mockInventory } from '../../shared/mock/mock-inventory';
import { Equipment } from '../../shared/models/equipment.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, InventoryTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {  

  constructor() { }

}
