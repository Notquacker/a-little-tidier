# Pushing updates to Gail — free, via GitHub Pages

## How it works

```
you edit index.html  →  git push  →  GitHub Pages updates the website
                                          ↓
              Gail opens the app → it loads the website → new levels! ♥
              (no internet? it falls back to the copy inside the exe)
```

GitHub Pages is free static hosting. The Electron app just points at it
(see `REMOTE_URL` at the top of `main.js`).

## One-time setup (~10 minutes)

1. **Make a GitHub account** at https://github.com (free) if you don't have one.
2. **Create a repository**: github.com → "+" → *New repository* →
   name it `a-little-tidier` → **Public** → Create (no README, we have files already).
   > Note: Pages on a free account needs a **public** repo — the code (and the
   > dedication 🙂) will be visible to anyone who finds it.
3. **Connect and push** (PowerShell, in the game folder):
   ```powershell
   git remote add origin https://github.com/YOURNAME/a-little-tidier.git
   git push -u origin main
   ```
   Git will pop up a login window the first time.
4. **Turn on Pages**: repo page → *Settings* → *Pages* →
   Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
   After ~1 minute the game is live at:
   `https://YOURNAME.github.io/a-little-tidier/`  ← test it in your browser!
5. **Point the app at it**: paste that link into `REMOTE_URL` in `main.js`,
   then rebuild and give Gail the new exe **one last time**:
   ```powershell
   npm run dist
   ```

## Every update after that (the fun part)

```powershell
git add .
git commit -m "added the sock-matching level"
git push
```

Wait ~1 minute for Pages to redeploy. Next time Gail opens the game: new levels.
That's it — no rebuild, no re-sending anything.

## Git mini cheat-sheet

| command | meaning |
|---|---|
| `git status` | what changed since the last commit? |
| `git add .` | stage all changes for the next commit |
| `git commit -m "msg"` | save a snapshot with a message |
| `git push` | upload commits to GitHub |
| `git log --oneline` | list your snapshots |

## The "pro" alternative (for later)

Real apps ship whole-app updates with `electron-updater` + GitHub Releases
(also free): the exe checks for a new version, downloads and replaces itself.
You'd want that if you ever change `main.js` itself or go offline-first.
It needs the NSIS installer target instead of portable, so save it for when
the Pages workflow feels too small.
