import { ICatalogState } from "./catalog.state";
import { IGoodsState } from "./goods.state";


export interface IAppState {
  catalog: ICatalogState,
  goods: IGoodsState
}
