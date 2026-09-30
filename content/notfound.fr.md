---
# CR-02 — GitHub Pages sert un seul /404.html à la racine du site : cette page
# le produit (même contenu que layouts/404.html, en français ; les adresses en
# /en/ sont renvoyées vers /en/404.html). Hors listes, hors sitemap, noindex.
title: "Page introuvable"
url: "/404.html"
layout: "notfound"
noindex: true
sitemap:
  disable: true
build:
  list: never
---
