#!/usr/bin/env zsh
set -euo pipefail

manifesto_version="$(sed -n 's/^Version: V//p' manifesto.md | head -n 1)"

if [[ -z "$manifesto_version" ]]; then
  echo "Unable to read manifesto version from manifesto.md" >&2
  exit 1
fi

tag_name="v${manifesto_version}"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash changes before release." >&2
  exit 1
fi

if ! grep -q "## V${manifesto_version}" CHANGELOG.md; then
  echo "Missing CHANGELOG.md section for V${manifesto_version}" >&2
  exit 1
fi

if ! git rev-parse --verify --quiet "refs/tags/${tag_name}" >/dev/null; then
  echo "Missing local tag ${tag_name}" >&2
  exit 1
fi

if [[ "$(git rev-list -n 1 "${tag_name}")" != "$(git rev-parse HEAD)" ]]; then
  echo "Tag ${tag_name} does not point to HEAD." >&2
  exit 1
fi

echo "Release check passed for V${manifesto_version} (${tag_name})."
