import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { injectParams } from 'ngxtension/inject-params';

import { MovieService } from '../movie.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'movie-search-page',
  template: `
    @if (moviesResource.isLoading()) {
      <div class="loader"></div>
    }
    @if (moviesResource.hasValue()) {
      <movie-list [movies]="moviesResource.value()" />
    }

    @if (moviesResource.error()) {
      <div class="error">
        There are no movies to show.
        {{ moviesResource.error() }}
      </div>
    }
  `,
  imports: [MovieListComponent, AsyncPipe, NgIf],
})
export class MovieSearchPageComponent {
  private movieService = inject(MovieService);
  private params = injectParams((p) => p['query'] as string);

  moviesResource = rxResource({
    request: this.params,
    loader: (p) => {
      const query = p.request;
      return this.movieService.searchMovies(query!);
    },
  });
}
