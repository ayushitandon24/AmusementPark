import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Product } from './../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ShoppingCart } from '../interfaces/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }
  // filter(query: string) {
  //   let filteredProducts = (query) ?
  //     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
      
  //     this.populateProducts(query);
  //     console.log(filteredProducts);
  // }
  private populateProducts(query?: string) {
    this.productService.getAll()
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      console.log("Category : " + this.category);
      this.applyFilter(query);
    });
  }

  private applyFilter(query?: string) {
    
    this.filteredProducts=(query && this.category)?this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) && p.category === this.category) : 
    (this.category)?this.products.filter(p => p.category === this.category) :
    (query)?this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
    this.products;
    
  }
}
