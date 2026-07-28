# HPI Loader Zoom Animation

The existing HPI signature draw animation is preserved. After the logo finishes loading, it zooms to **1.32x** and smoothly settles back to its original size.

Main component:

```text
src/app/components/Preloader.tsx
```

Zoom value:

```tsx
scale: [1.6, 1, 1, 1.32, 1]
```

To increase or reduce the final zoom, change `1.32`.
