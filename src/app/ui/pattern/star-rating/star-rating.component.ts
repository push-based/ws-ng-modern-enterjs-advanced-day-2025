import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  model,
} from '@angular/core';

const range = 10;
const numStars = 5;

@Component({
  selector: 'ui-star-rating',
  template: `
    <span class="tooltip">
      {{ tooltipText() }}
    </span>
    <div class="stars">
      <span
        *ngFor="let fill of _stars(); let i = index"
        class="star"
        (mousedown)="updateStars($event, i + 1)"
        [ngClass]="{
          'star-half': fill === 0,
          'star-empty': fill === -1,
        }"
      >
        ★
      </span>
    </div>
    <div class="rating-value" *ngIf="showRating()">{{ rating() }}</div>
  `,
  styleUrls: [
    'star-rating.component.scss',
    '../../component/tooltip/_tooltip.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgFor, NgIf],
})
export class StarRatingComponent {
  range = range;
  numStars = numStars;

  stars = computed(() => {
    const scaledRating = this.rating() / (this.range / this.numStars);
    const full = Math.floor(scaledRating);
    const half = scaledRating % 1 > 0.5 ? 1 : 0;
    const empty = this.numStars - full - half;
    return new Array(full)
      .fill(1)
      .concat(new Array(half).fill(0))
      .concat(new Array(empty).fill(-1));
  });

  _stars = linkedSignal(this.stars);

  rating = model(5);
  showRating = input(false);
  tooltipText = computed(() => {
    return `${this.rating()} average rating`;
  });

  updateStars(event: MouseEvent, stars: number) {
    /*this.rating.set(stars);
    event.preventDefault();
    event.stopPropagation();*/
    this._stars.update((currentStars) => {
      const starAmount = currentStars.length;

      return new Array(stars)
        .fill(1)
        .concat(new Array(starAmount - stars).fill(-1));
    });
  }
}
