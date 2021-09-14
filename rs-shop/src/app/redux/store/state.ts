import { ICatalogState } from "./catalog.state";
import { IUserState } from "./user.state";


export interface IAppState {
  catalog: ICatalogState,
  user: IUserState
}
