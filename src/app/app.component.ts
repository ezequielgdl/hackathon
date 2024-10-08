import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
    <p class="text-futuristic-silver text-center text-sm m-8">Creado por <a class="text-rick-blue hover:text-rick-blue/80" href="https://github.com/ezequielgdl" target="_blank">Ezequiel Gómez de Lima</a></p>
  `
})
export class AppComponent {
  title = 'rick-and-morty';
}
