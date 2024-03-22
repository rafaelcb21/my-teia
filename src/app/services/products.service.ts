import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private endpointUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient, private sharedDataService: SharedDataService) { }

  fetchLastProduct() {
    return this.http.get<Product[]>(this.endpointUrl + '?_sort=id&_order=desc&_limit=1')
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

    const url = this.endpointUrl + '?_sort=id&_start=0&_end=20' + urlParams
    this.sharedDataService.setUrl(url);  
    const response = this.http.get<Product[]>(url)
    return response
  }
}
