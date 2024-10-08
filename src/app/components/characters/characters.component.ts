import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { signal, computed } from '@angular/core';
import { Character } from '../../interfaces/characters';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CharacterCardComponent, ReactiveFormsModule, CommonModule],
  template: `
    <div class="flex-column justify-center items-center">  
      <h1 class="text-portal-green text-4xl font-bold mb-4">Characters</h1>
      <input 
        [formControl]="searchControl" 
        placeholder="Search characters..." 
        class="w-full p-3 mb-6 bg-dimension-gray text-futuristic-silver placeholder-futuristic-silver/50 border-2 border-portal-green rounded-lg focus:outline-none focus:ring-2 focus:ring-space-blue focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-portal-green"
      >
      <div id="characters" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 border-2 border-portal-green rounded-lg p-4 m-4">   
        @for (character of paginatedCharacters(); track character.id) {
          <app-character-card [character]="character"></app-character-card>
        }
        @if (paginatedCharacters().length < 1) {
          <div class="text-portal-green text-xl font-bold mb-4">No characters found</div>
        }
      </div>
      <div class="flex justify-center mt-4">
        <button 
          (click)="previousPage()" 
          [disabled]="currentPage() === 1"
          class="bg-portal-green text-dimension-gray px-4 py-2 rounded-l-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span class="bg-dimension-gray text-futuristic-silver px-4 py-2">
          {{ currentPage() }} / {{ totalPages() }}
        </span>
        <button 
          (click)="nextPage()" 
          [disabled]="currentPage() === totalPages()"
          class="bg-portal-green text-dimension-gray px-4 py-2 rounded-r-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  `,
  styles: ``
})
export class CharactersComponent implements OnInit {
  characters = signal<Character[]>([]);
  filteredCharacters = signal<Character[]>([]);
  searchControl = new FormControl('');
  
  currentPage = signal(1);
  itemsPerPage = 12; // Adjust this value as needed

  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
    this.charactersService.fetchAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.filteredCharacters.set(data);
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterCharacters(searchTerm || '');
      this.currentPage.set(1); // Reset to first page on new search
    });
  }

  filterCharacters(searchTerm: string) {
    const filtered = this.characters().filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.filteredCharacters.set(filtered);
  }

  totalPages = computed(() => Math.ceil(this.filteredCharacters().length / this.itemsPerPage));

  paginatedCharacters = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCharacters().slice(startIndex, endIndex);
  });

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }
}
