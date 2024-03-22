import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MatDialog } from '@angular/material/dialog';
import { Product, ProductUrl } from '../../interfaces/product.interface';
import { FilterComponent } from '../filter/filter.component';
import { NgFor } from '@angular/common';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { ProductsService } from '../../services/products.service';
import { CacheService } from '../../services/cache.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    FilterComponent,
    NgFor,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    NgIf,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
  ],
  providers: [
    ProductsService, CacheService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    public dialog: MatDialog,
    private service: ProductsService,
    private cacheService: CacheService) {}

  produtos: Product[] = [];
  productShopping: Product = {} as Product;
  length = 5000;
  pageSize = 12;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  numberOfItems: number = 0;
  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 12,
    length: 0
  }

  urlNext: string = ''

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;

    // avancando na paginacao
    if(e.pageIndex > this.pageIndex) {
      this.pageIndex = e.pageIndex;

      const obj = this.convertStartEndToNumber(this.urlNext);

      let start = obj.startEnd[0];
      let end = obj.startEnd[1];

      let parsedStart: number = obj.listNumbers[0];
      let parsedEnd: number = obj.listNumbers[1];
  
      parsedEnd = (e.pageIndex + 1) * 12;
      const diferenca = parsedEnd - parsedStart;
  
      if (diferenca > 24) {
        start = (parsedEnd - 12).toString();
        end = '5000';

      } else {
        start = end;
        end = ((e.pageIndex + 1) * 12).toString();
      }
  
      this.urlNext = this.urlNext.replace(/_start=\d+/, `_start=${start}`);
      this.urlNext = this.urlNext.replace(/_end=\d+/, `_end=${end}`);
  
      this.service.fetchGet(this.urlNext)
        .subscribe((produtos: Product[]) => {
        this.produtos = produtos
      });

    } else {
      // voltando na paginacao
      this.pageIndex = e.pageIndex;

      const obj = this.convertStartEndToNumber(this.urlNext);

      let start = obj.startEnd[0];
      let end = obj.startEnd[1];

      let parsedStart: number = obj.listNumbers[0];
      let parsedEnd: number = obj.listNumbers[1];

      parsedStart = (e.pageIndex) * 12;
      parsedEnd = (e.pageIndex + 1) * 12;
      
      start = parsedStart.toString();
      end = parsedEnd.toString();

      this.urlNext = this.urlNext.replace(/_start=\d+/, `_start=${start}`);
      this.urlNext = this.urlNext.replace(/_end=\d+/, `_end=${end}`);

      this.service.fetchGet(this.urlNext)
        .subscribe((produtos: Product[]) => {
        this.produtos = produtos
      });
    }
  }

  buyProduct($event: Product) {
    this.cacheService.saveProductBuy($event);
    const productSaved = this.cacheService.getProductBuy()

    if (productSaved !== null) {
      this.numberOfItems = productSaved.length
    }
  }

  receiveProducts($event: ProductUrl) {
    this.urlNext = $event.url
    const params = new URLSearchParams(this.urlNext.split('?')[1]);

    if (params.has('albumId')) {
      this.length = 50
    }

    if (params.has('id')) {
      this.length = 1
    }

    if (!params.has('albumId') && !params.has('id')) {
      this.length = 5000
    }

    this.produtos = $event.products
  }

  convertStartEndToNumber(url: string) {
    const params = new URLSearchParams(url.split('?')[1]);
  
    let end = params.get('_end');
    let start = params.get('_start');

    let parsedStart: number;
    let parsedEnd: number;

    let startNoNull: string = '0';
    let endNoNull: string = '0';

    if (start !== null) {
      parsedStart = parseInt(start, 10);
    } else {
      parsedStart = 0;
    }

    if (end !== null) {
      parsedEnd = parseInt(end, 10);
    } else {
      parsedEnd = 0;
    }

    if (start != null) {
      startNoNull = start
    }

    if (end != null) {
      endNoNull = end
    }

    const startEnd: string[] = [startNoNull, endNoNull]
    const listNumbers: number[] = [parsedStart, parsedEnd]

    type obj = {
      startEnd: string[],
      listNumbers: number[]
    }

    const newObj: obj = {startEnd, listNumbers}

    return newObj
  }

  
  
}



