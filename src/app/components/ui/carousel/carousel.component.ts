import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions, CarouselComponent as OwlCarouselComponent } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() options: OwlOptions = {};
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: OwlCarouselComponent;

  // Properties to track navigation state
  canScrollPrev = false;
  canScrollNext = false;

  // Methods to control navigation (will be implemented later)
  scrollPrev(): void {}

  scrollNext(): void {}
}