import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { AuthService } from '../auth/services/auth.service';
import { CatalogEffects } from '../redux/effects/catalog.effects';
import { UserEffects } from '../redux/effects/user.effects';
import { catalogReducer } from '../redux/reducers/catalog.reducers';
import { userReducer } from '../redux/reducers/user.reducers';
import { ShopService } from '../services/shop.service';
import { FooterComponent } from './components/footer/footer.component';
import { AccountComponent } from './components/header/account/account.component';
import { GoodsCatalogComponent } from './components/header/goods-catalog/goods-catalog.component';
import { GoodsSearchComponent } from './components/header/goods-search/goods-search.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoComponent } from './components/header/info/info.component';
import { MainCategoriesComponent } from './components/header/main-categories/main-categories.component';
import { VisitorsService } from './services/visitors.service';

@NgModule({
  declarations: [
    InfoComponent,
    GoodsCatalogComponent,
    GoodsSearchComponent,
    AccountComponent,
    MainCategoriesComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    DropdownModule,
    OverlayPanelModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    CommonModule,
    CheckboxModule,
    StoreModule.forFeature(
      'catalog', catalogReducer
    ),
    StoreModule.forFeature(
      'user', userReducer
    ),
    EffectsModule.forFeature(
      [CatalogEffects, UserEffects]
    ),
    RouterModule,
    ReactiveFormsModule,
    PasswordModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    ShopService,
    AuthService,
    VisitorsService
  ]
})
export class CoreModule { }
