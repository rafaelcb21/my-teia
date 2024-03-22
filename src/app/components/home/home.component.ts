import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../header/header.component'
import { CardComponent } from '../card/card.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedDataService } from '../../services/shared-data.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnChanges {
  produtos: Product[] = []

  constructor(public dialog: MatDialog, private sharedDataService: SharedDataService) {}
  
  ngOnInit() {
    this.sharedDataService.produtos$.subscribe(produtos => {
      this.produtos = produtos;
      console.log(produtos)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    // Se houver uma mudança na entrada do componente, você pode tratar aqui
    // Note que este método só é chamado se houver alterações nas entradas do componente
  }
  
}



