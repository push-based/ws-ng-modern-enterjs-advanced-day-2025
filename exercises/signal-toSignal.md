# Signal - toSignal

In this exercise we will use our knowledge about the `toSignal` function to refactor the `MovieSearchPageComponent` to use signals.

## Goal

Refactor the `MovieSearchPageComponent` to use signals.

## `movies$` to `movies`

Add a field `movies` to the component and convert the `movies$` observable to a signal.

<details>
  <summary>`movies$` to `movies`</summary>

```ts
// src/app/movie/movie-search-page/movie-search-page.component.ts
import { toSignal } from '@angular/core/rxjs-interop';

@Component()
export class MovieSearchPageComponent {
  private movieService = inject(MovieService);
  private activatedRoute = inject(ActivatedRoute);

  // 👇 add the `movies` field and convert the `movies$` observable to a signal
  movies = toSignal(this.movies$, { initialValue: [] });
  
  private movies$: Observable<TMDBMovieModel[]> = this.activatedRoute.params.pipe(
    switchMap((params) => this.movieService.searchMovies(params['query'])),
  );
}

```

</details>

Update the template to use the `movies` signal.

<details>
  <summary>solution</summary>

```angular17html
@if (movies().length) {
  <movie-list [movies]="movies()" />
} @else {
  <div class="loader"></div>
}
```

</details>
