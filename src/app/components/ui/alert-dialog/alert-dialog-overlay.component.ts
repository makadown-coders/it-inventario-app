import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-dialog-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-overlay.component.html',
  styleUrls: ['./alert-dialog-overlay.component.scss']
})
export class AlertDialogOverlayComponent {
  @Input() isOpen = false;
}
