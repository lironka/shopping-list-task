import {fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { ReflectiveInjector } from '@angular/core';

import { ProductService } from './product.service';
import { Product } from './classes/product';

const dummyProducts: Product[] =  [
  {
    id: 11,
    name: "Melon",
    quantity: 2,
    price: 23,
    description: "White"
  },
  {
    id: 12,
    name: "Milk",
    quantity: 3,
    price: 23,
    description: "Red carrot"
  }
];

describe('MockBackend ProductService Example', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      ProductService 
    ]);

    this.ProductService = this.injector.get(ProductService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('GET getListProducts()', fakeAsync(() => {
    let result: Product[];
      this.ProductService.getListProducts().toPromise().then((products) => result = products);
      this.lastConnection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(dummyProducts), 
      })));
      tick(); 
      expect(result).toBeDefined();
      expect(result.length).toEqual(dummyProducts.length, 'should contain given amount of Products');
      expect(result[0].name).toEqual(dummyProducts[0].name, 'dummyProducts[0] name should be the first product name');
      expect(result[1].name).toEqual(dummyProducts[1].name, ' dummyProducts[0] should be the second product name');
    }));

  it('GET getListProducts() while server is down', fakeAsync(() => {
      let result: Product[];
      let catchedError: any;
      this.ProductService.getListProducts().toPromise()
          .then((products: Product[]) => result = products)
          .catch((error: any) => catchedError = error);
      this.lastConnection.mockRespond(new Response(new ResponseOptions({
        status: 404,
        statusText: 'URL not Found',
      })));
      tick();
      if(result){ 
        expect(result).toBeDefined();
        expect(result.length).toEqual(0);
      } else {
        expect(result).toBeUndefined();
        expect(catchedError).toBeDefined('catchedError toBeDefined');
      }
    }));

  it('GET by ID getProduct()', fakeAsync(() => {
    let result: Product;
      this.ProductService.getProduct(dummyProducts[0].id).toPromise().then((product) => result = product);
      this.lastConnection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(dummyProducts[0]), 
      })));
      tick(); 
      expect(result.name).toEqual(dummyProducts[0].name, 'dummyProducts[0] name should be the product name');
      expect(result.id).toEqual(dummyProducts[0].id, 'dummyProducts[0] name should be the product name');
    }));

  it('POST addProduct()', fakeAsync(() => {
      const dummyProduct = new Product();
      dummyProduct.id = 23;
      let result: Product;

      this.ProductService.addProduct(new Product()).toPromise().then((product) => result = product);
      this.lastConnection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(dummyProduct), 
      })));
      tick(); 
      
      expect(result).toBeDefined();
      expect(result.id).toEqual(dummyProduct.id, 'should contain id of new Products');
    }));
  it('POST updateProduct()', fakeAsync(() => {
      const dummyProduct = dummyProducts[1];
      let result: Product;

      this.ProductService.updateProduct(dummyProduct).toPromise().then((product) => result = product);
      this.lastConnection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(dummyProduct), 
      })));
      tick(); 
      
      expect(result).toBeDefined();
      expect(result.id).toEqual(dummyProduct.id);
      expect(result.name).toEqual(dummyProduct.name);
      expect(result.price).toEqual(dummyProduct.price);
    }));
  it('DELETE deleteProduct()', fakeAsync(() => {
      const dummyProduct = dummyProducts[0];
      let result: Product;

      this.ProductService.deleteProduct(dummyProduct.id).toPromise().then((products) => result = products);
      this.lastConnection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(null), 
      })));
      tick(); 
      
      expect(result).toBeNull();
    }));
});