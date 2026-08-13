# Replaceable image assets

## Homepage hero

- Current file: `pathly-hero.jpeg`
- Used in: `src/app/page.tsx`
- Search for: `src="/images/pathly-hero.jpeg"`

To replace it, either overwrite `pathly-hero.jpeg` with the new image, or
add a new image to this folder and update the `src` value in `src/app/page.tsx`.

Recommended final dimensions: at least 1920 × 1080 pixels, landscape, with a
quiet/light area on the left for the hero text. Avoid placing text or logos in
the image itself.

## Discovery card images

Scholarship images are stored in `public/images/scholarships/` and study-abroad
images are stored in `public/images/study-abroad/`. Their paths are assigned to
individual cards in `src/data/discovery.ts` through each item's `image` field.

You can replace an image by keeping its filename, or add a new file and change
the corresponding `image` value in `src/data/discovery.ts`.

The six included card images are temporary AI-generated visuals. They contain
no embedded text, branding, or real university identity.
