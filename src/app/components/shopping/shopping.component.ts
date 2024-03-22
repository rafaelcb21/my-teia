import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { CacheService } from '../../services/cache.service';
import { Product } from '../../interfaces/product.interface';
import { NgFor } from '@angular/common';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    MatListModule,
    NgFor,
  ],
  providers: [CacheService],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css'
})
export class ShoppingComponent implements OnInit {

  constructor(private cacheService: CacheService, private _snackBar: MatSnackBar) {}
  
  produtos: Product[] = [];
  selectedProduct: Product[] = [];

  ngOnInit() {
    const productSaved = this.cacheService.getProductBuy()
    if (productSaved !== null) {
      this.produtos = productSaved
    }
  }

  removeItems(a: any, b: any) {
    let counts: any = {};
    a.forEach((item: any) => {
      if (counts[item]) {
          counts[item]++;
      } else {
          counts[item] = 1;
      }
    });

    return b.filter((item: any) => {
      if (counts[item.id] && counts[item.id] > 0) {
          counts[item.id]--;
          return false;
      }
      return true;
    });
}

  excluir() {
    let idsParaExcluir = this.selectedProduct.map(obj => obj.id);
    const resultado = this.removeItems(idsParaExcluir, this.produtos)
    localStorage.setItem('productBuy', JSON.stringify(resultado));

    const productSaved = this.cacheService.getProductBuy()
    if (productSaved !== null) {
      this.produtos = productSaved

      this._snackBar.openFromComponent(annotatedComponent, {
        duration: 2000,
      });
    }
  }

  trackByFn(index: number) {
    return index;
  }

  onSelectionChange(event: any) {
    this.selectedProduct = event.source.selectedOptions.selected.map((option: any) => option.value);
  }
}


@Component({
  selector: 'app-confIrmacao',
  templateUrl: 'confirmacao.component.html',
  styles: `
    :host {
      display: flex;
    }

    .confirmacao {
      color: white;
    }
  `,
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
})
export class annotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}
