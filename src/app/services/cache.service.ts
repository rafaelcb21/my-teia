import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly PRODUCT_CACHE_KEY = 'productBuy';

  constructor() { }

  saveProductBuy(productBuy: Product): void {

    if (typeof localStorage !== 'undefined') {
      const cachedProductBuy = localStorage.getItem(this.PRODUCT_CACHE_KEY);

      if (cachedProductBuy === null) {
        localStorage.setItem(this.PRODUCT_CACHE_KEY, JSON.stringify([]));

      } else {
        const lista = JSON.parse(cachedProductBuy)

        if (lista.length > 0 && productBuy.id !== undefined) {
          lista.push(productBuy)
          localStorage.setItem(this.PRODUCT_CACHE_KEY, JSON.stringify(lista));

        } else if (lista.length === 0 && productBuy.id !== undefined) {
          lista.push(productBuy)
          localStorage.setItem(this.PRODUCT_CACHE_KEY, JSON.stringify(lista));
        }
      }
    }
  }

  getProductBuy(): Product[] | null {
    if (typeof localStorage !== 'undefined') {
      const cachedProductBuy = localStorage.getItem(this.PRODUCT_CACHE_KEY);
      if (cachedProductBuy) {
        return JSON.parse(cachedProductBuy);
      }
    }
    return null;
  }

  clearProductBuy(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.PRODUCT_CACHE_KEY);
    }
  }
}
