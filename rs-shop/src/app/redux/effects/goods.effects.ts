// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Action } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
// import { ShopService } from 'src/app/services/shop.service';
// import { getGoodsItems, getGoodsItemsSuccessful } from '../actions/goods.actions';



// @Injectable()
// export class GoodsEffects {
//   constructor(
//     private actions: Actions,
//     private shopService: ShopService) { }

//   getSearchObjects: Observable<Action> = createEffect(() =>
//     this.actions.pipe(
//       ofType(getGoodsItems),
//       switchMap((action) =>
//         this.shopService.getSubCategoryItemsByCategory(action.categoryId, action.subCategoryId).pipe(
//           map(data => getGoodsItemsSuccessful({ data }))
//         ))
//     )
//   )
// }
