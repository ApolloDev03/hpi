# Interactive HPI Loader

## Updated behavior

- Existing HPI logo drawing animation is retained.
- Final zoom increased from `1.32` to `1.48`.
- Logo settles back to its normal `1x` size.
- Loader remains on the final logo screen after animation completion.
- The homepage does not open automatically.
- The homepage reveals only after one of these interactions:
  - mouse click
  - mouse-wheel scroll
  - touch
  - Enter
  - Space
  - Arrow Down
  - Page Down

## Main zoom value

```tsx
scale: [1.6, 1, 1, 1.48, 1]
```

## Main files

- `src/app/components/Preloader.tsx`
- `src/app/page.tsx`
