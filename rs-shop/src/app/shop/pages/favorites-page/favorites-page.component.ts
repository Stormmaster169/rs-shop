import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IShopItem } from 'src/app/models/app-models.model';
import { getUserInfo } from 'src/app/redux/actions/user.actions';
import { userCartSelector, userFavoritesSelector } from 'src/app/redux/selectors/user.selector';
import { IAppState } from 'src/app/redux/store/state';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  private userCart$: Observable<string[]>;

  public userCart: string[];

  public cartItems: IShopItem[];

  public subscriptions: Subscription = new Subscription();

  public isLogin: boolean;

  constructor(
    private store: Store<IAppState>,
    private shopService: ShopService,
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userCart$ = this.store.select(userCartSelector);
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.userCart$.subscribe((res) => {
      this.userCart = res;
    }))

    this.subscriptions.add(this.store.select(userFavoritesSelector).subscribe(items => {
      this.cartItems = []
      let cartItems: IShopItem[] = [];
      items.map(item => this.shopService.getSingleGoodsById(item).subscribe(res => {
        cartItems = [...cartItems, res]
        this.cartItems = cartItems
      }))
    }));

    this.primengConfig.ripple = true;

    this.subscriptions.add(this.authService.isLogin$.subscribe((res) => {
      this.isLogin = res;
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onAddToCart(item: IShopItem) {
    this.subscriptions.add(this.userService.addItemToCart(item).subscribe());
    this.store.dispatch(getUserInfo());
  }

  public onDeleteFromFavorites(id: string): void {
    this.subscriptions.add(this.userService.deleteItemFromFavorites(id).subscribe());
    this.store.dispatch(getUserInfo());
  }

}
