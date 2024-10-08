import { Component } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { signal } from '@angular/core';
import { Character } from '../../interfaces/characters';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [],
  template: `
    <p>
      characters works!
    </p>
  `,
  styles: ``
})
export class CharactersComponent {
  characters = signal<Character[]>([]);
  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
    this.charactersService.fetchCharacters().subscribe({
      next: (data) => {
        this.characters.set(data.results);
        console.log(this.characters());
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
