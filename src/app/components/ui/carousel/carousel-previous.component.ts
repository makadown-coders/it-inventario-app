import { Component, Inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button'; // Adjust the import path if necessary
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-carousel-previous',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './carousel-previous.component.html',
  styleUrls: ['./carousel-previous.component.scss']
})
export class CarouselPreviousComponent {
  constructor(@Inject(forwardRef(() => CarouselComponent)) public carousel: CarouselComponent) {}
}
