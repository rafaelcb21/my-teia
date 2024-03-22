import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { SharedDataService } from '../../services/shared-data.service';


interface Sort {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    NgFor,
  ],
  providers: [
    ProductsService,
    SharedDataService
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {

  constructor(
    private service: ProductsService,
    private SharedDataService: SharedDataService
  ) {}

  albumControl = new FormControl('');
  albumOptions: string[] = [];
  filteteredAlbumOptions: Observable<string[]> = new Observable<string[]>();

  productControl = new FormControl('');
  productOptions: string[] = [];
  filteteredProductOptions: Observable<string[]> = new Observable<string[]>();

  sorted: Sort[] = [
    {value: 'asc', viewValue: 'do menor para o maior'},
    {value: 'desc', viewValue: 'do maior para o menor'}
  ];

  lastAlbum: number = 0;
  lastProduct: number = 0;
  paramAlbum: string = '';
  paramProduct: string = '';
  params: Map<string, string> = new Map([['albumId=', ''], ['id=', ''], ['_order=', '']]);

  ngOnInit() {
    this.service.fetchLastProduct().subscribe((data: Product[]) => {
      this.lastAlbum = data[0].albumId;
      this.lastProduct = data[0].id;

      this.albumOptions = this.generateLisNumbersstring(this.lastAlbum)
      this.productOptions = this.generateLisNumbersstring(this.lastProduct)
    });

    this.filteteredAlbumOptions = this.albumControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAlbum(value || '')),
    );

    this.filteteredProductOptions = this.productControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProduct(value || '')),
    );

    this.albumControl.valueChanges.subscribe(value => {
      if (value !== null) {
        const isItemPresent = this.albumOptions.includes(value);
        if(isItemPresent || value === '') {
          this.params.set('albumId=', value);
          this.service.fetchGetProducts(this.params)
            .subscribe((produtos: Product[]) => {
            this.SharedDataService.setProdutos(produtos)
          });
        }
      }
    });

    this.productControl.valueChanges.subscribe(value => {
      if (value !== null) {
        const isItemPresent = this.productOptions.includes(value);
        if(isItemPresent || value === '') {
          this.params.set('id=', value);
          this.service.fetchGetProducts(this.params)
            .subscribe((produtos: Product[]) => {
              this.SharedDataService.setProdutos(produtos)
            });
        }
      }
    });
  }

  selectSort(value: string | null) {
    if (value !== null) {
      this.params.set('_order=', value);
      this.service.fetchGetProducts(this.params)
        .subscribe((produtos: Product[]) => {
          this.SharedDataService.setProdutos(produtos)
        });
    } else {
      this.params.set('_order=', '');
      this.service.fetchGetProducts(this.params)
        .subscribe((produtos: Product[]) => {
          this.SharedDataService.setProdutos(produtos)
        });
    }
  }

  private _filterAlbum(value: string): string[] {
    return this.albumOptions.filter(option => option.includes(value));
  }

  private _filterProduct(value: string): string[] {
    return this.productOptions.filter(option => option.includes(value));
  }

  trackByFn(index: number) {
    return index;
  }

  generateLisNumbersstring(num: number) {
    const numbersString: string[] = [];
    for (let i = 1; i <= num; i++) {
      numbersString.push(i.toString());
    }
    return numbersString
  }
}
