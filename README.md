# von wilhelm

Single-page portfolio website with fullscreen scroll-snap backgrounds, project list overlay, noise toggle mode, and an about slide.

## Project structure

- `index.html` - base page shell
- `app.js` - slide rendering, project rendering, toggle behavior
- `styles.css` - layout and visual styles
- `src/content/projects.js` - project list data
- `src/content/general-content.js` - about text content
- `assets/images/` - source images and generated WebP files

## Image optimization workflow (WebP)

This project uses a lightweight Node script to convert JPG/JPEG assets to WebP before deployment.

### Install dependencies

```bash
npm install
```

### Convert images to WebP

```bash
npm run images:optimize
```

### Build command (pre-deploy)

```bash
npm run build
```

`build` is currently an alias to image optimization because this is a static site with no bundler.

## Publish checklist

1. Run `npm run build`
2. Verify `assets/images/*.webp` files are generated
3. Confirm `app.js` image references point to `.webp`
4. Deploy static files
