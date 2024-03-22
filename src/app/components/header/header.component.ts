import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FilterComponent } from '../filter/filter.component';
import { SharedDataService } from '../../services/shared-data.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavbarComponent,
    FilterComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  produtos: Product[] = [];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.produtos$.subscribe(produtos => {
      this.produtos = produtos;
      console.log('eeee', this.produtos)
    });
  }
}
