import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button'; // Assuming ButtonComponent will be created here
import { AlertDialogComponent } from './alert-dialog.component';

@Component({
  selector: 'app-alert-dialog-cancel',
  standalone: true,
  imports: [CommonModule, 
    ButtonComponent
  ], // Include ButtonComponent here
  templateUrl: './alert-dialog-cancel.component.html',
  styleUrls: ['./alert-dialog-cancel.component.scss']
})
export class AlertDialogCancelComponent {
  @Output() cancel = new EventEmitter<void>();

  constructor(private alertDialog: AlertDialogComponent) {}

  closeDialog() { this.cancel.emit(); this.alertDialog.openChange.emit(false); }
}
