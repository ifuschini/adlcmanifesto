# Manifiesto ADLC

[![Check](https://github.com/ifuschini/adlcmanifesto/actions/workflows/check.yml/badge.svg)](https://github.com/ifuschini/adlcmanifesto/actions/workflows/check.yml)
[![Licencia: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/ifuschini/adlcmanifesto?label=version)](https://github.com/ifuschini/adlcmanifesto/tags)
[![Sitio](https://img.shields.io/website?url=https%3A%2F%2Fadlcmanifesto.org&label=website)](https://adlcmanifesto.org/es/)

El Manifiesto del Agentic Delivery Lifecycle.

[English](README.md) | [Italian](README.it.md) | [Spanish](README.es.md) | [French](README.fr.md)

## Resumen

ADLC, el Agentic Delivery Lifecycle, es un framework de gobernanza y delivery
para construir sistemas agénticos en entornos enterprise con la misma disciplina
esperada en la entrega moderna de software.

No reemplaza el SDLC. Lo extiende con las prácticas que los sistemas agénticos
enterprise necesitan para ser fiables, auditables y mantenibles: requisitos
validados antes de la implementación, checkpoints human-in-the-loop explícitos,
agentes y skills reutilizables, gobernanza del conocimiento y RAG, orquestación
entre herramientas y equipos, trazabilidad, gobernanza de releases y mejora
operativa continua.

El manifiesto está diseñado para organizaciones que necesitan pasar de
experimentos aislados con agentes a capacidades agénticas gobernadas,
reutilizables y escalables.

## Sitio

Sitio público: https://adlcmanifesto.org/es/

El código fuente del sitio está en `site/`. Consulta
[site/README.md](site/README.md) para notas de edición y publicación.

## Open Source

Este repositorio es open source bajo Apache License, Version 2.0.

Apache-2.0 fue elegida porque ADLC está pensado para reutilizarse en contextos
de delivery enterprise y se beneficia de una concesión explícita de patentes,
términos claros para contribuciones y reglas de redistribución.

Consulta `LICENSE` para el texto completo de la licencia y `NOTICE` para notas
de atribución y marca.

## Contribuir

Las contribuciones son bienvenidas. Lee [CONTRIBUTING.md](CONTRIBUTING.md) y
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) antes de abrir issues o pull requests.

Para reportes sensibles de seguridad, sigue [SECURITY.md](SECURITY.md) en lugar
de abrir una issue pública.

## Contacto

Para preguntas, propuestas o solicitudes de colaboración, escribe a:

info [at] adlcmanifesto [dot] org

Para reportes sensibles de seguridad, sigue [SECURITY.md](SECURITY.md) en lugar
de enviar detalles en una issue pública.

## Estructura Del Repositorio

- [manifesto.md](manifesto.md): el manifiesto principal.
- [lifecycle.md](lifecycle.md): las etapas del lifecycle ADLC.
- [shared-skills.md](shared-skills.md): skills reutilizables para agentes y
  equipos.
- [CHANGELOG.md](CHANGELOG.md): historial de versiones.
- [docs/release-process.md](docs/release-process.md): checklist de release y
  tags.
- [CONTRIBUTING.md](CONTRIBUTING.md): flujo de contribución y controles locales.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md): expectativas de participación.
- [SECURITY.md](SECURITY.md): política de responsible disclosure.
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

Versión actual: `V1.2`

- Publicada: mayo de 2026
- Última modificación: mayo de 2026

## Tags De Release

Cada versión pública del manifiesto debe marcarse con un tag Git anotado.

Usa el formato en minusculas `vX.Y` para los tags del repositorio, alineado con
la versión declarada como `VX.Y` en [manifesto.md](manifesto.md) y
[CHANGELOG.md](CHANGELOG.md).

Por ejemplo, `V1.2` en el manifiesto se etiqueta como `v1.2` en Git.

Consulta [docs/release-process.md](docs/release-process.md) para la checklist
de release.
