import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { signal, computed } from '@angular/core';
import { Subject } from 'rxjs';

import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/characters';
import { CharacterCardComponent } from '../character-card/character-card.component';
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
export class CharactersComponent implements OnInit, OnDestroy {
  private readonly itemsPerPage = 20;

  characters = signal<Character[]>([]);
  filteredCharacters = signal<Character[]>([]);
  searchControl = new FormControl('');
  currentPage = signal(1);
  totalPages = computed(() => Math.ceil(this.filteredCharacters().length / this.itemsPerPage));

  paginatedCharacters = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCharacters().slice(startIndex, endIndex);
  });

  private destroy$ = new Subject<void>();

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.fetchCharacters();
    this.setupSearchListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchCharacters(): void {
    this.charactersService.fetchAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.filteredCharacters.set(data);
      },
      error: (error) => console.error('Error fetching characters:', error)
    });
  }

  private setupSearchListener(): void {
    this.searchControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterCharacters(searchTerm || '');
      this.currentPage.set(1);
    });
  }

  private filterCharacters(searchTerm: string): void {
    const filtered = this.characters().filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.filteredCharacters.set(filtered);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }
}
