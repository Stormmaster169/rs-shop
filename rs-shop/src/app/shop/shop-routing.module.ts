import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { GoodsDetailsComponent } from './pages/goods-details/goods-details.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { GoodsResolver } from './resolvers/goods.resolver';
import { SubCategoryResolver } from './resolvers/sub-category.resolver';

const routes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'orders',
    component: OrdersPageComponent,
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
  },
  {
    path: 'item/:id',
    component: GoodsDetailsComponent,
    resolve: { item: GoodsResolver }
  },
  {
    path: 'subCategory/:catId/:subId',
    component: CategoryPageComponent,
    resolve: { subCatItem: SubCategoryResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
