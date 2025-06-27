import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) { }

  openDialog(title: string, content: string): void {
    this.dialog.open(DialogContentComponent, {
      data: { title, content }
    });
  }
}
