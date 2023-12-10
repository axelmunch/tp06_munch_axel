import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Product } from 'src/shared/models/product';
import { DelProduct } from 'src/shared/actions/product-action';
import { ProductState } from 'src/shared/states/product-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['../../list/list.component.css'],
})
export class PanierComponent implements OnInit {
  total: number = 0;

  constructor(private store: Store) {}

  @Select(ProductState.getListeProducts) liste$: Observable<Product[]>;
  ngOnInit() {
    this.liste$.subscribe((liste) => {
      this.total = 0;
      liste.forEach((p) => {
        this.total += p.price;
      });
    });
  }

  delProduct(p: Product): void {
    this.store.dispatch(new DelProduct(p));
  }
}
