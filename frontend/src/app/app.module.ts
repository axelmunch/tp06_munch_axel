import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxsModule } from "@ngxs/store";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search/search.component";
import { ListComponent } from "./list/list.component";
import { ApiService } from "./api.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { SearchService } from "./search-service.service";
import { ProductState } from "src/shared/states/product-state";
import { ProductsModule } from "./products/products.module";
import { HeaderComponent } from "./header/header.component";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CartComponent } from "./cart/cart.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiHttpInterceptor } from "./http-interceptor";

const appRoutes: Routes = [
//   { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "cart", component: CartComponent },

//   { path: "**", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxsModule.forRoot([ProductState]),
    ProductsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    HttpClient,
    ApiService,
    SearchService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
