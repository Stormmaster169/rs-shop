import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { RatingModule } from 'primeng/rating';
import { TabViewModule } from 'primeng/tabview';
import { TreeTableModule } from 'primeng/treetable';
import { CatalogEffects } from '../redux/effects/catalog.effects';
import { UserEffects } from '../redux/effects/user.effects';
import { catalogReducer } from '../redux/reducers/catalog.reducers';
import { userReducer } from '../redux/reducers/user.reducers';
import { ShopService } from '../services/shop.service';
import { UserService } from '../services/user.service';
import { AdvantagesCardComponent } from './components/advantages-card/advantages-card.component';
import { ColorByCountDirective } from './directives/color-by-count.directive';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { GoodsDetailsComponent } from './pages/goods-details/goods-details.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  declarations: [
    GoodsDetailsComponent,
    AdvantagesCardComponent,
    MainPageComponent,
    CategoryPageComponent,
    ColorByCountDirective,
    CartPageComponent,
    OrdersPageComponent,
    FavoritesPageComponent
  ],
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    DropdownModule,
    RatingModule,
    FormsModule,
    BreadcrumbModule,
    TabViewModule,
    GalleriaModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    TreeTableModule,
    CarouselModule,
    BadgeModule,
    StoreModule.forFeature(
      'catalog', catalogReducer
    ),
    StoreModule.forFeature(
      'user', userReducer
    ),
    EffectsModule.forFeature(
      [CatalogEffects, UserEffects]
    ),
    ShopRoutingModule,
    ReactiveFormsModule,
    PasswordModule
  ],
  providers: [
    UserService,
    ShopService
  ]
})
export class ShopModule { }
