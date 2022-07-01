import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('./countries/countries.module').then((m) => m.CountriesPageModule),
    canActivate: [AuthenticationGuard],
  },
  //TODO: improve using children route
  {
    path: 'countries/:code/details',
    loadChildren: () =>
      import('./holidays-details/holidays-details.module').then(
        (m) => m.HolidaysDetailsPageModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movies/movies.module').then((m) => m.MoviesPageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
