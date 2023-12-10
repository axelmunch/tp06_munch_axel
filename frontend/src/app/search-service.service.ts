import { Injectable } from "@angular/core";
import { Product } from "./models/product";
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  of,
  takeUntil,
} from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private search = new Subject<string>();
  private price = new Subject<number | null>();

  private searchElements$ = combineLatest([this.search, this.price]);
  private destroy$ = new Subject<void>();

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.searchElements$
      .pipe(
        debounceTime(1000), // Millisecondes
        distinctUntilChanged(), // Seulement au changement
        takeUntil(this.destroy$) // Arrêter l'observation à la destruction
      )
      .subscribe(([search, price]) => {
        this.searchProducts(search, price).subscribe((products) => {
          this.productsSubject.next(products);
        });
      });
  }

  public setSearchParams(search: string, price: number | null) {
    this.search.next(search);
    this.price.next(price);
  }

  public searchProducts(
    search: string,
    price: number | null
  ): Observable<Product[]> {
    return this.http
      .get<Product[]>(
        `${environment.backendCatalogueSearch}?q=${search}&priceInf=${
          price ?? 0
        }`
      )
      .pipe(catchError(() => of([])));
  }

  public getProducts(): Observable<Product[]> {
    return this.products;
  }
}
