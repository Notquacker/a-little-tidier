<img src="build/icon.png" width="140" align="right" alt="Gail's Game Room icon — pixel art of Gail with Archy, Ice and Chip">

# Gail's Game Room ♥

*Four cozy games made with love for **Gail**, starring our three babies —
**Archy**, **Ice** & **Chip** the huskies.*

| Game | What it is |
|---|---|
| 🖼️ **A Little Tidier** | drag, straighten and sort things until they feel *just right* — 13 levels, 5 invented by Gail. Inspired by [*A Little to the Left*](https://alittletotheleft.com/), built 100% from scratch |
| 🧩 **Sudoku** | freshly generated puzzles (always exactly one solution), three difficulties, hints, and your progress auto-saves |
| 🟩 **Wordle** | guess the five-letter word in six tries — real English *and* Dutch words, checked against a live dictionary |
| 🥗 **Word Salad** | find the hidden words — themed around the pack, love, and home |

Open the game, land on a **home screen**, pick a game from the **game room** menu, and every
game shares the same pastel look, pause menu, and husky supervision from the corner.

---

## 1 · How to get the game

| Way | How | Best for |
|---|---|---|
| 🌐 **Play in the browser** | Open **https://notquacker.github.io/a-little-tidier/** | Phones, tablets, any computer — always the newest version |
| 🖥️ **Windows app** | **[⬇ Download the exe](https://github.com/Notquacker/a-little-tidier/releases/latest)** (under *Assets*) | Playing like a real desktop game |
| 🛠️ **From source** | See [Building it yourself](#building-it-yourself) below | Developers / the curious |

## 2 · How to install

**There is nothing to install.** The Windows app is a *portable* exe:

1. Copy the downloaded `.exe` anywhere (Desktop is fine).
2. Double-click it. The first start takes a few extra seconds — it's unpacking itself.
3. If Windows shows a blue **"Windows protected your PC"** screen, that's only because
   the app isn't code-signed (that costs money). Click **More info → Run anyway**. Once.

The app is self-updating in spirit: when you're online it loads the newest version
of the game from the internet, and when you're offline it plays the copy built into
the exe. New levels appear automatically — you never need a new exe.

## 3 · How to play

Every game has a **pause button** (⏸): resume, restart (the same puzzle/level, not a new
one), jump to **choose a game**, or go all the way **home**. Click **Archy, Ice or Chip** in
the corner any time for an awooo 🐺 — they wag and blink on their own too.

### 🖼️ A Little Tidier

**Goal:** every level shows something slightly untidy. Make it *just right*.
When something is placed correctly it clicks into place with a chime and a sparkle ✨.
Finish all of them and there might be a message waiting at the end… 💌

| Input | What it does |
|---|---|
| **Drag** an object | Move it (sorting, aligning, placing) |
| **Drag sideways** on a crooked object | Rotate it upright |
| **?** button (top right) | Shows a ghost hint of the solution for a few seconds |

There's a **level menu** — finished levels get a pink heart, and progress is saved on your device.

**The levels**

1. **Straighten Up** — three crooked picture frames; make them hang straight
2. **Hang Together** — hang the frames on one invisible line
3. **Pencil Parade** — sort the pencils from shortest to tallest
4. **Handle With Care** — set the wonky mugs down straight (one has a paw on it 🐾)
5. **Rainbow Shelf** — sort the books into rainbow order
6. **Treat Time** — sort the dog biscuits from smallest to biggest, one per hungry baby
7. **Drawer Order** — put every piece of cutlery on its matching outline
8. **Build a Bouquet** — drop the flowers into the vase 💐
9. **Closet Cleanup** — hang, fold and tuck everything away 👗
10. **Puppy Puzzle** — rebuild the picture of the pup 🐶
11. **Potion Time** — pour the colours into the cauldron in recipe order 🧪
12. **Nail Salon** — paint every nail pink 💅
13. **Love Letters** — spell a very important name ♥

*(Levels 8–12 were invented by Gail herself.)*

### 🧩 Sudoku

Tap a cell, then a number on the pad (or your keyboard) to fill it in. Wrong numbers turn red
if they clash with their row, column or box. Pick **easy / medium / hard** any time — re-picking
the mode you're already on won't touch your progress, only switching modes starts a new puzzle.
The **?** button fills in one correct number for you (your selected cell if it needs help,
otherwise a random one) — hinted numbers get a soft gold tint. Your board **auto-saves**, so
closing the app or switching games and coming back resumes exactly where you left off.

### 🟩 Wordle

Type (or tap the on-screen keyboard) a 5-letter word and press **Enter**. Green = right letter,
right spot; yellow = right letter, wrong spot. Real English words are checked live against a
free dictionary; a curated set of Dutch words works too (see [`words.json`](words.json)) — anything
else gets rejected with a little shake, without costing you a guess.

### 🥗 Word Salad

Drag across letters — in any of 8 directions — to select a word from the themed word list
below the grid. Found words get crossed off and highlighted in the grid.

## 4 · How it's made (the nerdy part)

Hand-written HTML, CSS and vanilla JavaScript — no frameworks, no build step, no npm
dependencies at runtime. [`index.html`](index.html) is the home screen / game picker;
[`tidier.html`](tidier.html), [`sudoku.html`](sudoku.html), [`wordle.html`](wordle.html) and
[`salad.html`](salad.html) are the four games, each its own page. [`shared.css`](shared.css) and
[`shared.js`](shared.js) hold the common look, sounds, sparkles and the husky pack so every
page shares them instead of repeating the code.

- 🎨 **All the art is code.** Every frame, pencil, mug, biscuit, spoon and husky is an
  inline **SVG drawn by JavaScript functions** — shapes, gradients and paths, zero image
  files. (The only bitmaps in the whole project are the app icon and its favicon.)
- 🔊 **All the sound is code too.** The chimes, fanfares and the husky howl are
  generated live with the **WebAudio API** — oscillators, no audio files.
- ✏️ **The font** is [Geist Pixel](https://fonts.google.com/specimen/Geist+Pixel) from Google
  Fonts, with system handwriting fonts as offline fallbacks.
- 📖 **Wordle's word list** lives in [`words.json`](words.json) — a plain JSON array, loaded
  with `fetch()` — and guesses outside that list are validated live against the free
  [Dictionary API](https://dictionaryapi.dev/) (English only; it quietly lets a guess through
  if there's no internet to check it).
- 💾 **Progress is saved with `localStorage`:** which Tidier levels are finished, and Sudoku's
  current puzzle/entries/difficulty — both survive closing the app.
- 🖥️ **The desktop app is [Electron](https://www.electronjs.org/):** [`main.js`](main.js)
  opens a window and loads the game room into it. [`electron-builder`](https://www.electron.build/)
  packs it into a single portable exe. (See [`ELECTRON.md`](ELECTRON.md) for a crash course.)
- 🚀 **Updates are free via GitHub Pages:** this repo *is* the website. Every
  `git push` puts new content online, and the app loads it on next launch.
  (See [`UPDATES.md`](UPDATES.md).)
- 📋 The game design doc lives in [`PROMPT.md`](PROMPT.md).

Made in 2026 by **Xayvion**, together with Claude (Anthropic) — for Gail,
supervised at all times by Archy, Ice and Chip.

## Building it yourself

```powershell
git clone https://github.com/Notquacker/a-little-tidier.git
cd a-little-tidier
npm install        # fetches Electron & tooling (one time)
npm start          # play as a desktop app
npm run dist       # build the portable exe into dist/
```

Or skip all of that — `index.html` runs by just opening it in a browser. That's the point. 🙂
