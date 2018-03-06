import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../product.service';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  host: {'class': 'details'}
})
export class DetailsComponent implements OnInit,OnDestroy {
  @Input() id: string;
  data = "data";
  product: Product;
  private paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private _messageService: MessageService) {
    this.paramsSubscription = this.route.params.subscribe(
      (param: any) => this.getDetails()
    );
    this._messageService.listen().subscribe((id:number) => {
      this.getDetails();
    });
    this._messageService.listenUpdateDetails().subscribe((name:string) => {
      this.updateDetails(name);
    });
    
  }
  ngOnInit(){
    this.getDetails();
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  getDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  updateDetails(name?: string): void{
    if(name){
      this.product.name = name;
    }
    this.productService.updateProduct(this.product as Product).subscribe();
  }

}
