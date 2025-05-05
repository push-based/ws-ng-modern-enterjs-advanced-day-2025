# New Control Flow

In this exercise we start to introduce the new control flow blocks into our codebase.

We will replace directive based control flow (`*ngIf`, `*ngFor`) with the new @-syntax control flow (`@if`, `@for`) and ensure our app renders correctly after the refactoring.

## Goal

Refactor `MovieSearchPage` and `MovieListComponent` and introduce the new control flow.

## Using `@if`

Go to `movie-search-page.component.ts` and replace the `*ngIf` on the `movie-list` component with the new `@if` and `@else` syntax.

> NOTE: Please don't forget about the `as` in the new `@if` block, it needs to be in a separate expression, so we can use the `;` before it.

<details>
  <summary>MovieSearchPageComponent</summary>

```html

<!-- BEFORE -->
<movie-list *ngIf="movies$ | async as movies; else loader" [movies]="movies" />
<ng-template #loader>
  <div class="loader"></div>
</ng-template>

<!-- AFTER -->
@if (movies$ | async; as movies) {
  <movie-list [movies]="movies" />
} @else {
  <div class="loader"></div>
}
```
</details>

## Using `@for`

Go to `movie-list.component.ts` and replace `*ngFor` with the new `@for` block.

The new `@for` block allows you to use `@empty` to handle empty list. Go ahead and also refactor
the wrapping ng-container to `@empty`

> NOTE: The new `@for` block doesn't need the `let` keyword, like the `*ngFor` directive does.

<details>
  <summary>MovieListComponent</summary>

```html

<!-- BEFORE -->
<ng-container *ngIf="movies.length > 0; else empty">
  <movie-card
    *ngFor="let movie of movies; trackBy: trackByMovieId; let i = index"
    [index]="i"
    [routerLink]="['/movie', movie.id]"
    [loading]="favoritesLoading.has(movie.id)"
    [favorite]="favoriteMovieIds.has(movie.id)"
    (favoriteChange)="favoriteToggled.emit(movie)"
    [movie]="movie"
  />
</ng-container>

<ng-template #empty>
  <div class="no-movies">
    <fast-svg name="sad" size="50" />
    There are no movies to show
  </div>
</ng-template>

<!-- AFTER -->
@for (movie of movies; track movie.id) {
  <movie-card
    [index]="$index"
    [routerLink]="['/movie', movie.id]"
    [loading]="favoritesLoading.has(movie.id)"
    [favorite]="favoriteMovieIds.has(movie.id)"
    (favoriteChange)="favoriteToggled.emit(movie)"
    [movie]="movie"
  />
} @empty {
  <div class="no-movies">
    <fast-svg name="sad" size="50" />
    There are no movies to show
  </div>
}
```
</details>

## Migration schematics

While we can refactor everything manually by hand, Angular also has provided some schematics, that can do all this work automatically for us.

In order to run the schematics, open the terminal, go to the project folder and run this command:

```bash
ng generate @angular/core:control-flow
```

> NOTE: The schematics are still in developer preview, meaning that they may introduce bugs in your codebase, so please make sure the migration has refactored everything correctly.

