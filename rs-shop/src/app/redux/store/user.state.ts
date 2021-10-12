import { IUserInfo } from "src/app/models/app-models.model";

export interface IUserState {
  data: IUserInfo;
  loading: boolean;
  loaded: boolean;
}

export const initialUserState: IUserState = {
  data: {
    firstName: '',
    lastName: '',
    cart: [],
    favorites: [],
    orders: []
  },
  loading: false,
  loaded: false
};
