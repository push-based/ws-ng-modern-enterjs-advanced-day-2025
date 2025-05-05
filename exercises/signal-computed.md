# Signal - computed

In this exercise we will use `computed` to simplify & memoize some logic.

## Goal

Refactor `StarRatingComponent` and introduce `computed` to simplify some logic.

## Convert `_rating` to a signal

Go to `StarRatingComponent` and replace the `_rating` variable with a signal, and update all usages to properly use the signal.

<details>
  <summary>_rating to signal</summary>

```diff
// src/app/ui/pattern/star-rating/star-rating.component.ts

+import { signal } from '@angular/core';

- private _rating = 5;
+ private _rating = signal(5);

@Input()
set rating(rating: number | undefined) {
-  this._rating = rating || 0;
+  this._rating.set(rating || 0);

-  const scaledRating = this._rating / (this.range / this.numStars);
+  const scaledRating = this._rating() / (this.range / this.numStars);
}

get rating(): number {
-  return this._rating;
+  return this._rating();
}
```

</details>

## Convert `stars` to a computed signal

Now that we have `rating` as a signal, we can use the `computed` function to simplify the logic of deriving the `stars` signal.
Move the logic out of Input setter into a computed signal.

<details>
  <summary>stars to computed signal</summary>

```diff
// src/app/ui/pattern/star-rating/star-rating.component.ts

+import { computed } from '@angular/core';

-stars: number[] = starsArray;
+stars = computed(() => {
+  const scaledRating = this._rating() / (this.range / this.numStars);
+  const full = Math.floor(scaledRating);
+  const half = scaledRating % 1 > 0.5 ? 1 : 0;
+  const empty = this.numStars - full - half;
+  return new Array(full)
+    .fill(1)
+    .concat(new Array(half).fill(0))
+    .concat(new Array(empty).fill(-1));
+});
```

Update the template and call the `stars()` signal in the for loop.

```diff
-@for (fill of stars; track fill) {
+@for (fill of stars(); track fill) {
```

Remove the logic from the setter as it's not needed anymore.

It should look like this after the change: 
```ts
// src/app/ui/pattern/star-rating/star-rating.component.ts

@Input()
set rating(rating: number | undefined) {
  this._rating.set(rating || 0);
  this.setToolTopText(this.rating);
}
```

</details>

## Convert `tooltipText` to a computed signal

We can also use the `computed` function to simplify the logic of deriving the `tooltipText` signal.
Move the logic out of Input setter into a computed signal.

<details>
  <summary>tooltipText to computed signal</summary>

```diff
// src/app/ui/pattern/star-rating/star-rating.component.ts

+import { computed } from '@angular/core';

-tooltipText = `0 average rating`;
+tooltipText = computed(() => `${this._rating()} average rating`);
```

Update the template and call the `tooltipText()` signal.
```diff
<span class="tooltip">
-  {{ tooltipText }}
+  {{ tooltipText() }}
</span>
```

Remove `setToolTopText` method, as it's not needed anymore.

Also remove the call from the setter as it's not needed anymore.

It should look like this after the change:

```ts
private _rating = signal(5);
@Input()
set rating(rating: number | undefined) {
  this._rating.set(rating || 0);
}
get rating(): number {
  return this._rating();
}
```

</details>
