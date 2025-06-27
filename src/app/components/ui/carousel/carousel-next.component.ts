import { Component, Inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component'; // Adjust the import path if necessary
import { CarouselComponent } from './carousel.component';

@Component({
  selector: 'app-carousel-next',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './carousel-next.component.html',
  styleUrls: ['./carousel-next.component.scss']
})
export class CarouselNextComponent {
  constructor(@Inject(forwardRef(() => CarouselComponent)) public carousel: CarouselComponent) {}
}


