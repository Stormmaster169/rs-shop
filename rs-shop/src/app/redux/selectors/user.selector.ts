import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../store/user.state';

export const userFeatureSelector = createFeatureSelector<IUserState>('user');
export const userResultSelector = createSelector(userFeatureSelector, (state) => state.data);
export const userCartSelector = createSelector(userFeatureSelector, (state) => state.data.cart);
export const userOrdersSelector = createSelector(userFeatureSelector, (state) => state.data.orders);
export const userFavoritesSelector = createSelector(userFeatureSelector, (state) => state.data.favorites);
