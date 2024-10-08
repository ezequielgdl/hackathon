import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Character } from '../interfaces/characters';
import { forkJoin, mergeMap, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  fetchCharacters(page: number = 1): Observable<any> {
    return this.http.get<any>(`https://rickandmortyapi.com/api/character?page=${page}`);
  }

  fetchAllCharacters(): Observable<Character[]> {
    return this.fetchCharacters().pipe(
      mergeMap(firstPage => {
        const totalPages = firstPage.info.pages;
        const pageRequests = Array.from({ length: totalPages }, (_, i) => this.fetchCharacters(i + 1));
        return forkJoin(pageRequests);
      }),
      map((pages: any[]) => pages.flatMap(page => page.results))
    );
  }
}
