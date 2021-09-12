import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ICategory, IShopItem } from 'src/app/models/app-models.model';
import { catalogResultSelector } from 'src/app/redux/selectors/catalog.selector';
import { IAppState } from 'src/app/redux/store/state';
import { ShopService } from 'src/app/services/shop.service';

export interface BreadCrumbData {
  category: string,
  subCategory: string,
  catalog: string,
  subCatalog: string
}

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit, OnDestroy {

  public catalog$: Observable<ICategory>;

  public subCatItem$: Observable<IShopItem[]>;

  public subCatItem: IShopItem[];

  private category$: Observable<string>;

  private subCategory$: Observable<string>;

  public breadCrumbData: BreadCrumbData = {category: '', subCategory: '', catalog: '', subCatalog: ''};

  public items: MenuItem[];

  public home: MenuItem;

  public priceSortOptions: SelectItem[];

  public ratingSortOptions: SelectItem[];

  public sortOrder: number;

  public sortField: string;

  private subscriptions: Subscription = new Subscription;

  public loadMoreButton: boolean;

  constructor(
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private store: Store<IAppState>,
    private shopService: ShopService
    ) { }

  public ngOnInit(): void {
    this.catalog$ = this.store.select(catalogResultSelector).pipe(
      take(1),
      map(catalogsArray => catalogsArray
        .find(catalog => catalog.id === this.breadCrumbData.category)!
        )
    );

    this.subCatItem$ = this.route.data.pipe(map(d => d.subCatItem));

    this.category$ = this.route.url.pipe(map(segments => segments.join('/').split('/')[segments.length - 2]));

    this.subCategory$ = this.route.url.pipe(map(segments => segments.join('/').split('/')[segments.length - 1]));

    this.subscriptions.add(this.category$.subscribe((res) => {
      this.breadCrumbData.category = res;
      this.catalog$.subscribe((res) => {
        this.breadCrumbData.catalog = res.name;
      });
    }));

    this.subscriptions.add(this.subCategory$.subscribe((res) => {
      this.breadCrumbData.subCategory = res;
      this.catalog$.subscribe((res) => {
        this.breadCrumbData.subCatalog = res.subCategories
        .find(subCategory => subCategory.id === this.breadCrumbData.subCategory)?.name!
      });
    }));

    this.subscriptions.add(this.subCatItem$.subscribe((res) => {
      this.shopService.countOfItems$.subscribe((res) => {
        this.shopService.getSubCategoryItemsByCategory(this.breadCrumbData.category, this.breadCrumbData.subCategory, res).subscribe((res) => {
          this.subCatItem = res;
          this.shopService.getSubCategoryItemsByCategory(this.breadCrumbData.category, this.breadCrumbData.subCategory, res.length + 1).subscribe((res) => {
            if (res.length > this.subCatItem.length) {
              this.loadMoreButton = true;
            } else {
              this.loadMoreButton = false;
            }
          })
        })
      })

      this.items = [
        {label: this.breadCrumbData.catalog},
        {label: this.breadCrumbData.subCatalog},
      ];
    }));

    this.home = {icon: 'pi pi-home'};

    this.priceSortOptions = [
        {label: 'Сначала дорогие', value: '!price'},
        {label: 'Сначала дешёвые', value: 'price'},
    ];

    this.ratingSortOptions = [
        {label: 'Сначала популярные', value: '!rating'},
        {label: 'Сначала не популярные', value: 'rating'}
    ];

    this.primengConfig.ripple = true;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe;
  }

  public onSortChange(event: HTMLInputElement): void {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  public onLoadMore() {
    this.shopService.getNextSubCategoryItems(this.shopService.countOfItems$.value + 10);
  }
}
