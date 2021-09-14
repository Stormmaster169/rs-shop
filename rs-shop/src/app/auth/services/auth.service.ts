import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerLinks } from 'src/app/app.enums';
import { ITokenResponse, IUserLogin, IUserRegister } from 'src/app/models/app-models.model';
import { getUserInfo } from 'src/app/redux/actions/user.actions';
import { IAppState } from 'src/app/redux/store/state';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor (
    private http: HttpClient,
    private store: Store<IAppState>,
    ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private addUser(user: IUserRegister): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(ServerLinks.USER_REGISTER, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  private loginUser(user: IUserLogin): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(ServerLinks.USER_LOGIN, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  get authToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setAuthToken(response: ITokenResponse): void {
    localStorage.setItem('authToken', response.token);
  }

  public register(user: IUserRegister): void {
    this.addUser(user).subscribe((res) => {
      this.setAuthToken(res);
      this.isLogin$.next(!!this.authToken);
      this.store.dispatch(getUserInfo());
    })
    localStorage.setItem('userLogin', user.login);
  }

  public login(user: IUserLogin): void {
    this.loginUser(user).subscribe((res) => {
      this.setAuthToken(res);
      this.isLogin$.next(!!this.authToken);
      this.store.dispatch(getUserInfo());
    })
    localStorage.setItem('userLogin', user.login);
  }

  public logout(): void {
    this.isLogin$.next(false);
    localStorage.clear();
  }

  public isAuth(): boolean {
    this.isLogin$.next(!!this.authToken);
    return !!this.authToken;
  }
}
