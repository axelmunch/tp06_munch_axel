import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { AddProduct, DelProduct } from '../actions/product-action';
import { ProductStateModel } from './product-state-model';
import { Product } from '../models/product';

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductState {
  @Selector()
  static getNbProducts(state: ProductStateModel) {
    return state.products ? state.products.length : 0;
  }

  @Selector()
  static getListeProducts(state: ProductStateModel) {
    return state.products ?? [];
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    const state = getState();
    patchState({
      products: [...(state.products ?? []), payload],
    });
  }

  @Action(DelProduct)
  del(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: DelProduct
  ) {
    const state = getState();
    let deleted = false;
    patchState({
      products: state.products
        ? state.products.filter((x: Product) => {
            let ret = x.ref !== payload.ref;
            if (deleted) {
              return true;
            }
            if (ret == false) {
              deleted = true;
            }
            return ret;
          })
        : [],
    });
  }
}
