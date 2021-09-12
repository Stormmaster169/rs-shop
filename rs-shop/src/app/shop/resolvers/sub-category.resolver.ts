import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IShopItem } from 'src/app/models/app-models.model';
import { ShopService } from 'src/app/services/shop.service';

@Injectable({ providedIn: 'root' })
export class SubCategoryResolver implements Resolve<IShopItem[]> {

  constructor(private shopService: ShopService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
  ): Observable<IShopItem[]> {
    this.shopService.getNextSubCategoryItems(10);
    return this.shopService.getSubCategoryItemsByCategory(route.paramMap.get('catId')!, route.paramMap.get('subId')!, 10);
  }
}
