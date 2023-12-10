import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier/panier.component';
import { ProductState } from 'src/shared/states/product-state';

@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,
    NgxsModule.forFeature([ProductState]),
  ],

  declarations: [PanierComponent],
  exports: [PanierComponent],
})
export class ProductsModule {}
