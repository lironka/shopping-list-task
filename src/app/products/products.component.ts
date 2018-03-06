import { async } from '@angular/core/testing';
import { Component, OnInit, Output, EventEmitter, Renderer } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  private selectedProductId: number = null;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _messageService: MessageService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getListProducts()
      .subscribe(products => this.products = products);
  }

  addItem(): void {
    if(this.products[this.products.length-1].name == null) return;
    this.productService.addProduct(new Product())
      .subscribe(product => {
        this.products.push(product);
      });
  }

  deleteItem(product): void {
    // this.selectedProduct.emit(null);
    this.productService.deleteProduct(product.id).subscribe((res) => {
      let indexToRemove = this.products.findIndex(item => item.id == product.id);
      this.products.splice(indexToRemove, 1);
      if (+this.router.url.replace("/products/", '') == product.id) {
        this.router.navigate(["/"]);
      }
    });
  }

  selectItem(product: Product): void {
    this.selectedProductId = product.id;
    this.router.navigate(["/products", product.id]);
  }

  updateItem(product): void {
    this._messageService.filterUpdateDetails(product.name);
  }

}
