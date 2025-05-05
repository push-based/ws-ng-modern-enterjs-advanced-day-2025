# Signal - Migrate Inputs, Outputs & View/Content Queries to Signals

In this exercise we will convert everything to signals using automated migration schematics.

## Goal

In order to benefit from the new signals, we can easily migrate some parts of the application to signals using automated migrations.

## Migrate Inputs

Migrate all the decorator-based Inputs to input signals.

```bash
npx ng g @angular/core:signal-input-migration
```

## Migrate Outputs

```bash
npx ng g @angular/core:output-migration
```

## Migrate View Queries & Content Queries

```bash
npx ng g @angular/core:signal-queries-migration
```

## That's it! 🎉
