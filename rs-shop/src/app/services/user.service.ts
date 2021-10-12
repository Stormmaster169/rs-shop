import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerLinks } from '../app.enums';
import { IShopItem, IUserInfo, IUserOrder, IUserOrderRequest } from '../models/app-models.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    }
    if (error.statusText === 'OK') {
      return 'pass'
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  public getUserInfo(): Observable<IUserInfo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      })
    };
    return this.http.get<IUserInfo>(ServerLinks.USER_INFO, httpOptions)
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

  async deleteItemFromCart(itemId : string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
      params: new HttpParams().append('id', itemId)
    };
    const response = await this.http.delete(ServerLinks.USER_CART, httpOptions).toPromise();
    return response;
  }

  public addItemToOrders(item: IUserOrderRequest) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(ServerLinks.USER_ORDER, item, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public deleteItemFromOrders(itemId : string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
      params: new HttpParams().append('id', itemId)
    };
    return this.http.delete(ServerLinks.USER_ORDER, httpOptions);
  }

  public changeOrderItem(item: IUserOrder) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(ServerLinks.USER_ORDER, item, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public addItemToFavorites(item: IShopItem) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(ServerLinks.USER_FAVORITES, {id: item.id}, httpOptions);
  }

  public deleteItemFromFavorites(itemId : string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
      params: new HttpParams().append('id', itemId)
    };
    return this.http.delete(ServerLinks.USER_FAVORITES, httpOptions);
  }
}
