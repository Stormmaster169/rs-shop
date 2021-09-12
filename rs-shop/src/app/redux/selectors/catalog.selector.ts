import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICatalogState } from '../store/catalog.state';

export const catalogFeatureSelector = createFeatureSelector<ICatalogState>('catalog');
export const catalogResultSelector = createSelector(catalogFeatureSelector, (state) => state.data);
