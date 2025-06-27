// angular-inventory-app/src/app/shared/services/toast.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

interface Toast {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning'; // Optional: add different types of toasts
  duration?: number; // Optional: how long the toast should be visible
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {} // Inject ToastrService

  show(toast: Toast): void {
    const config = {
      timeOut: toast.duration || 3000, // Use duration from toast config or default
      // Add other ngx-toastr options here based on your needs
      // extendedTimeOut: 1000,
      // closeButton: true,
      // progressBar: true,
    };

    switch (toast.type) {
      case 'success':
        this.toastr.success(toast.description, toast.title, config);
        break;
      case 'error':
        this.toastr.error(toast.description, toast.title, config);
        break;
      case 'info':
        this.toastr.info(toast.description, toast.title, config);
        break;
      case 'warning':
        this.toastr.warning(toast.description, toast.title, config);
        break;
      default:
        this.toastr.show(toast.description, toast.title, config);
    }
  }

  // You can add methods for specific toast types if you prefer
  // success(title: string, message?: string, duration?: number): void {
  //   this.show({ title, description: message, type: 'success', duration });
  // }

  // error(title: string, message?: string, duration?: number): void {
  //   this.show({ title, description: message, type: 'error', duration });
  // }

  // ...
}
