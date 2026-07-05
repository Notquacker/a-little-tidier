// ============================================================
// main.js — the Electron MAIN PROCESS
//
// Electron apps have two worlds:
//   1. The MAIN process (this file): plain Node.js. It can use the
//      filesystem, create windows, add menus/tray icons, etc.
//      There is exactly one of these per app.
//   2. The RENDERER process: the web page inside each window
//      (our index.html). It's a full Chromium browser tab, so the
//      game code doesn't need to change at all.
// ============================================================

const { app, BrowserWindow } = require('electron');
const path = require('path');

// ============================================================
// LIVE UPDATES ✏️
// Once the game is published on GitHub Pages, paste the link here
// and rebuild the exe ONE last time (npm run dist). From then on,
// every `git push` updates the game for Gail automatically —
// the app loads the online version, and falls back to the copy
// baked into the exe when she has no internet.
// Example: 'https://YOURNAME.github.io/a-little-tidier/'
// ============================================================
const REMOTE_URL = 'https://notquacker.github.io/a-little-tidier/';

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 720,
    minWidth: 640,
    minHeight: 480,
    title: 'A Little Tidier ♥',
    autoHideMenuBar: true,          // hides the File/Edit/View menu bar (Alt shows it)
    backgroundColor: '#f7f0e2',     // paper colour while the page loads (no white flash)
    icon: path.join(__dirname, 'build', 'icon.png'),   // window / taskbar icon
  });

  if (REMOTE_URL) {
    // Try the always-up-to-date online version first;
    // if it can't load (offline), use the built-in copy.
    win.loadURL(REMOTE_URL).catch(() => win.loadFile('index.html'));
  } else {
    // No URL configured yet — just load the local file.
    win.loadFile('index.html');
  }
}

// 'ready' fires when Electron has finished starting up.
app.whenReady().then(() => {
  createWindow();

  // macOS convention: re-create a window when the dock icon is
  // clicked and no windows are open. Harmless on Windows.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit the app when every window is closed (except on macOS,
// where apps traditionally stay alive in the dock).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
