import { Component, Inject, forwardRef } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { CarouselComponent } from './carousel.component';

@Component({
  selector: 'app-carousel-content',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './carousel-content.component.html',
  styleUrls: ['./carousel-content.component.scss']
})
export class CarouselContentComponent {
  constructor(@Inject(forwardRef(() => CarouselComponent)) public carousel: CarouselComponent) {}
}
