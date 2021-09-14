import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { getUserInfo, getUserInfoSuccessful } from '../actions/user.actions';



@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private userService: UserService) { }

  getUserInfo: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(getUserInfo),
      switchMap(() =>
        this.userService.getUserInfo().pipe(
          map(data => getUserInfoSuccessful({ data }))
        ))
    )
  )
}
