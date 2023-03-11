import { Component } from '@angular/core';
import { MoviesService } from './movies.service';
import { IMovie } from './models';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public movies: IMovie[];
  public best?: IMovie;
  public genres: {[id: number]: string};
  public genre: string;
  public title: string;

  onInputChange(e: any) {
    this.title = e.target.value;
    this.filterMovies();
  }

  filterMovies() {
    this.movies = this.moviesService.filterMovies(this.title, this.genre)
  }

  constructor(private moviesService: MoviesService) {
    this.movies = this.moviesService.getMovies();
    this.genres = this.moviesService.getAllGenres();
    this.genre = 'Все';
    this.title = '';
  }
}
