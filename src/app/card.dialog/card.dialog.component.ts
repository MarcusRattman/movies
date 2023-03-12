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
    return this.moviesService.isBest(this.data.movie);
  }

  bestify() {
    this.moviesService.bestify(this.data.movie);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}