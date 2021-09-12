import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { CatalogEffects } from '../redux/effects/catalog.effects';
import { catalogReducer } from '../redux/reducers/catalog.reducers';
import { GoodsComponentComponent } from './components/goods-component/goods-component.component';
import { ColorByCountDirective } from './directives/color-by-count.directive';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { GoodsDetailsComponent } from './pages/goods-details/goods-details.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  declarations: [
    GoodsDetailsComponent,
    GoodsComponentComponent,
    MainPageComponent,
    CategoryPageComponent,
    ColorByCountDirective
  ],
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    DropdownModule,
    RatingModule,
    FormsModule,
    BreadcrumbModule,
    StoreModule.forFeature(
      'catalog', catalogReducer
    ),
    // StoreModule.forFeature(
    //   'goods', goodsReducer
    // ),
    EffectsModule.forFeature(
      [CatalogEffects]
      // GoodsEffects
    ),
    ShopRoutingModule
  ]
})
export class ShopModule { }
