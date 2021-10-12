import { Action, createReducer, on } from '@ngrx/store';
import * as CatalogActions from '../actions/catalog.actions';
import { ICatalogState, initialCatalogState } from '../store/catalog.state';


const reducer = createReducer(initialCatalogState,
  on(CatalogActions.getCategoriesItems, state => ({ ...state, loading: true, loaded: false })),
  on(CatalogActions.getCategoriesItemsSuccessful, (state, { data }) => ({ ...state, data, loading: false, loaded: true }))
);

export function catalogReducer(state: ICatalogState, action: Action){
  return reducer(state, action);
};
