import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { GoodsDetailsComponent } from './pages/goods-details/goods-details.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { GoodsResolver } from './resolvers/goods.resolver';
import { SubCategoryResolver } from './resolvers/sub-category.resolver';

const routes: Routes = [
  {
    path: '', component: MainPageComponent
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
