import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerLinks } from '../app.enums';
import { IShopItem, IUserInfo } from '../models/app-models.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  public getUserInfo(): Observable<IUserInfo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      })
    };
    return this.http.get<IUserInfo>(ServerLinks.USER_INFO, httpOptions);
  }

  public addItemToCart(item: IShopItem) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(ServerLinks.USER_CART, {id: item.id}, httpOptions);
  }

  public deleteItemFromCart(itemId : string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
      params: new HttpParams().append('id', itemId)
    };
    return this.http.delete(ServerLinks.USER_CART, httpOptions);
  }
}
