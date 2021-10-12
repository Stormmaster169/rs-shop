import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUserLogin, IUserRegister } from 'src/app/models/app-models.model';
import { getUserInfo } from 'src/app/redux/actions/user.actions';
import { IAppState } from 'src/app/redux/store/state';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('op') public op: OverlayPanel;

  public profileForm: FormGroup;

  public loginForm: FormGroup;

  public showOverlayModal: boolean = false;

  public showLoginModal: boolean = false;

  public showRegisterModal: boolean = false;

  public isLogin: boolean;

  public isWrongAuth: boolean;

  public userLogin: string | null;

  constructor(
    private authService: AuthService,
    private store: Store<IAppState>
    ) { }

  public ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.authService.isAuth();

    this.userLogin = localStorage.getItem('userLogin');

    this.authService.isLogin$.subscribe((res) => {
      this.isLogin = res;
      if (this.isLogin) {
        this.store.dispatch(getUserInfo());
        this.showOverlayModal = false;
        this.showRegisterModal = false;
        this.showLoginModal = false;
      }
    })

    this.authService.isWrongAuth$.subscribe((res) => {
      this.isWrongAuth = res;
    })
  }

  public onLogin () {
    this.op.hide()
    this.showOverlayModal = true;
    this.showLoginModal = true;
    document.body.classList.add('scroll-block');
  }

  public onLogout () {
    this.authService.logout();
    this.op.hide()
  }

  public onRegister () {
    this.showRegisterModal = true;
    this.showLoginModal = false;
    document.body.classList.add('scroll-block');
  }

  public onOverlay (event: Event) {
    if ((event.target as HTMLDivElement).classList.contains('overlay-modal')
    || (event.target as HTMLDivElement).classList.contains('close')
    || (event.target as HTMLDivElement).classList.contains('pi-times')) {
      this.profileForm.reset();
      this.showOverlayModal = false;
      this.showRegisterModal = false;
      this.showLoginModal = false;
      document.body.classList.remove('scroll-block');
    }
  }

  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get login() { return this.profileForm.get('login'); }
  get password() { return this.profileForm.get('password'); }

  get loginAuth() { return this.loginForm.get('login'); }
  get passwordAuth() { return this.loginForm.get('password'); }

  public onSubmitProfile() {
    const user: IUserRegister = {...this.profileForm.value};
    this.authService.register(user)
    this.profileForm.reset();
    this.showOverlayModal = false;
    this.showRegisterModal = false;
    this.showLoginModal = false;
    document.body.classList.remove('scroll-block');
    this.userLogin = localStorage.getItem('userLogin');
  }

  public onSubmitLogin() {
    const user: IUserLogin = {...this.loginForm.value};
    this.authService.login(user)
    this.loginForm.reset();
    document.body.classList.remove('scroll-block');
    this.userLogin = localStorage.getItem('userLogin');
  }
}
