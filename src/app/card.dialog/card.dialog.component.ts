import { Component, Inject } from '@angular/core';
import { IMovie } from '../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  movie: IMovie,
  genres: string,
  best: boolean,
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
    ) { }

  onNoClick() {
    this.dialogRef.close();
  }
}