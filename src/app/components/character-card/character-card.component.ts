import { Component, Input } from '@angular/core';
import { Character } from '../../interfaces/characters';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-dimension-gray rounded-lg shadow-xl p-4 hover:shadow-rick-blue transition-shadow duration-300">
      <div class="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
        <img [src]="character?.image" [alt]="character?.name" class="w-full h-full object-cover">
      </div>
      <h2 class="text-rick-blue text-xl font-bold mb-2 text-center">{{ character?.name }}</h2>
      <p class="text-futuristic-silver mb-1 text-center">
        <span class="font-semibold">Status:</span> {{ character?.status }}
      </p>
      <p class="text-futuristic-silver mb-1 text-center">
        <span class="font-semibold">Species:</span> {{ character?.species }}
      </p>
      <p class="text-futuristic-silver mb-1 text-center">
        <span class="font-semibold"><i class="bi bi-geo-alt text-rick-blue"></i></span> {{ character?.origin?.name }}
      </p>
      <p class="text-futuristic-silver text-center">
        <span class="font-semibold"><i class="bi bi-crosshair text-rick-blue"></i></span> {{ character?.location?.name }}
      </p>
    </div>
  `,
  styles: ``
})
export class CharacterCardComponent {
  @Input() character: Character | undefined;

}
