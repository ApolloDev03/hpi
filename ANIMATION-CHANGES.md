# HPI Animation Update

## Loader

- The original HPI signature draw duration, fill timing, zoom and ink colours remain unchanged.
- The traced logo artwork is separated into three animation bands:
  1. HPI signature
  2. Studio
  3. Infused your dreams / lower interior line
- **Studio now enters from outside the right side of the screen** and eases into its final logo position while retaining the gold draw detail.
- **The lower interior/tagline line now rises from the bottom** and settles into place while retaining its fine gold draw detail.
- The loader closes after the complete sequence, so no part of the lower text is cut off.

## Image / media motion

`src/app/components/ImageReveal.tsx` is a reusable wrapper for images, videos and visual blocks. It includes:

- directional curtain reveal
- restrained scroll parallax
- initial cinematic scale-settle
- subtle hover zoom
- moving light sweep
- fine gold edge trace
- reduced-motion accessibility support

It is applied to About, Projects, Video Gallery and Blog media blocks. The Hero background also receives a slow cinematic scale and architectural panel movement.

## Using it with a real Next.js image

```tsx
<ImageReveal className="relative aspect-[4/5]">
  <Image
    src="/images/project.jpg"
    alt="Project"
    fill
    className="object-cover"
  />
</ImageReveal>
```
