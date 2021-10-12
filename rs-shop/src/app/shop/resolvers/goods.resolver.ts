import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IShopItem } from 'src/app/models/app-models.model';
import { ShopService } from 'src/app/services/shop.service';

@Injectable({ providedIn: 'root' })
export class GoodsResolver implements Resolve<IShopItem> {
  constructor(private shopService: ShopService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
    ): Observable<IShopItem> {
    return this.shopService.getSingleGoodsById(route.paramMap.get('id')!);
  }
}
