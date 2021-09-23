import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IShopItem } from 'src/app/models/app-models.model';
import { catalogResultSelector } from 'src/app/redux/selectors/catalog.selector';
import { IAppState } from 'src/app/redux/store/state';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  public carouselItems: IShopItem[];

  public subscriptions: Subscription = new Subscription();

  public responsiveOptions = [
    {
      breakpoint: '1366px',
      numVisible: 5,
      numScroll: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private store: Store<IAppState>,
    private shopService: ShopService,
    ) { }

  public ngOnInit(): void {
    this.subscriptions.add(this.store.select(catalogResultSelector).subscribe(categories => {
      this.carouselItems = []
      let carouselItems: IShopItem[] = [];
      categories.map(category => {
        category.subCategories.map(subCategory => {
          this.shopService.getSubCategoryAllItemsByCategory(category.id, subCategory.id).subscribe(res => {
            if (res.sort((a, b) => a.rating > b.rating ? -1 : 1)[1].rating === 5) {
              carouselItems = [...carouselItems, res.sort((a, b) => a.rating > b.rating ? -1 : 1)[1]]
              this.carouselItems = carouselItems
            }
          })
        })
      })
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
