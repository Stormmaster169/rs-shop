import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IOrderItem, IShopItem, IUserOrderRequest } from 'src/app/models/app-models.model';
import { getUserInfo } from 'src/app/redux/actions/user.actions';
import { userCartSelector } from 'src/app/redux/selectors/user.selector';
import { IAppState } from 'src/app/redux/store/state';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
  public cartItems: IShopItem[];

  public subscriptions: Subscription = new Subscription();

  public orderForm: FormGroup;

  public isLogin: boolean;

  public totalPrice: number = 0;

  public cartMessage: string = '';

  constructor(
    private store: Store<IAppState>,
    private shopService: ShopService,
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private authService: AuthService
    ) { }

  public ngOnInit(): void {
    this.subscriptions.add(this.store.select(userCartSelector).subscribe(items => {
      this.cartItems = []
      let cartItems: IShopItem[] = [];
      items.map(item => this.shopService.getSingleGoodsById(item).subscribe(res => {
        res.amountToOrder = 1;
        cartItems = [...cartItems, res];
        this.cartItems = cartItems
        this.totalPrice = this.cartItems.reduce((accumulator, currentValue) => accumulator + (currentValue.price! * currentValue.amountToOrder!), 0);
      }))
    }));

    this.primengConfig.ripple = true;

    this.orderForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[+][0-9]*$')]),
      timeToDeliver: new FormControl('', Validators.required),
      comment: new FormControl('')
    });

    this.subscriptions.add(this.authService.isLogin$.subscribe((res) => {
      if (res) {
        this.cartMessage = 'Ваша корзина пуста';
      } else {
        this.cartMessage = 'Для добавления товаров в корзину войдите в аккаунт используя свой логин и пароль';
      }
    }))

  }

  get name() { return this.orderForm.get('name'); }
  get address() { return this.orderForm.get('address'); }
  get phone() { return this.orderForm.get('phone'); }
  get timeToDeliver() { return this.orderForm.get('timeToDeliver'); }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onSubmitOrder(): void {
    const orderItems: IOrderItem[] = this.cartItems.map(item => {
      return {
        id: item.id,
        amount: item.amountToOrder!,
        price: item.price,
        name: item.name,
        availableAmount: item.availableAmount - item.amountToOrder!
      }
    });
    const order: IUserOrderRequest = {
      items: orderItems,
      details: {...this.orderForm.value},
    };
    this.subscriptions.add(this.userService.addItemToOrders(order).subscribe());
    this.cartMessage = 'Ваш заказ создан успешно, ожидайте доставку в указанное время';
    this.store.dispatch(getUserInfo());
  }

  public onDeleteFromCart(id: string): void {
    this.userService.deleteItemFromCart(id).then(() => this.store.dispatch(getUserInfo()));
  }

  public priceInput(cartItems: IShopItem[]) {
    this.totalPrice = cartItems.reduce((accumulator, currentValue) => accumulator + (currentValue.price! * currentValue.amountToOrder!), 0);
  }
}
