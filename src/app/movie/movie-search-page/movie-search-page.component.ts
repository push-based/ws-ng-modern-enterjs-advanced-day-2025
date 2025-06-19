import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { TMDBMovieModel } from '../../shared/model/movie.model';
import { MovieService } from '../movie.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'movie-search-page',
  template: `
    @if (movies().length) {
      <movie-list [movies]="movies()" />
    } @else {
      <div class="loader"></div>
    }
  `,
  imports: [MovieListComponent, AsyncPipe, NgIf],
})
export class MovieSearchPageComponent {
  private movieService = inject(MovieService);
  private activatedRoute = inject(ActivatedRoute);

  movies$: Observable<TMDBMovieModel[]> = this.activatedRoute.params.pipe(
    switchMap((params) => this.movieService.searchMovies(params['query'])),
  );

  movies = toSignal(this.movies$, { initialValue: [] });
}
