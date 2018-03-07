import { Injectable } from '@angular/core';
import { Product } from './classes/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

  private productsUrl = 'api/products';  // URL to web api
  private productsLocal: Product[];

  constructor(private http: HttpClient) { }

  getListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
    .catch(this.handleError('getListProducts', []));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl + '/'+ id)
    .pipe(
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  addProduct (product: Product): Observable<Product> {
    return this.http
    .post<Product>(this.productsUrl, product)
    .pipe(
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct (product: Product): Observable<any> {
    return this.http
    .put(this.productsUrl + '/'+ product.id, product)
    .pipe(
      catchError(this.handleError<Product>('updateProduct'))
    );
  }

  deleteProduct (productId: number): Observable<null> {
    return this.http
    .delete(this.productsUrl + '/'+ productId)
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
