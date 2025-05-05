import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

import { TMDBMovieModel } from '../../shared/model/movie.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'movie-list',
  template: `
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
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 35rem));
      gap: 4rem 2rem;
      place-content: space-between space-evenly;
      align-items: start;
      position: relative;
    }
  `,
  imports: [MovieCardComponent, RouterLink, FastSvgComponent, NgIf, NgForOf],
})
export class MovieListComponent {
  @Input({ required: true }) movies!: TMDBMovieModel[];
  @Input() favoriteMovieIds: Set<string> = new Set<string>([]);
  @Input() favoritesLoading = new Set<string>();

  @Output() favoriteToggled = new EventEmitter<TMDBMovieModel>();

  trackByMovieId(index: number, movie: TMDBMovieModel) {
    return movie.id;
  }
}
