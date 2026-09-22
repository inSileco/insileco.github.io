# TODO: upgrade Bulma 0.9.4 -> 1.0.4

Status as of 2026-09-22 (branch `updateBulma`): **implemented via the Hugo module route**
(steps 1-6 below). Bulma 1.0.4 is pinned in `go.mod`, Dart Sass is installed locally and in CI,
npm is gone. Remaining: step 7 (visual QA on every page) before merging.

## Blocker

Bulma 1.x is written with the Sass module system (`@use`, `@forward`, `sass:math`).
Hugo's built-in LibSass (`toCSS`) cannot compile it. Hugo needs a **Dart Sass**
executable on PATH, both locally and in CI. `hugo env` must list
`github.com/sass/dart-sass/compiler`. Right now it only lists LibSass.

This is independent of how Bulma is fetched (npm or Hugo module).

## Is it worth it? (2026-09-22)

Not for its own sake: Bulma is plain CSS, 0.9.4 does not rot, and insileco.css (~2,500 lines)
is tuned to 0.9 output. Bundle the upgrade with the next visual refresh. Arguments for:
LibSass is end of life (Hugo marks it deprecated), Bulma 1 has a CSS-variable theming
system, new `grid`/`fixed-grid`, skeletons. Arguments against: changed defaults for
`title`/`card`/`hero`/`box`/`panel`, dark mode on by default, Dart Sass toolchain if Sass is kept.

## Cheapest path if we do it: no Sass at all

Bulma 1 is themed with CSS variables, and our customizations are tiny, so:

1. Use the prebuilt `bulma/css/versions/bulma-no-dark-mode.min.css` (vendor it into `static/css/`
   or load it from a CDN). No Dart Sass, no `css.Sass`, no npm needed.
2. Override in `assets/css/insileco.css` (or a new `theme.css`), e.g.
   ```css
   :root {
     /* #37abc8 = hsl(192, 57%, 50%) */
     --bulma-primary-h: 192deg; --bulma-primary-s: 57%; --bulma-primary-l: 50%;
     --bulma-link-h: 192deg;    --bulma-link-s: 57%;    --bulma-link-l: 50%;
     --bulma-family-primary: "Roboto", sans-serif;
     --bulma-navbar-height: 2rem;
   }
   ```
   Navbar hover: `--bulma-navbar-item-hover-background-l-delta: 0%` plus a `.navbar-item:hover { color: ... }` rule.
3. Delete `assets/scss/`, `package.json`, `package-lock.json`, `node_modules`, the `toCSS` block in
   `head.html`, and the Node steps in both workflows. Add `<link>` tags for Roboto.
4. Visual QA on every page.

The Sass/module route below is only needed if we want to change Sass variables that have no
CSS-variable equivalent.

## Decision to make

- **Hugo module route** (preferred, drops npm): Hugo 0.154.5 is past the fix for
  Hugo issue 12849 (directory index files in Bulma not resolving from the virtual FS),
  so a direct import of `github.com/jgthms/bulma` works. See
  https://discourse.gohugo.io/t/hugo-module-import-of-dart-sass-css-framework/51528
  Go 1.26 is installed on this machine.
- **npm route**: keep `bulma` in `package.json` and add `node_modules` to `includePaths`.

## Steps

1. Install Dart Sass locally (needs sudo): `sudo snap install dart-sass`, then check `hugo env`.
   Note: the pure-JS `sass` npm package does NOT work (`sass --embedded is unavailable in pure JS mode`).
   `sass-embedded` would work but its `sass` bin gets shadowed if `sass` is also installed.
2. Module route: `hugo mod init github.com/inSileco/insileco.github.io`, then in `hugo.toml`:
   ```toml
   [module]
     [[module.imports]]
       path = "github.com/jgthms/bulma"
       [[module.imports.mounts]]
         source = "sass"
         target = "assets/mod/bulma"
   ```
   Then delete `package.json`, `package-lock.json`, `node_modules`.
3. Rewrite `assets/scss/main.scss`:
   - `@use "mod/bulma/versions/bulma-no-dark-mode" with (...)` (Bulma 1 enables dark mode via
     `prefers-color-scheme` by default; the site CSS assumes a light theme).
   - `@use` must be the first rule: define `$primary` before it, move the two Google Fonts
     `@import url(...)` lines to `<link>` tags in `layouts/partials/head.html`
     (Merriweather is already imported in `assets/css/fonts.css`; Roboto is not).
   - Variables that still exist: `$primary`, `$link`, `$family-sans-serif`, `$navbar-height`.
   - Variables removed in Bulma 1: `$navbar-item-hover-color`, `$navbar-item-hover-background-color`
     (now CSS variables / `$navbar-item-hover-background-l-delta`), `$family-serif` (unused anyway).
4. `layouts/partials/head.html`: replace `toCSS $cssOpts` with
   `css.Sass (dict "transpiler" "dartsass")` (no `includePaths` needed with the mount).
5. CI (`.github/workflows/build.yaml` and `deploy.yaml`): drop the Node steps, add
   `actions/setup-go`, and the Dart Sass step from the Hugo docs:
   ```yaml
   - name: Install Dart Sass
     env:
       DART_SASS_VERSION: 1.104.0
     run: |
       curl -sfL --output-dir "${{ runner.temp }}" -O "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
       tar -C "${HOME}/.local" -xf "${{ runner.temp }}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
       echo "${HOME}/.local/dart-sass" >> "${GITHUB_PATH}"
   ```
6. Update `README.md` (Bulma via Hugo module, Dart Sass prerequisite).
7. Visual check: Bulma 1 changed spacing, colours, and `title`/`subtitle`/`card`/`hero` styling.
   The layouts use `section`, `title`, `card`, `columns`, `hero`, `panel`, `tag(s)`, `box`, `navbar`.
   Compare pages side by side before merging.

## Current working tree (uncommitted, from today's attempt)

- `package.json` / `package-lock.json`: `bulma` bumped to `^1.0.4`, `sass-embedded` added as devDependency.
- `node_modules/` is half-installed (an `npm install` was interrupted).
- The site does NOT build in this state. To go back to the working 0.9.4 setup:
  ```sh
  git checkout package.json package-lock.json && rm -rf node_modules && npm install
  ```
