import { createAction, props } from "@ngrx/store";
import { IShopItem } from "src/app/models/app-models.model";

export const getGoodsItems = createAction(
  '[CATEGORY PAGE] GET GOODS ITEMS',
  props<{ categoryId : string, subCategoryId : string }>()
);

export const getGoodsItemsSuccessful = createAction(
  '[CATEGORY EFFECT] SET FETCHED GOODS ITEMS',
  props<{ data: IShopItem[]}>()
);
