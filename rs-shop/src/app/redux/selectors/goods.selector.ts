import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IGoodsState } from '../store/goods.state';

export const goodsFeatureSelector = createFeatureSelector<IGoodsState>('goods');
export const goodsResultSelector = createSelector(goodsFeatureSelector, (state) => state.data);
