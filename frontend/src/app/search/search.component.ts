import { Component } from '@angular/core';
import { SearchService } from '../search-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private searchService: SearchService) {}

  search: string = '';
  price: number | null = null;

  reset() {
    this.search = '';
    this.price = null;
    this.startSearch();
  }

  startSearch() {
    this.searchService.setSearchParams(this.search, this.price);
  }
}
