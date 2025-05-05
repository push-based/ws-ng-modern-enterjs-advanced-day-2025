import { Routes } from '@angular/router';

import { AuthGuard } from '../core/auth.guard';

export const movieRoutes: Routes = [
  {
    path: 'list/:category',
    loadComponent: () =>
      import('./movie-list-page/movie-list-page.component').then(
        (m) => m.MovieListPageComponent,
      ),
  },
  {
    path: 'list/genre/:id',
    loadComponent: () =>
      import('./movie-list-page/movie-list-page.component').then(
        (m) => m.MovieListPageComponent,
      ),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./movie-detail-page/movie-detail-page.component').then(
        (m) => m.MovieDetailPageComponent,
      ),
  },
  {
    path: 'search/:query',
    loadComponent: () =>
      import('./movie-search-page/movie-search-page.component').then(
        (m) => m.MovieSearchPageComponent,
      ),
  },
  {
    path: 'my-movies',
    loadComponent: () =>
      import('./my-movie-list/my-movie-list.component').then(
        (m) => m.MyMovieListComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'list/popular',
    pathMatch: 'full',
  },
];
