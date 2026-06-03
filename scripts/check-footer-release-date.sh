#!/usr/bin/env zsh
set -euo pipefail

latest_tag_date="$(git for-each-ref --sort=-creatordate --format='%(creatordate:iso8601)' refs/tags | head -n 1)"

if [[ -z "$latest_tag_date" ]]; then
  echo "No repository tags found; unable to validate footer release date." >&2
  exit 1
fi

year="${latest_tag_date[1,4]}"
month="${latest_tag_date[6,7]}"

case "$month" in
  01) month_en="January"; month_it="gennaio"; month_es="enero"; month_fr="janvier" ;;
  02) month_en="February"; month_it="febbraio"; month_es="febrero"; month_fr="fevrier" ;;
  03) month_en="March"; month_it="marzo"; month_es="marzo"; month_fr="mars" ;;
  04) month_en="April"; month_it="aprile"; month_es="abril"; month_fr="avril" ;;
  05) month_en="May"; month_it="maggio"; month_es="mayo"; month_fr="mai" ;;
  06) month_en="June"; month_it="giugno"; month_es="junio"; month_fr="juin" ;;
  07) month_en="July"; month_it="luglio"; month_es="julio"; month_fr="juillet" ;;
  08) month_en="August"; month_it="agosto"; month_es="agosto"; month_fr="aout" ;;
  09) month_en="September"; month_it="settembre"; month_es="septiembre"; month_fr="septembre" ;;
  10) month_en="October"; month_it="ottobre"; month_es="octubre"; month_fr="octobre" ;;
  11) month_en="November"; month_it="novembre"; month_es="noviembre"; month_fr="novembre" ;;
  12) month_en="December"; month_it="dicembre"; month_es="diciembre"; month_fr="decembre" ;;
  *)
    echo "Unsupported tag month: ${month}" >&2
    exit 1
    ;;
esac

checks=(
  "site/index.html:<p>${month_en} ${year}</p>"
  "site/changelog/index.html:<p>${month_en} ${year}</p>"
  "site/it/index.html:<p>${month_it} ${year}</p>"
  "site/es/index.html:<p>${month_es} ${year}</p>"
  "site/fr/index.html:<p>${month_fr} ${year}</p>"
)

for check in "${checks[@]}"; do
  file="${check%%:*}"
  expected="${check#*:}"

  if ! grep -Fq "$expected" "$file"; then
    echo "Footer release date mismatch in ${file}. Expected: ${expected}" >&2
    exit 1
  fi
done

echo "Footer release date matches latest tag month/year (${month_en} ${year})."
