import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getRepo(query: string): Observable<any> {
    const url = `https://api.github.com/search/repositories?q=${query}`;
    return this.http.get(url);
  }
}
