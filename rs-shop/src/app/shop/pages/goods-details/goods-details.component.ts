import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IShopItem } from 'src/app/models/app-models.model';
import { getUserInfo } from 'src/app/redux/actions/user.actions';
import { catalogResultSelector } from 'src/app/redux/selectors/catalog.selector';
import { userCartSelector, userFavoritesSelector } from 'src/app/redux/selectors/user.selector';
import { IAppState } from 'src/app/redux/store/state';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.component.html',
  styleUrls: ['./goods-details.component.scss']
})
export class GoodsDetailsComponent implements OnInit, OnDestroy {
  private userCart$: Observable<string[]>;

  public userCart: string[];

  private userFavorites$: Observable<string[]>;

  public userFavorites: string[];

  public isLogin: boolean;

  public category: string;

  public subCategory: string;

  public shopItem: IShopItem;

  public subscriptions: Subscription = new Subscription();

  public items: MenuItem[];

  public home: MenuItem;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private userService: UserService,
    private authService: AuthService
    ) {
      this.userCart$ = this.store.select(userCartSelector);
      this.userFavorites$ = this.store.select(userFavoritesSelector);
    }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.route.data.subscribe((data) => {
        this.shopItem = data.item
      })
    );

    this.subscriptions.add(
      this.store.select(catalogResultSelector).pipe(
        map(catalogsArray => catalogsArray
          .find(catalog => catalog.id === this.shopItem.category)!
          )
      ).subscribe(res => this.category = res.name)
    );

    this.subscriptions.add(
      this.store.select(catalogResultSelector).pipe(
        map(catalogsArray => catalogsArray
          .find(catalog => catalog.id === this.shopItem.category)!
          .subCategories.find(subCategory => subCategory.id === this.shopItem.subCategory)!
          )
      ).subscribe(res => this.subCategory = res.name)
    );

    this.subscriptions.add(this.userCart$.subscribe((res) => {
      this.userCart = res;
    }))

    this.subscriptions.add(this.userFavorites$.subscribe((res) => {
      this.userFavorites = res;
    }))

    this.subscriptions.add(this.authService.isLogin$.subscribe((res) => {
      this.isLogin = res;
    }))

    this.items = [
      {label: this.category},
      {label: this.subCategory},
    ];

    this.home = {icon: 'pi pi-home'};
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe;
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
