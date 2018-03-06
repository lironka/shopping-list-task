import { Injectable } from '@angular/core';
import { Product } from './classes/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../environments/environment';
const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

  private productsLocal: Product[];

  constructor(private http: Http) { }

  getListProducts(): Observable<Product[]> {
    return this.http.get(API_URL + '/products')
    .map((response) => {
        const products = response.json();
        return products.map((product) => new Product(product)); 
    })
    .catch(this.handleError('getListProducts', []));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get(API_URL + '/products/' + id)
    .map(response => {
      return new Product(response.json());
    }).pipe(
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  addProduct (product: Product): Observable<Product> {
    return this.http
    .post(API_URL + '/products', product)
    .map(response => new Product(response.json()))
    .pipe(
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct (product: Product): Observable<any> {
    return this.http
    .put(API_URL + '/products/' + product.id, product)
    .map(response => new Product(response.json()))
    .pipe(
      catchError(this.handleError<Product>('updateProduct'))
    );
  }

  deleteProduct (productId: number): Observable<null> {
    return this.http
    .delete(API_URL + '/products/' + productId)
    .map(response => null)
    .pipe(
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}
