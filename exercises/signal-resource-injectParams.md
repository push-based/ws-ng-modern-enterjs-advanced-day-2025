# Signal - resource & injectParams

In this exercise we will use our knowledge about the `resource`/`rxResource` function to refactor the `MovieSearchPageComponent` to use signals.
We will also use the `injectParams` function to simplify the `query` parameter handling.

## Goal

Refactor the `MovieSearchPageComponent` to use `resource` and `injectParams`.

## Migrate

On the previous exercise we introduced the `toSignal` function to convert an observable to a signal.

Let's see how we can simplify it even more, and get some more benefits from the `resource` function.

### Get the `query` parameter as a signal

We can use the `injectParams` function to get the `query` parameter as a signal.

<details>
  <summary>injectParams</summary>

```ts
// src/app/movie/movie-search-page/movie-search-page.component.ts
import { injectParams } from 'ngxtension/inject-params';

@Component()
export class MovieSearchPageComponent {
  private movieService = inject(MovieService);
  private activatedRoute = inject(ActivatedRoute);

  // 👇 get the `query` parameter as a signal
  queryParam = injectParams((p) => p['query'] as string);

  private movies$: Observable<TMDBMovieModel[]> = this.activatedRoute.params.pipe(
    switchMap((params) => this.movieService.searchMovies(params['query'])),
  );
}

```
</details>

Now, we can remove the `activatedRoute` injection because we don't need it anymore.

<details>
  <summary>remove `activatedRoute` injection</summary>

```diff
@Component()
export class MovieSearchPageComponent {
-  private activatedRoute = inject(ActivatedRoute);
 ...
}
```

</details>

### Create a `movies` resource

Now we can create a `movies` resource that will be used to load the movies.

<details>
  <summary>resource</summary>

```ts
// src/app/movie/movie-search-page/movie-search-page.component.ts
import { resource } from 'ngxtension/resource';

@Component()
export class MovieSearchPageComponent {
  private movieService = inject(MovieService);
  ... 
  
  // 👇 create a `movies` resource
  movies = rxResource({
    request: this.queryParam,
    loader: ({ request: query }) => this.movieService.searchMovies(query),
  });
}
```

</details>

Update the template to use the `movies` resource.

<details>
  <summary>solution</summary>

```angular17html
 @if (movies.hasValue()) {
  <movie-list [movies]="movies.value()!" />
}

@if (movies.isLoading()) {
  <div class="loader"></div>
}

@if (movies.error()) {
  <div class="error">
    There are no movies to show.
    {{ movies.error() }}
  </div>
}
```

</details>

## Congrats! 
You have successfully created a reactive component with signals only 🎉!
