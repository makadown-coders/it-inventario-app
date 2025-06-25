import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './'; // Assuming AlertDialogComponent is in the same directory
import { ButtonComponent } from '../button'; // Assuming ButtonComponent will be created here

@Component({
  selector: 'app-alert-dialog-action',
  standalone: true,
  imports: [CommonModule,
    ButtonComponent
  ],
  templateUrl: './alert-dialog-action.component.html',
  styleUrls: ['./alert-dialog-action.component.scss']
})
export class AlertDialogActionComponent {
  private alertDialog = inject(AlertDialogComponent);

  closeDialog() { this.alertDialog.openChange.emit(false); }
}
