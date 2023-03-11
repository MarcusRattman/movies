import { Injectable } from '@angular/core';
import { IMovie } from './models';
import data from '../assets/data.json'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movies: IMovie[];
  private genres: {[id: number]: string};
  
  constructor() {
    this.movies = data;
    this.genres = {
      1: "драма",
      2: "биография",
      3: "история",
      4: "фэнтези",
      5: "приключения",
      6: "боевик",
      7: "мультфильм",
      8: "комедия",
      9: "триллер",
      10: "детектив",
      11: "фантастика",
    }
  }

  getMovies() { return this.movies }

  filterMovies(title: string, genre: string) {
    const result = this.movies.filter((movie) => movie.name.toLowerCase().includes(title.toLowerCase()));
    
    if (genre == 'Все') {
      return result;
    }

    return result.filter((movie) => this.getMovieGenres(movie.genre).includes(genre));
  }

  getMovieGenres(genres: number[]): string {
    return genres.map((genre) => this.genres[genre]).join(', ');
  }

  getAllGenres() {
    return this.genres;
  }
}
