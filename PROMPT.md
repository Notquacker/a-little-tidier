# Build Prompt — "A Little to the Left"-style tidying game (for my girlfriend ♥)

> This is the master prompt / spec. Edit anything here, then we regenerate or tweak the code to match.

## Concept
A small, cozy browser puzzle game inspired by *A Little to the Left*: you drag, rotate and
sort everyday objects until everything feels **just right**. No timer, no failing, no score —
only calm tidying and satisfying little "click" moments. Made as a personal gift, so it is
sprinkled with hearts and a dedication to her.

## Hard constraints
- ONE single `index.html` file — no libraries, no build step, no internet needed.
  It must work by just double-clicking the file.
- Works with mouse **and** touch (pointer events), scales to any window size.
- Original art (inline SVG) and an original name — *inspired by*, not a copy of, the real game's assets.

## Art direction
- Warm paper-coloured background (`#f7f0e2`) with a subtle speckle texture.
- Soft pastel palette: dusty pink, baby blue, sage green, butter yellow, lilac.
- Hand-written feel: `Segoe Print` / `Comic Sans` style font, slightly wobbly, thick friendly outlines.
- The three huskies — **Archy, Ice & Chip** — sit in the corner with little name tags:
  tails wag (out of sync), eyes blink, and clicking one makes it howl (awoo!). (The pack is mandatory.)

## Game feel ("juice")
- **Magnetic snapping**: when an object is close to correct it gently snaps into place with a soft chime.
- Each snapped object locks with a tiny sparkle.
- Level solved → sparkle burst + a bouncy banner ("Just right ♥", "So tidy!", …) + a little arpeggio, then auto-advance.
- **Hint button (?)**: shows dashed ghost outlines / guide lines of the solution for ~2.5 seconds.
- All sound is generated with WebAudio (no audio files).

## Levels (in order)
1. **Straighten Up** — three crooked picture frames on the wall; drag sideways to rotate each one upright.
2. **Hang Together** — three frames at different heights; drag them up/down until they hang on one line.
3. **Pencil Parade** — five pencils; drag to reorder them from shortest to tallest.
4. **Handle With Care** — three wonky mugs (a heart mug, a paw mug and a "G" mug); set them down straight.
5. **Rainbow Shelf** — six books; drag to sort them in rainbow colour order.
6. **Treat Time** — five dog biscuits; sort them from smallest to biggest for the pack.
7. **Drawer Order** — scattered cutlery; drop each piece onto its matching outline in the drawer.
8. **Love Letters** — shuffled letter tiles; arrange them to spell G-A-I-L.
9. **Ending** — full-screen dedication: big heart, falling hearts, her name + a personal message, signed by the pack.

## Personalization (easy to edit, top of the file)
- `CONFIG.herName` — Gail (used on the title screen, the Love Letters level, the ending).
- `CONFIG.dedication` — the personal message on the ending screen.
- `CONFIG.pack` / `CONFIG.packFur` — the babies' names and fur colours (Archy = grey, Ice = snow, Chip = copper).
  They sit bottom-right on every screen and sign the ending message.
- The palette and banner texts are also constants near the top.

## Ideas for later (not in v2)
- One of the huskies occasionally trots in and nudges an item out of place.
- A "pull-down scribble" hint like the real game instead of the (?) button.
- More levels: stamps, peeling a sticker perfectly, folding towels.
- Her favourite things as level objects (tell me: plants? make-up? Switch games?).
