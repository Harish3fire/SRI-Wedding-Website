# Animated Wedding Invitation

## 1. Install Node.js
Install Node.js LTS from https://nodejs.org/

## 2. Open this folder in VS Code

## 3. Install packages

```bash
npm install
```

## 4. Start the website

```bash
npm run dev
```

Vite will show a local URL such as:
http://localhost:5173

## 5. Edit wedding information

Open:

src/main.jsx

Change the WEDDING object near the top:

- bride
- groom
- dateLabel
- weddingDate
- weddingTime
- weddingVenue
- weddingAddress
- receptionDate
- receptionTime
- receptionVenue
- receptionAddress
- mapUrl
- whatsappNumber

## 6. Add your own images

The starter currently uses online sample images.

For a production site, put your images here:

public/images/

Then change the IMAGES object in src/main.jsx to paths such as:

/images/hero.jpg
/images/blessing.jpg
/images/family.jpg

## 7. Add music

Put:

public/audio/wedding.mp3

The current button is only the UI switch. The next step is to connect it to an HTML audio element.

## 8. Add the real wedding video

Create:

public/video/

Put:

wedding.mp4

Then replace the video placeholder in src/main.jsx with:

<video controls playsInline poster="/images/video-cover.jpg">
  <source src="/video/wedding.mp4" type="video/mp4" />
</video>

## 9. Build for deployment

```bash
npm run build
```

The production files will be generated in:

dist/

## Project sections

1. Opening invitation
2. Welcome / blessing
3. Families
4. Wedding details
5. Reception
6. Gallery
7. Wedding video
8. RSVP
9. Thank-you / closing
