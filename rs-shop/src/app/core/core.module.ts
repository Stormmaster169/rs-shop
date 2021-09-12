import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { CatalogEffects } from '../redux/effects/catalog.effects';
import { catalogReducer } from '../redux/reducers/catalog.reducers';
import { ShopService } from '../services/shop.service';
import { AccountComponent } from './components/header/account/account.component';
import { GoodsCatalogComponent } from './components/header/goods-catalog/goods-catalog.component';
import { GoodsSearchComponent } from './components/header/goods-search/goods-search.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoComponent } from './components/header/info/info.component';
import { MainCategoriesComponent } from './components/header/main-categories/main-categories.component';

@NgModule({
  declarations: [
    InfoComponent,
    GoodsCatalogComponent,
    GoodsSearchComponent,
    AccountComponent,
    MainCategoriesComponent,
    HeaderComponent
  ],
  imports: [
    FormsModule,
    DropdownModule,
    OverlayPanelModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    CommonModule,
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
    RouterModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    ShopService
  ]
})
export class CoreModule { }
