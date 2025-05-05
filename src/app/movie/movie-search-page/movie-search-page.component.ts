import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { TMDBMovieModel } from '../../shared/model/movie.model';
import { MovieService } from '../movie.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'movie-search-page',
  template: `
    @if (movies$ | async; as movies) {
      <movie-list [movies]="movies" />
    } @else {
      <div class="loader"></div>
    }
  `,
  imports: [MovieListComponent, AsyncPipe],
})
export class MovieSearchPageComponent {
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
  ) {}

  movies$: Observable<TMDBMovieModel[]> = this.activatedRoute.params.pipe(
    switchMap((params) => this.movieService.searchMovies(params['query'])),
  );
}
