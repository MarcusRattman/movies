import { Component, Inject } from '@angular/core';
import { IMovie } from '../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoviesService } from '../movies.service';

export interface DialogData {
  movie: IMovie,
  genres: string,
}

@Component({
  selector: 'app-card.dialog',
  templateUrl: './card.dialog.component.html',
  styleUrls: ['./card.dialog.component.scss']
})
export class CardDialogComponent {
  constructor (
    public dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    private moviesService: MoviesService
    ) { }

  isBest(): boolean {
    let currBest = 0;
    this.moviesService.getBest()?.subscribe(data => currBest = data.id).unsubscribe();

    if (this.data.movie.id == currBest) {
      return true;
    }
    return false;
  }

  bestify() {
    if (this.isBest()) {
      this.moviesService.bestify(null);
    }
    else {
      this.moviesService.bestify(this.data.movie);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}