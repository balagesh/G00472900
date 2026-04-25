import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'movie-details',
    loadComponent: () => import('./pages/movie-details/movie-details.page').then( m => m.MovieDetailsPage)
  },
  {
    path: 'favourites',
    loadComponent: () => import('./pages/favourites/favourites.page').then( m => m.FavouritesPage)
  },
  {
    path: 'person-details',
    loadComponent: () => import('./pages/person-details/person-details.page').then( m => m.PersonDetailsPage)
  },
];
