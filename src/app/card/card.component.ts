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
  icon = 'favorite_border';
  fav = false;
  hidden = true;

  constructor (private moviesService: MoviesService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(CardDialogComponent, {
      data: {
        movie: this.movie,
        genres: this.genres,
      }
    });
  }

  like() {
    this.fav = !this.fav;

    if (this.fav) {
      this.icon = 'favorite';
    }
    else {
      this.icon = 'favorite_border';
    }
  }

  hover() {
    this.hidden = !this.hidden;
  }

  ngOnInit(): void {
    if (this.movie) {
      this.genres = this.moviesService.getMovieGenres(this.movie.genre);
    }
  }
}
