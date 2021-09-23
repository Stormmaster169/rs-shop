import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerLinks } from 'src/app/app.enums';
import { ITokenResponse, IUserLogin, IUserRegister } from 'src/app/models/app-models.model';
import { clearUserInfo, getUserInfo } from 'src/app/redux/actions/user.actions';
import { IAppState } from 'src/app/redux/store/state';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isWrongAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor (
    private http: HttpClient,
    private store: Store<IAppState>,
    ) { }

  private addUser(user: IUserRegister): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(ServerLinks.USER_REGISTER, user)
  }

  private loginUser(user: IUserLogin): Observable<ITokenResponse> {
    const httpOptions = {
      reportProgress: true,
    };

    return this.http.post<ITokenResponse>(ServerLinks.USER_LOGIN, user, httpOptions)
  }

  get authToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setAuthToken(response: ITokenResponse): void {
    localStorage.setItem('authToken', response.token);
  }

  public register(user: IUserRegister): void {
    this.addUser(user).subscribe(res => {
      this.setAuthToken(res);
      this.isLogin$.next(!!this.authToken);
      this.store.dispatch(getUserInfo());
    })
    localStorage.setItem('userLogin', user.login);
  }

  public login(user: IUserLogin): void {
    this.loginUser(user).subscribe(res => {
        this.isWrongAuth$.next(false);
        this.setAuthToken(res);
        this.isLogin$.next(!!this.authToken);
        this.store.dispatch(getUserInfo());
      },
      error => {
        this.isWrongAuth$.next(true)
      }
    )
    localStorage.setItem('userLogin', user.login);
  }

  public logout(): void {
    this.isLogin$.next(false);
    localStorage.clear();
    this.store.dispatch(clearUserInfo());
  }

  public isAuth(): boolean {
    this.isLogin$.next(!!this.authToken);
    return !!this.authToken;
  }
}
