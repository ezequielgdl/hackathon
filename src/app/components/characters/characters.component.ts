import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { signal, computed } from '@angular/core';
import { Character } from '../../interfaces/characters';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CharacterCardComponent, ReactiveFormsModule, CommonModule, HeaderComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <app-header></app-header>
      <h1 class="text-rick-blue text-4xl font-bold mb-8 text-center">Characters</h1>
      <div class="max-w-2xl mx-auto mb-8">
        <input 
          [formControl]="searchControl" 
          placeholder="Search characters..." 
          class="w-full p-4 bg-dimension-gray text-futuristic-silver placeholder-futuristic-silver/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-rick-blue focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-portal-green"
        >
      </div>
      <div id="characters" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">   
        @for (character of paginatedCharacters(); track character.id) {
          <app-character-card [character]="character"></app-character-card>
        }
        @if (paginatedCharacters().length < 1) {
          <div class="col-span-full text-rick-blue text-xl font-bold text-center">No characters found</div>
        }
      </div>
      <div class="flex justify-center items-center space-x-2">
        <button 
          (click)="previousPage()" 
          [disabled]="currentPage() === 1"
          class="bg-space-blue text-white px-6 py-3 rounded-lg disabled:opacity-50 transition-all duration-300 hover:bg-rick-blue"
        >
          Previous
        </button>
        <span class="bg-dimension-gray text-futuristic-silver px-6 py-3 rounded-lg">
          {{ currentPage() }} / {{ totalPages() }}
        </span>
        <button 
          (click)="nextPage()" 
          [disabled]="currentPage() === totalPages()"
          class="bg-space-blue text-white px-6 py-3 rounded-lg disabled:opacity-50 transition-all duration-300 hover:bg-rick-blue"
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
  itemsPerPage = 20;

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
      this.currentPage.set(1);
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
