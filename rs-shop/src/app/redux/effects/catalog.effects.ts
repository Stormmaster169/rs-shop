import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ShopService } from 'src/app/services/shop.service';
import { getCategoriesItems, getCategoriesItemsSuccessful } from '../actions/catalog.actions';



@Injectable()
export class CatalogEffects {
  constructor(
    private actions: Actions,
    private shopService: ShopService) { }

  getSearchObjects: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(getCategoriesItems),
      switchMap(() =>
        this.shopService.getCategories().pipe(
          map(data => getCategoriesItemsSuccessful({ data }))
        ))
    )
  )
}
