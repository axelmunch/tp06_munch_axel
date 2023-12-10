import { Component } from "@angular/core";
import { Subscription } from "rxjs";
// import { ApiService } from '../backend/api.service';
import { Product } from "../models/product";
import { SearchService } from "../search-service.service";
import { AddProduct } from "src/shared/actions/product-action";
import { Store } from "@ngxs/store";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent {
  private subscriptions: Subscription[] = [];

  products: Product[] = [];

  constructor(private searchService: SearchService, private store: Store) {}

  ngOnInit() {
    this.subscriptions.push(
      this.searchService.getProducts().subscribe((products) => {
        this.products = products;
      })
    );
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addProduct(p: Product) {
    this.store.dispatch(new AddProduct(p));
  }
}
