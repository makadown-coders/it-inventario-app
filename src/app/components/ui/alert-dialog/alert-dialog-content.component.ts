import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-dialog-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-content.component.html',
  styleUrls: ['./alert-dialog-content.component.scss']
})
export class AlertDialogContentComponent {
  @Input() isOpen = false;
}
