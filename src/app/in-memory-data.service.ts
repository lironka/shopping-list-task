import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './classes/product';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
        { id: 11, name: 'Big Bread', quantity: 2, price: 23,description: 'White' },
        { id: 12, name: 'Milk', quantity: 2, price: 3,description: null },
        { id: 13, name: 'Red Apple', quantity: 1, price: 5,description: null },
        { id: 14, name: 'Carrot', quantity: null, price: null,description: null }
    ];
    return {products};
  }
  genId(products: Product[]): number {
      return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }
}