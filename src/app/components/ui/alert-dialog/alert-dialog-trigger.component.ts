import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-dialog-trigger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-trigger.component.html',
  styleUrl: './alert-dialog-trigger.component.scss'
})
export class AlertDialogTriggerComponent {
  @Output() triggerClick = new EventEmitter<void>();

  onClick() {
    this.triggerClick.emit();
  }
}
