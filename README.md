# insileco.io
[![Build and deploy website](https://github.com/inSileco/insileco.github.io/actions/workflows/deploy.yaml/badge.svg)](https://github.com/inSileco/insileco.github.io/actions/workflows/deploy.yaml)

Our website built with [Hugo](https://gohugo.io/). 


## Requirements

- [Hugo](https://gohugo.io/) extended edition (>= 0.166.0 preferred).
- [Go](https://go.dev/) (>= 1.25): Hugo uses it to fetch modules.
- [Dart Sass](https://sass-lang.com/dart-sass/): the `sass` executable must be on your
  `PATH` (e.g. `sudo snap install dart-sass`, `brew install sass/sass/sass`, or a release
  from https://github.com/sass/dart-sass/releases). Check with `hugo env`, which must list
  `github.com/sass/dart-sass/compiler`.

The CSS framework [Bulma](https://bulma.io/) (1.x) is pulled in as a Hugo module
(see `[module]` in `hugo.toml` and `go.mod`), so there is nothing to install by hand.
Bulma 1 uses the Sass module system, which is why Dart Sass is required (Hugo's built-in
LibSass cannot compile it). Our customizations live in `assets/scss/main.scss`.

## Usage

```sh
hugo serve
```

To upgrade Bulma, pin the module to the commit of the wanted release tag (Bulma tags have no
`v` prefix, so Go cannot resolve them by name):

```sh
hugo mod get github.com/jgthms/bulma@<commit-sha>
hugo mod tidy
```
