import { Action, createReducer, on } from '@ngrx/store';
import * as GoodsActions from '../actions/goods.actions';
import { IGoodsState, initialGoodsState } from '../store/goods.state';


const reducer = createReducer(initialGoodsState,
  on(GoodsActions.getGoodsItems, state => ({ ...state, loading: true, loaded: false })),
  on(GoodsActions.getGoodsItemsSuccessful, (state, { data }) => ({ ...state, data, loading: false, loaded: true }))
);

export function goodsReducer(state: IGoodsState, action: Action){
  return reducer(state, action);
};
