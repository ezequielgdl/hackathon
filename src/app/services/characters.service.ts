import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Character } from '../interfaces/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private readonly API_URL = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  fetchCharacters(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.API_URL}?page=${page}`);
  }

  fetchAllCharacters(): Observable<Character[]> {
    return this.fetchCharacters().pipe(
      mergeMap(firstPage => {
        const totalPages = firstPage.info.pages;
        const pageRequests = Array.from(
          { length: totalPages }, 
          (_, i) => this.fetchCharacters(i + 1)
        );
        return forkJoin(pageRequests);
      }),
      map((pages: any[]) => pages.flatMap(page => page.results))
    );
  }
}
