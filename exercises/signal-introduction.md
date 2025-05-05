# Signal Introduction

In this exercise we start to introduce signals into our codebase.  
We will replace basic functionality and ensure the signal setup is rendering our app correctly.

## Goal

Refactor `AppShellComponent` and introduce signals to the menu logic.

## SidedrawerOpen as signal

Go to `AppShellComponent` and replace the `sideDrawerOpen` variable with a signal and update all usages.

<details>
  <summary>AppShellComponent</summary>

```ts
// src/app/app-shell/app-shell.component.ts

import { signal } from '@angular/core';

sideDrawerOpen = signal(false);
```

Update the code in the `toggleSideDrawer` method to use the `update` method to toggle the value.
```ts
toggleSideDrawer() {
  this.sideDrawerOpen.update((v) => !v);
}
```

</details>

Also apply changes to the template

<details>
  <summary>AppShellComponent Template</summary>

```html
<!-- src/app/app-shell/app-shell.component.html -->

<!-- signal usage, retrieve the value and use the set method -->
<ui-side-drawer
  [opened]="sideDrawerOpen()"
  (openedChange)="sideDrawerOpen.set($event)"
>
```

</details>

Test if the side drawer opens on click as well as on resize.

## SearchValue as signal

Go to `AppShellComponent` and replace the `_searchValue` variable with a signal.
Also rename the variable `_searchValue` to `searchValue` and the setter to `setSearchValue` and remove the getter.

<details>
  <summary>AppShellComponent</summary>

```ts
// src/app/app-shell/app-shell.component.ts

import { signal } from '@angular/core';

searchValue = signal('');

setSearchValue(value: string) {
    this.searchValue.set(value);
    this.router.navigate(['search', value]);
}

// 👇 Remove getter
get searchValue() {
    //...
}
```

</details>

Also apply changes to the template. Adopt `ui-search-bar` to use signals. Keep in mind that we have a setter function named `setSearchValue`.

<details>
  <summary>AppShellComponent Template</summary>

```html
<!-- src/app/app-shell/app-shell.component.html -->

<!-- signal usage in ui-search-bar-->
<ui-search-bar
  (ngModelChange)="setSearchValue($event)"
  [ngModel]="searchValue()"
></ui-search-bar>
```

</details>


