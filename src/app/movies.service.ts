import { Injectable } from '@angular/core';
import { IMovie, IGenre } from './models';
import { Observable, of } from 'rxjs';
import data from '../assets/data.json'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movies: IMovie[];
  private genres: IGenre;
  private best: Observable<IMovie>;
  
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
    const retrieved = localStorage.getItem('best');
    if (retrieved) {
      this.best = of(JSON.parse(retrieved));
    }
    else {
      this.best = new Observable<IMovie>;
    }
  }

  getBest(): Observable<IMovie> {
    return this.best;
  }

  isBest(movie: IMovie): boolean {
    let id = 0;
    this.getBest()?.subscribe(data => id = data.id).unsubscribe();

    if (movie.id === id) {
      return true;
    }

    return false;
  }

  bestify(movie: IMovie): void {
    let id = 0;
    this.getBest()?.subscribe(data => id = data.id).unsubscribe();

    if (movie.id !== id) {
      this.best = of(movie);
    } else {
      this.best = new Observable<IMovie>;
      localStorage.removeItem('best');
    }

    this.best.subscribe((movie) => localStorage.setItem('best', JSON.stringify(movie))).unsubscribe();
  }

  getMovies(title: string, genre: string): IMovie[] {
    const result = this.movies.filter((movie) => movie.name.toLowerCase().includes(title.toLowerCase()));
    
    if (genre == 'Все') {
      return result;
    }

    return result.filter((movie) => this.getMovieGenres(movie.genre).includes(genre));
  }

  getMovieGenres(genres: number[]): string {
    return genres.map((genre) => this.genres[genre]).join(', ');
  }

  getAllGenres(): IGenre {
    return this.genres;
  }
}
