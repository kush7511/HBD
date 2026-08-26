# Premium Interactive Birthday Website

A polished static birthday experience with connected pages, 3D hero effects, animated memories, music control, gallery lightbox, gift reveal, and final surprise sequence.

## Files

- `index.html` - home experience with 3D hero, message, memories preview, and gift.
- `memories.html` - animated memory-lane timeline.
- `gallery.html` - masonry gallery with fullscreen viewer, keyboard navigation, and mobile swipe.
- `surprise.html` - final 3-2-1 reveal with confetti, cake, and glowing photo frame.
- `style.css` - main visual system, components, animations, colors, typography.
- `responsive.css` - tablet and mobile breakpoints.
- `script.js` - birthday name, messages, photos, timeline, and page interactions.
- `music-engine.js` - multi-track URL music configuration, player, playlist, crossfade engine, and music state.
- `assets/photos/` - replaceable birthday photo placeholders.
- `assets/images/` - decorative SVG assets.

## Run in VS Code

1. Open this folder in VS Code.
2. Install the free "Live Server" extension if you do not already have it.
3. Right-click `index.html`.
4. Choose "Open with Live Server".

No build step or package installation is required.

## Replace Her Photos

Put the real photographs here, using the same filenames:

```text
assets/photos/birthday-girl-1.jpg
assets/photos/birthday-girl-2.jpg
assets/photos/birthday-girl-3.jpg
assets/photos/birthday-girl-4.jpg
assets/photos/birthday-girl-5.jpg
assets/photos/birthday-girl-6.jpg
```

If you replace those files with real JPG photos, no code changes are needed.

## Change Name

Open `script.js` and edit the configuration at the top:

```javascript
const birthdayConfig = {
  name: "Anugya varshney",
};
```

Use her preferred display name here.

## Change Captions, Messages, and Photos

In `script.js`, edit:

- `birthdayConfig.messages` for the hero subtitle, final message, and typed birthday letter.
- `birthdayConfig.photos` for gallery photo paths, titles, and captions.
- `birthdayConfig.timeline` for memory-lane chapters and photos.

To add more gallery photos, add another object to `birthdayConfig.photos` and place the matching image file in `assets/photos/`.

## 🎵 How To Add Your Music

Open `music-engine.js` and find this configuration near the top:

```javascript
const birthdayMusic = {
  intro: { title: "✨ Magical Intro", url: "PASTE_DIRECT_MP3_URL_HERE" },
  cute: { title: "🧸 Cute Cartoon Birthday", url: "PASTE_DIRECT_MP3_URL_HERE" },
  memories: { title: "📸 Memory Lane", url: "PASTE_DIRECT_MP3_URL_HERE" },
  emotional: { title: "💌 Birthday Message", url: "PASTE_DIRECT_MP3_URL_HERE" },
  gift: { title: "🎁 Magical Gift", url: "PASTE_DIRECT_MP3_URL_HERE" },
  finale: { title: "🎉 Grand Birthday Finale", url: "PASTE_DIRECT_MP3_URL_HERE" },
  ending: { title: "🌙 Peaceful Ending", url: "PASTE_DIRECT_MP3_URL_HERE" }
};
```

Replace each `PASTE_DIRECT_MP3_URL_HERE` value with a direct browser-playable audio URL:

```javascript
url: "https://example.com/my-birthday-song.mp3"
```

A normal webpage URL is not always an audio URL. The URL should return the actual audio file, preferably `.mp3`, and it should be allowed to play directly in a browser.

The custom music player supports play/pause, previous, next, volume, mute, loop, playlist selection, and Experience Mode. Experience Mode automatically switches tracks for the intro, cute hero interaction, memories, emotional message, gift opening, finale, and peaceful ending. Music starts only after the visitor taps the player because browsers block autoplay.

## Customize Colors

Open `style.css` and edit the CSS variables at the top:

```css
:root {
  --primary: #ff5f9e;
  --secondary: #6fd6ff;
  --accent: #ffd166;
}
```

## Deploy

Because this is a static site, you can deploy the folder to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any simple static hosting service. Upload all HTML, CSS, JS, and `assets/` files together.
