import { createAction, props } from "@ngrx/store";
import { ICategory } from "src/app/models/app-models.model";

export const getCategoriesItems = createAction(
  '[MAIN PAGE] GET CATEGORIES ITEMS'
);

export const getCategoriesItemsSuccessful = createAction(
  '[MAIN EFFECT] SET FETCHED CATEGORIES ITEMS',
  props<{ data: ICategory[]}>()
);
