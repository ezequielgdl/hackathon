import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  // fetch characters from https://rickandmortyapi.com/api/character
  fetchCharacters(): Observable<any> {
    return this.http.get('https://rickandmortyapi.com/api/character');
  }
}
