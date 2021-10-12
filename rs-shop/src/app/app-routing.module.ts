import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
  //   canLoad: [AuthGuard]
  // },
  // { path: 'not-found', component: ErrorPageComponent, data: { message: 'Sorry, smth went wrong((' } },
  // { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
