import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // Import provideAnimations
import { provideToastr } from 'ngx-toastr'; // Import provideToastr
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(), // Add provideAnimations here
    provideToastr({ // Add provideToastr here
      positionClass: 'toast-top-right', // Example position
      preventDuplicates: true,
    }),
    // Add your custom ToastService here as it will wrap ngx-toastr's service
    // { provide: ToastService, useClass: ToastService } // If ToastService is not `providedIn: 'root'`  
  ]
};
