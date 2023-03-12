import { Component } from '@angular/core';
import { IMovie } from './models';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public genres: {[id: number]: string};
  public genre: string;
  public title: string;

  onInputChange(e: any): void {
    this.title = e.target.value;
    this.filterMovies();
  }

  filterMovies(): IMovie[] {
    return this.moviesService.getMovies(this.title, this.genre);
  }

  constructor(public moviesService: MoviesService) {
    this.genres = this.moviesService.getAllGenres();
    this.genre = 'Все';
    this.title = '';
  }
}
