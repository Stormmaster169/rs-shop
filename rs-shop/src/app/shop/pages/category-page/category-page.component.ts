import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BreadCrumbData, ICategory, IShopItem } from 'src/app/models/app-models.model';
import { getUserInfo } from 'src/app/redux/actions/user.actions';
import { catalogResultSelector } from 'src/app/redux/selectors/catalog.selector';
import { userCartSelector, userFavoritesSelector } from 'src/app/redux/selectors/user.selector';
import { IAppState } from 'src/app/redux/store/state';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  private userCart$: Observable<string[]>;

  public userCart: string[];

  private userFavorites$: Observable<string[]>;

  public userFavorites: string[];

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

  public isLogin: boolean;

  constructor(
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private store: Store<IAppState>,
    private shopService: ShopService,
    private userService: UserService,
    private authService: AuthService
    ) {
      this.userCart$ = this.store.select(userCartSelector);
      this.userFavorites$ = this.store.select(userFavoritesSelector);
    }

  public ngOnInit(): void {
    this.subscriptions.add(this.userCart$.subscribe((res) => {
      this.userCart = res;
    }))

    this.subscriptions.add(this.userFavorites$.subscribe((res) => {
      this.userFavorites = res;
    }))

    this.catalog$ = this.store.select(catalogResultSelector).pipe(
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

    this.subscriptions.add(this.authService.isLogin$.subscribe((res) => {
      this.isLogin = res;
    }))

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

  public onAddToCart(item: IShopItem) {
    this.subscriptions.add(this.userService.addItemToCart(item).subscribe());
    this.store.dispatch(getUserInfo());
  }

  public onAddToFavorites(item: IShopItem) {
    this.subscriptions.add(this.userService.addItemToFavorites(item).subscribe());
    this.store.dispatch(getUserInfo());
  }
}
