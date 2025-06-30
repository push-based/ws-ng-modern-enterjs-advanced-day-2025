import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { injectParams } from 'ngxtension/inject-params';

import { MovieService } from '../movie.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'movie-search-page',
  template: `
    @if (movieResource.hasValue()) {
      <movie-list [movies]="movieResource.value()!" />
    }

    @if (movieResource.isLoading()) {
      <div class="loader"></div>
    }

    @if (movieResource.error()) {
      <div class="error">
        There are no movies to show.
        {{ movieResource.error() }}
      </div>
    }
  `,
  imports: [MovieListComponent],
})
export class MovieSearchPageComponent {
  private movieService = inject(MovieService);

  searchQuery = injectParams('query');

  movieResource = rxResource({
    // request -> params in version 20
    request: this.searchQuery,
    loader: (params) => {
      const searchQuery = params.request;
      return this.movieService.searchMovies(searchQuery!);
    },
  });
}
