import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private endpointUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  fetchLastProduct() {
    return this.http.get<Product[]>(this.endpointUrl + '?_sort=id&_order=desc&_limit=1')
  }

  fetchGet(url: string) {
    return this.http.get<Product[]>(url)
  }

  fetchGetProducts(param: Map<string, string> ) {
    let urlParams = '';

    param.forEach((valor, chave) => {
      if (valor !== '') {
        if (urlParams !== '') {
          urlParams += '&';
        }
        urlParams += chave + valor;
      }
    })

    const url = this.endpointUrl + '?_sort=id&_start=0&_end=12&' + urlParams
    return this.http.get<Product[]>(url).pipe(
      map((products: Product[]) => {
        return { products, url };
      })
    );
  }
}
