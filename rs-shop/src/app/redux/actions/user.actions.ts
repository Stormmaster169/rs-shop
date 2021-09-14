import { createAction, props } from "@ngrx/store";
import { IUserInfo } from "src/app/models/app-models.model";

export const getUserInfo = createAction(
  '[USER INFO] GET USER INFO',
);

export const getUserInfoSuccessful = createAction(
  '[USER INFO EFFECT] SET FETCHED USER INFO',
  props<{ data: IUserInfo}>()
);
