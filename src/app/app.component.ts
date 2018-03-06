import { Component } from '@angular/core';
import { Product } from './classes/product';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private selectedProduct: Product = null;

  showProduct(product){
    this.selectedProduct = product;
  }
}
