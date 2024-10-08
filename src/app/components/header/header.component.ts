import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
  <div class="relative flex justify-center items-center overflow-hidden">
    <img src="/rickandmortylogo.webp" alt="Rick and Morty" width="300" height="100" loading="eager" fetchpriority="high">
    <img src="/rickflying.webp" alt="Flying Rick" class="absolute z-10 animate-fly-across" width="128" height="128" loading="lazy">
  </div>
  `,
  styles: [`
    @keyframes flyAcross {
      0% { transform: translateX(-300%); }
      100% { transform: translateX(300%); }
    }
    .animate-fly-across {
      animation: flyAcross 15s linear infinite;
    }
  `]
})
export class HeaderComponent {

}
