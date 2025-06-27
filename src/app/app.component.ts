import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
   constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('IMSSBienestar Baja California - Inventario de IT');
    this.metaService.addTag({
      name: 'description',
      content: 'Admistración de inventario IMSSBienestar Baja California.',
    });
  }
}
