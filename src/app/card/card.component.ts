import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDialogComponent } from '../card.dialog/card.dialog.component';
import { IMovie } from '../models';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  @Input() movie!: IMovie | null;
  genres!: string;
  icon: 'favorite_border' | 'favorite' | string = '';
  hidden = true;

  constructor (private moviesService: MoviesService, public dialog: MatDialog) { }

  updateState() {
    if (this.movie) {
      this.icon = this.moviesService.isBest(this.movie) ? 'favorite' : 'favorite_border';
      this.genres = this.moviesService.getMovieGenres(this.movie.genre);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CardDialogComponent, {
      data: {
        movie: this.movie,
        genres: this.genres,
      }
    });
  }

  like() {
    if (this.movie) {
      this.moviesService.bestify(this.movie);
      this.updateState();
    }
  }

  hover() {
    this.hidden = !this.hidden;
    this.updateState();
  }

  ngOnInit(): void {
    this.updateState();
  }
}
