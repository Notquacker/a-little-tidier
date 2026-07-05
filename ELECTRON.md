# Electron crash course (for this game)

## What Electron is

Electron bundles **Chromium** (the browser engine) + **Node.js** into one runtime,
so a web page becomes a real desktop app with its own window, icon and .exe.
VS Code, Discord, WhatsApp Desktop and Figma are all Electron apps.

Our game was already HTML/CSS/JS — so it runs in Electron **unchanged**.

## The two processes (the one big concept)

Every Electron app is split in two worlds:

| | **Main process** | **Renderer process** |
|---|---|---|
| File | `main.js` | `index.html` (+ its JS) |
| What it is | Plain **Node.js** | A **Chromium tab** |
| Can do | Create windows, menus, tray icons, read/write files, talk to the OS | Everything a web page can do (DOM, canvas, audio…) |
| How many | Exactly 1 | 1 per window |

They are separate for security: the web page can't touch your files unless the
main process explicitly allows it. When they need to talk, you use **IPC**
(`ipcMain` / `ipcRenderer` through a `preload.js`) — we don't need that yet,
because the game is self-contained.

## How our app boots

1. `npm start` runs `electron .`
2. Electron reads `package.json` → `"main": "main.js"` → runs it in Node
3. `main.js` waits for `app.whenReady()`, then makes a `BrowserWindow`
4. `win.loadFile('index.html')` loads the game into that window — done

## Commands

```powershell
npm install          # installs whatever package.json lists (after cloning/copying)
npm start            # run the game as a desktop app
npm run dist         # build a shareable Windows .exe (uses electron-builder)
```

The built .exe appears in the `dist/` folder — that single file is the gift:
Gail double-clicks it, no install, no Node.js needed on her PC.

## Things to try (learning exercises)

- In `main.js`, change `width`/`height`, or add `fullscreen: true`.
- Add `win.webContents.openDevTools()` after `loadFile` — same DevTools as Chrome (F12).
- Add a custom icon: put a `icon.ico` (256×256) in the folder, add `icon: 'icon.ico'`
  to the BrowserWindow options **and** to the `"build" → "win"` section.
- Frameless cozy window: `frame: false` (you'll need your own close button then).
- Later, when you want the app to *remember* things (e.g. which levels are done),
  learn `preload.js` + `ipcMain.handle` / `ipcRenderer.invoke` — that's the bridge
  for letting the page ask Node to save a file.

## Gotchas to remember

- `main.js` is Node — `document` and `window` don't exist there.
  The game code is renderer — `require()` and `fs` don't exist *there*.
- After editing `main.js` you must restart `npm start` (Ctrl+C, run again).
  Edits to `index.html` only need a reload (Ctrl+R in the window).
- `node_modules/` is machine-generated: never edit it, never copy it around;
  `npm install` recreates it anywhere from `package.json`.
