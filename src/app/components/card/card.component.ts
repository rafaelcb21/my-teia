import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { Product } from '../../interfaces/product.interface';

export interface DialogData {
  image: '';
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  constructor(public dialog: MatDialog) {}

  @Input() product: Product = {} as Product;

  openDialog() {
    this.dialog.open(DialogElementComponent, {
      data: {
        image: this.product.url,
      },
    });
  }
}


@Component({
  selector: 'app-dialog',
  templateUrl: 'product-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  styleUrl: './card.component.css'
})
export class DialogElementComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
}
