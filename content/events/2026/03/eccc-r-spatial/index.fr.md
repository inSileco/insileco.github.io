---
title: "R in Space"
subtitle: "Materiel de l'atelier pour la session d'ECCC"
event_start: 2026-03-25
event_end: 2026-03-26
publishDate: 2026-03-24
layout: "event/single"
featured_image: "img/feature.jpg"
upcoming: true
author: "inSileco"
description: "Un atelier pratique sur les flux de travail spatiaux dans R, adapté à une équipe environnementale d'ECCC."
categories:
  - Atelier
tags:
  - R
  - données spatiales
  - SIG
  - ECCC
  - Flux de travail environnementaux
resources:
  - title: "Voir les diapositives"
    hint: "Ouvrir la presentation."
    url: "https://insileco.io/workshop_r_spatial/"
    image: "img/slides.png"
  - title: "Nous contacter"
    hint: "Contactez-nous pour vos questions de suivi."
    url: "mailto:david.beauchesne@insileco.io,kevin.cazelles@insileco.io"
    avatars:
      - "img/david.png"
      - "img/kevin.png"
---

## À propos de R in Space

**R in Space** est un atelier pratique sur les flux de travail spatiaux dans R. Il est structuré autour de courtes séquences d'enseignement suivies d'exercices appliqués, avec un accent mis sur les opérations que les participants peuvent réutiliser dans de vrais projets : importer des données, vérifier la géometrie et les systèmes de coordonnées, transformer des couches, combiner des objets spatiaux, extraire des valeurs, resumer des résultats et produire des cartes.

Il s'agit d'une introduction opérationnelle, et non d'un cours complet sur la théorie des SIG, la géodesie, la cartographie, la télédetection ou l'ensemble de l'écosystème des méthodes et packages spatiaux. Cette version de l'atelier est organisée sur deux demi-journées.

## Cette session ECCC

Cette page soutient une livraison particulière de **R in Space** pour une équipe environnementale d'ECCC. L'atelier lui-même peut être donné dans d'autres contextes, mais cette session utilise des jeux de données, des exemples et des choix de flux de travail plus proches des types d'analyses et de suivis environnementaux que les participants peuvent rencontrer en pratique.

Cette page sert de point d'accès pour les participants à la session. Elle permet de s'orienter dans l'atelier et d'accéder au matériel partagé.

### Format et public

Cet atelier s'adresse aux utilisateurs de R qui sont à l'aise avec les bases du scripting et qui souhaitent travailler avec des données spatiales avec plus d'aisance. Le groupe peut être de niveau mixte : certains participants découvriront l'analyse spatiale, tandis que d'autres auront déjà une certaine expérience.

Le format alterne de courtes séquences d'enseignement et des exercices pratiques. Les participants ne sont pas censés tout completer. Le materiel est organisé de facon à ce que chacun puisse suivre un parcours cohérent et repartir avec des flux de travail réutilisables.

### Ce que vous ferez

Au fil de l'atelier, les participants travailleront sur les principales étapes d'un flux de travail spatial pratique dans R :

- importer des données spatiales et créer des objets spatiaux
- inspecter la géometrie et les CRS
- produire des cartes rapides et, dans le parcours avancé, reconstruire des lignes à partir de points
- découper, mesurer, joindre, intersecter et tamponner des données vectorielles
- importer, inspecter, rogner, masquer, reprojeter, réechantillonner et comparer des rasters
- extraire des valeurs raster vers des points, des lignes ou des polygones
- construire des résumes simples et des tables prêtes pour l'analyse
- préparer les données pour un modèle linéaire général simple (GLM)
- explorer les données avec l'estimation de densité par noyau (KDE)
- produire une cartographie avancée prête pour la publication

### Prérequis

Les participants devraient être à l'aise avec les bases du scripting dans R et avec les objets tabulaires courants comme les data frames.

Une expérience préalable en SIG n'est pas requise.

Une familiarité avec les packages, les chemins de fichiers et la manipulation de données de base facilitera la participation, mais le contenu spatial lui-même est introduit de manière pratique et guidée.

### Préparation

Un environnement R fonctionnel est requis. Pour être opérationnels pendant l'atelier, les participants devraient avoir installé les packages suivants :

```r
install.packages(c(
  "sf",
  "stars",
  "terra",
  "dplyr",
  "ggplot2",
  "mapview",
  "tmap",
  "units",
  "MASS",
  "viridis"
))
```

### Parcours et outils

Pour cette session, les participants peuvent suivre deux parcours d'exercices construits autour de contextes d'étude choisis pour être plus proches des types de données et de flux de travail rencontrés dans le contexte d'ECCC :

- **Parcours points** : le parcours par defaut, plus simple
  - observations d'oiseaux au Quebec
  - localisations ponctuelles
  - polygones d'écodistricts et de RCO
  - rasters de température
- **Parcours lignes** : le parcours plus avancé
  - localisations télémetriques et trajectoires reconstruites
  - polygones d'habitat
  - rasters de bathymétrie

Les participants peuvent aussi choisir l'écosystème de packages avec lequel ils souhaitent travailler :

- `sf/stars`
- `terra`

Suivre un seul parcours suffit pour compléter l'atelier efficacement. Les participants plus avancés peuvent choisir d'explorer les deux.
