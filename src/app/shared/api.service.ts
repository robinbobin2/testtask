import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://www.omdbapi.com/?apikey=';
  apikey = 'ca00dc70';
  list: Array<Movie> = [];

  constructor(private http: HttpClient) { }

  // Выводим список фильмов по строке поиска
  public searchMovie(term) {
    return this.http.get(this.url + this.apikey + '&s=' + term);
  }

  // Выводим инфу о фильме для страницы /movie/:imdbID
  public searchById(term) {
    return this.http.get(this.url + this.apikey + '&i=' + term);
  }
}
