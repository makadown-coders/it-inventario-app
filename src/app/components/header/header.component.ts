import { Component } from '@angular/core';
import { LucideAngularModule, HospitalIcon } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly hospitalIcon = HospitalIcon
}
