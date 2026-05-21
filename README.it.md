# Manifesto ADLC

[![Check](https://github.com/ifuschini/adlcmanifesto/actions/workflows/check.yml/badge.svg)](https://github.com/ifuschini/adlcmanifesto/actions/workflows/check.yml)
[![Licenza: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Versione](https://img.shields.io/github/v/tag/ifuschini/adlcmanifesto?label=version)](https://github.com/ifuschini/adlcmanifesto/tags)
[![Sito](https://img.shields.io/website?url=https%3A%2F%2Fadlcmanifesto.org&label=website)](https://adlcmanifesto.org/it/)

Il Manifesto dell'Agentic Delivery Lifecycle.

[English](README.md) | [Italian](README.it.md) | [Spanish](README.es.md) | [French](README.fr.md)

## Panoramica

ADLC, l'Agentic Delivery Lifecycle, è un framework di governance e delivery per
costruire sistemi agentici in ambienti enterprise con la stessa disciplina
attesa dalla moderna software delivery.

Non sostituisce l'SDLC. Lo estende con le pratiche di cui i sistemi agentici
enterprise hanno bisogno per essere affidabili, auditabili e manutenibili:
requisiti validati prima dell'implementazione, checkpoint human-in-the-loop
espliciti, agenti e skill riutilizzabili, governance della conoscenza e del
RAG, orchestrazione tra tool e team, tracciabilità, governance delle release e
miglioramento operativo continuo.

Il manifesto è pensato per organizzazioni che devono passare da esperimenti
isolati con agenti a capability agentiche governate, riutilizzabili e scalabili.

## Sito

Sito pubblico: https://adlcmanifesto.org/it/

Il sorgente del sito vive in `site/`. Vedi [site/README.md](site/README.md) per
note di modifica e pubblicazione.

## Open Source

Questo repository è open source sotto Apache License, Version 2.0.

Apache-2.0 è stata scelta perché ADLC è pensato per essere riutilizzato in
contesti di delivery enterprise e beneficia di una concessione esplicita sui
brevetti, termini chiari per i contributi e regole di redistribuzione.

Vedi `LICENSE` per il testo completo della licenza e `NOTICE` per note di
attribuzione e marchio.

## Contribuire

I contributi sono benvenuti. Prima di aprire issue o pull request, leggi
[CONTRIBUTING.md](CONTRIBUTING.md) e
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

Per segnalazioni sensibili alla sicurezza, segui [SECURITY.md](SECURITY.md)
invece di aprire una issue pubblica.

## Contatto

Per domande, proposte o richieste di collaborazione, scrivi a:

info [at] adlcmanifesto [dot] org

Per segnalazioni sensibili alla sicurezza, segui [SECURITY.md](SECURITY.md)
invece di inviare dettagli in una issue pubblica.

## Struttura Del Repository

- [manifesto.md](manifesto.md): il manifesto principale.
- [lifecycle.md](lifecycle.md): le fasi del lifecycle ADLC.
- [shared-skills.md](shared-skills.md): skill riutilizzabili per agenti e team.
- [CHANGELOG.md](CHANGELOG.md): cronologia delle versioni.
- [docs/release-process.md](docs/release-process.md): checklist per release e
  tag.
- [CONTRIBUTING.md](CONTRIBUTING.md): flusso di contribuzione e controlli
  locali.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md): aspettative di partecipazione.
- [SECURITY.md](SECURITY.md): policy di responsible disclosure.
- `site/`: sito statico multilingua pubblicato su `adlcmanifesto.org`.
- `scripts/publish.sh`: script FTPS per pubblicare il sito statico.

## Controlli Locali

Esegui la suite leggera di validazione con:

```sh
make check
```

Altri target di manutenzione:

```sh
make link-check
make serve
make release-check
```

`make serve` avvia una preview statica locale su `http://localhost:8000/`.
Usa `make serve PORT=8001` se quella porta è già occupata.

`make release-check` è pensato per commit di release dopo la creazione del tag
di versione.

## Pubblicazione

Crea un file locale `.env` fuori dal versionamento con i parametri FTPS, poi
esegui:

```sh
make publish
```

Il comando carica il contenuto di `site/` nella directory remota
`/public_html/`.

## Versione

Versione corrente: `V1.2`

- Pubblicata: maggio 2026
- Ultima modifica: maggio 2026

## Tag Di Release

Ogni versione pubblica del manifesto deve essere marcata con un tag Git
annotato.

Usa il formato minuscolo `vX.Y` per i tag del repository, allineato alla
versione dichiarata come `VX.Y` in [manifesto.md](manifesto.md) e
[CHANGELOG.md](CHANGELOG.md).

Per esempio, `V1.2` nel manifesto è taggata come `v1.2` in Git.

Vedi [docs/release-process.md](docs/release-process.md) per la checklist di
release.
