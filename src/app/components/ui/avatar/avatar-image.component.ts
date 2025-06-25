import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.scss']
})
export class AvatarImageComponent {
  @Input() src: string | undefined;
  @Input() alt: string | undefined;
}
