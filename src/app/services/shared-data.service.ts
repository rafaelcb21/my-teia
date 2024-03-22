import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private produtosSubject = new BehaviorSubject<Product[]>([]);
  produtos$: Observable<Product[]> = this.produtosSubject.asObservable();

  private urlSubject = new BehaviorSubject<string>('');
  url$: Observable<string> = this.urlSubject.asObservable();

  constructor() {}

  setProdutos(produtos: Product[]) {
    this.produtosSubject.next(produtos);
  }

  setUrl(url: string) {
    this.urlSubject.next(url);
  }
}
