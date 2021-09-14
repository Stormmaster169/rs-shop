import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerLinks } from '../app.enums';
import { ICategory, IShopItem } from '../models/app-models.model';

@Injectable({ providedIn: 'root' })
export class ShopService {

  constructor(private http: HttpClient) {}

  public searchQuery: string;

  private startPosition: number = 0;

  public countOfItems$: BehaviorSubject<number> = new BehaviorSubject<number>(10);

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(ServerLinks.CATEGORIES);
  }

  public getSearchItems(searchQuery : string): Observable<IShopItem[]> {
    this.searchQuery = searchQuery
    return this.fetchSearchItems().pipe(
      switchMap(() => this.fetchSearchItems() )
    );
  }

  public fetchSearchItems(): Observable<IShopItem[]> {
    const params: HttpParams = new HttpParams()
      .append('text', this.searchQuery);

    return this.http.get<IShopItem[]>(ServerLinks.SEARCH, {params});
  }

  public getSingleGoodsById(id: string): Observable<IShopItem> {
    return this.http.get<IShopItem>(`${ServerLinks.ITEM}${id}`);
  }

  public getSubCategoryItemsByCategory (categoryId: string, subCategoryId: string, countOfItems: number): Observable<IShopItem[]> {
    const params: HttpParams = new HttpParams()
      .append('start', this.startPosition)
      .append('count', countOfItems);

    return this.http.get<IShopItem[]>(`${ServerLinks.CATEGORY}${categoryId}/${subCategoryId}`,{params});
  }

  public getNextSubCategoryItems(count: number) {
    this.countOfItems$.next(count);
  }
}
