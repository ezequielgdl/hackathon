import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
  <div class="relative flex justify-center items-center overflow-hidden">
    <img src="/rickandmortylogo.png" alt="Rick and Morty">
    <img src="/rickflying.png" alt="Flying Rick" class="absolute z-10 h-32 animate-fly-across">
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
