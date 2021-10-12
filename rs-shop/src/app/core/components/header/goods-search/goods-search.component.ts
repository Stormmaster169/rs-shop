import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { IShopItem } from 'src/app/models/app-models.model';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-goods-search',
  templateUrl: './goods-search.component.html',
  styleUrls: ['./goods-search.component.scss']
})
export class GoodsSearchComponent implements AfterViewInit {

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  public searchInputValue: string = '';

  // public searchItems$: Observable<IShopItem[]>;

  public searchItems: IShopItem[];

  constructor(private shopService: ShopService) { }

  public ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map(() => this.searchInputValue),
        filter(searchString => searchString.length >= 3),
        debounceTime(500)
      )
      .subscribe(searchString => {
        this.shopService.getSearchItems(searchString).subscribe((res)=> this.searchItems = res);
        // this.searchItems$.subscribe((items )=> this.searchItems = items);
      });
  }
}
