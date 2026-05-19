# Manifiesto ADLC

[![Check](https://github.com/ifuschini/adlcmanifesto/actions/workflows/check.yml/badge.svg)](https://github.com/ifuschini/adlcmanifesto/actions/workflows/check.yml)
[![Licencia: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/ifuschini/adlcmanifesto?label=version)](https://github.com/ifuschini/adlcmanifesto/tags)
[![Sitio](https://img.shields.io/website?url=https%3A%2F%2Fadlcmanifesto.org&label=website)](https://adlcmanifesto.org/es/)

El Manifiesto del Agentic Delivery Lifecycle.

## Idiomas

- English: [README.md](README.md)
- Italiano: [README.it.md](README.it.md)
- Español: [README.es.md](README.es.md)
- Français: [README.fr.md](README.fr.md)

## Resumen

ADLC extiende el SDLC para sistemas agénticos agregando controles de calidad de
requisitos, checkpoints human-in-the-loop, orquestación, agentes compartidos,
skills compartidas, trazabilidad y mejora operativa continua.

## Sitio

Sitio público: https://adlcmanifesto.org/es/

El código fuente del sitio está en `site/`. Consulta `site/README.md` para
notas de edición y publicación.

## Open Source

Este repositorio es open source bajo Apache License, Version 2.0.

Apache-2.0 fue elegida porque ADLC está pensado para reutilizarse en contextos
de delivery enterprise y se beneficia de una concesión explícita de patentes,
términos claros para contribuciones y reglas de redistribución.

Consulta `LICENSE` para el texto completo de la licencia y `NOTICE` para notas
de atribución y marca.

## Contribuir

Las contribuciones son bienvenidas. Lee `CONTRIBUTING.md` y
`CODE_OF_CONDUCT.md` antes de abrir issues o pull requests.

Para reportes sensibles de seguridad, sigue `SECURITY.md` en lugar de abrir una
issue pública.

## Estructura Del Repositorio

- `manifesto.md`: el manifiesto principal.
- `lifecycle.md`: las etapas del lifecycle ADLC.
- `shared-skills.md`: skills reutilizables para agentes y equipos.
- `CHANGELOG.md`: historial de versiones.
- `docs/release-process.md`: checklist de release y tags.
- `CONTRIBUTING.md`: flujo de contribución y controles locales.
- `CODE_OF_CONDUCT.md`: expectativas de participación.
- `SECURITY.md`: política de responsible disclosure.
- `site/`: sitio estático multilingüe publicado en `adlcmanifesto.org`.
- `scripts/publish.sh`: script FTPS para publicar el sitio estático.

## Controles Locales

Ejecuta la suite ligera de validación con:

```sh
make check
```

Otros targets de mantenimiento:

```sh
make link-check
make serve
make release-check
```

`make serve` inicia una preview estática local en `http://localhost:8000/`.
Usa `make serve PORT=8001` si ese puerto ya está ocupado.

`make release-check` está pensado para commits de release después de crear el
tag de version.

## Publicación

Crea un archivo local `.env` fuera del versionado con los parámetros FTPS y
ejecuta:

```sh
make publish
```

El comando sube el contenido de `site/` al directorio remoto `/public_html/`.

## Versión

Versión actual: `V1.1`

- Publicada: abril de 2026
- Última modificación: mayo de 2026

## Tags De Release

Cada versión pública del manifiesto debe marcarse con un tag Git anotado.

Usa el formato en minusculas `vX.Y` para los tags del repositorio, alineado con
la versión declarada como `VX.Y` en `manifesto.md` y `CHANGELOG.md`.

Por ejemplo, `V1.1` en el manifiesto se etiqueta como `v1.1` en Git.

Consulta `docs/release-process.md` para la checklist de release.
