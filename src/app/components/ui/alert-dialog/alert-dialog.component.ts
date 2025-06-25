import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogOverlayComponent } from './alert-dialog-overlay.component';
import { AlertDialogContentComponent } from './alert-dialog-content.component';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule, AlertDialogOverlayComponent, AlertDialogContentComponent],
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  constructor() {}
}
