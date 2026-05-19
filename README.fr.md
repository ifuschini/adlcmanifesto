# Manifeste ADLC

[![Check](https://github.com/ifuschini/adlcmanifesto/actions/workflows/check.yml/badge.svg)](https://github.com/ifuschini/adlcmanifesto/actions/workflows/check.yml)
[![Licence: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/ifuschini/adlcmanifesto?label=version)](https://github.com/ifuschini/adlcmanifesto/tags)
[![Site](https://img.shields.io/website?url=https%3A%2F%2Fadlcmanifesto.org&label=website)](https://adlcmanifesto.org/fr/)

Le Manifeste de l'Agentic Delivery Lifecycle.

[English](README.md) | [Italian](README.it.md) | [Spanish](README.es.md) | [French](README.fr.md)

## Vue D'ensemble

ADLC étend le SDLC pour les systèmes agentiques en ajoutant des portes de
qualité des exigences, des checkpoints human-in-the-loop, l'orchestration, des
agents partagés, des skills partagées, la traçabilité et l'amélioration
opérationnelle continue.

## Site

Site public: https://adlcmanifesto.org/fr/

La source du site se trouve dans `site/`. Consulte `site/README.md` pour les
notes d'édition et de publication.

## Open Source

Ce dépôt est open source sous Apache License, Version 2.0.

Apache-2.0 a été choisie car ADLC est conçu pour être réutilisé dans des
contextes de delivery enterprise et bénéficie d'une concession explicite de
brevets, de termes clairs pour les contributions et de règles de
redistribution.

Consulte `LICENSE` pour le texte complet de la licence et `NOTICE` pour les
notes d'attribution et de marque.

## Contribuer

Les contributions sont bienvenues. Lis `CONTRIBUTING.md` et
`CODE_OF_CONDUCT.md` avant d'ouvrir des issues ou pull requests.

Pour les signalements sensibles de sécurité, suis `SECURITY.md` au lieu
d'ouvrir une issue publique.

## Structure Du Dépôt

- `manifesto.md`: le manifeste principal.
- `lifecycle.md`: les étapes du lifecycle ADLC.
- `shared-skills.md`: skills réutilisables pour agents et équipes.
- `CHANGELOG.md`: historique des versions.
- `docs/release-process.md`: checklist de release et de tags.
- `CONTRIBUTING.md`: workflow de contribution et contrôles locaux.
- `CODE_OF_CONDUCT.md`: attentes de participation.
- `SECURITY.md`: politique de responsible disclosure.
- `site/`: site statique multilingue publié sur `adlcmanifesto.org`.
- `scripts/publish.sh`: script FTPS pour publier le site statique.

## Contrôles Locaux

Exécute la suite légère de validation avec:

```sh
make check
```

Autres targets de maintenance:

```sh
make link-check
make serve
make release-check
```

`make serve` lance une preview statique locale sur `http://localhost:8000/`.
Utilise `make serve PORT=8001` si ce port est déjà occupé.

`make release-check` est prévu pour les commits de release après la création du
tag de version.

## Publication

Crée un fichier local `.env` hors versionnement avec les paramètres FTPS, puis
exécute:

```sh
make publish
```

La commande envoie le contenu de `site/` vers le répertoire distant
`/public_html/`.

## Version

Version actuelle: `V1.1`

- Publiée: avril 2026
- Dernière modification: mai 2026

## Tags De Release

Chaque version publique du manifeste doit être marquée par un tag Git annoté.

Utilise le format minuscule `vX.Y` pour les tags du dépôt, aligné avec la
version déclarée comme `VX.Y` dans `manifesto.md` et `CHANGELOG.md`.

Par exemple, `V1.1` dans le manifeste est taggée `v1.1` dans Git.

Consulte `docs/release-process.md` pour la checklist de release.
