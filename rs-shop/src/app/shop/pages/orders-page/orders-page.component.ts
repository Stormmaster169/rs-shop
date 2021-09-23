import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IOrderItem, IUserOrder } from 'src/app/models/app-models.model';
import { getUserInfo } from 'src/app/redux/actions/user.actions';
import { userOrdersSelector } from 'src/app/redux/selectors/user.selector';
import { IAppState } from 'src/app/redux/store/state';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  public orders: TreeNode<IOrderItem>[];

  public subscriptions: Subscription = new Subscription();

  public isLogin: boolean;

  constructor(
    private store: Store<IAppState>,
    private userService: UserService,
    private authService: AuthService
    ) { }

  public ngOnInit(): void {
    this.subscriptions.add(this.store.select(userOrdersSelector).subscribe(items => {
      this.orders = [];
      items.map(item => {
        const order: TreeNode<IOrderItem> = {};
        order.data = {
          id: item.id,
          address: item.details.address,
          name: item.details.name,
          phone: item.details.phone,
          comment: item.details.comment,
          amount: item.items.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0),
          price: item.items.reduce((accumulator, currentValue) => accumulator + (currentValue.price! * currentValue.amount), 0),
          timeToDeliver: item.details.timeToDeliver,
          controlPanel: true,
        };
        order.children = item.items.map(item => {
          const orderItem: TreeNode<IOrderItem> = {};
          orderItem.data = {
            id: item.id!,
            name: item.name,
            amount: item.amount,
            price: item.price!,
            controlPanel: false,
            availableAmount: item.availableAmount
          };
          return orderItem
        });
        this.orders = [...this.orders, order];
      })
    }));

    this.subscriptions.add(this.authService.isLogin$.subscribe((res) => {
      this.isLogin = res;
    }))
  }

  public onDeleteFromOrders(id: string): void {
    this.subscriptions.add(this.userService.deleteItemFromOrders(id).subscribe());
    this.store.dispatch(getUserInfo());
  }

  public onChangeOrder(order: {node: TreeNode<IOrderItem>, parent: null, level: number, visible: boolean}): void {
    const orderToSend: IUserOrder = {
      items : order.node.children!.map(item => {
        return {
          id: item.data?.id!,
          amount: item.data?.amount!
        }
      }),
      details: {
        name: order.node.data?.name!,
        address: order.node.data?.address!,
        phone: order.node.data?.phone!,
        timeToDeliver: order.node.data?.timeToDeliver!,
        comment: order.node.data?.comment!
      },
      id: order.node.data?.id!
    };
    this.subscriptions.add(this.userService.changeOrderItem(orderToSend).subscribe());
    this.store.dispatch(getUserInfo());
  }
}
