import { Component, Input } from '@angular/core';
import { Character } from '../../interfaces/characters';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-dimension-gray rounded-lg shadow-lg p-4 hover:shadow-portal-green transition-shadow duration-300">
      <div class="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
        <img [src]="character?.image" [alt]="character?.name" class="w-full h-full object-cover">
      </div>
      <h2 class="text-portal-green text-xl font-bold mb-2 text-center">{{ character?.name }}</h2>
      <p class="text-futuristic-silver mb-1 text-center">
        <span class="font-semibold">Status:</span> {{ character?.status }}
      </p>
      <p class="text-futuristic-silver mb-1 text-center">
        <span class="font-semibold">Species:</span> {{ character?.species }}
      </p>
      <p class="text-futuristic-silver mb-1 text-center">
        <span class="font-semibold"><i class="bi bi-geo-alt text-portal-green"></i></span> {{ character?.origin?.name }}
      </p>
      <p class="text-futuristic-silver text-center">
        <span class="font-semibold"><i class="bi bi-crosshair text-portal-green"></i></span> {{ character?.location?.name }}
      </p>
    </div>
  `,
  styles: ``
})
export class CharacterCardComponent {
  @Input() character: Character | undefined;

}
