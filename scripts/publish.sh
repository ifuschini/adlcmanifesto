#!/usr/bin/env zsh
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
SITE_DIR="${SCRIPT_DIR:h}"
PROJECT_DIR="${SITE_DIR:h}"
ENV_FILE="${PROJECT_DIR}/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env at ${ENV_FILE}" >&2
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

: "${ADLC_USERNAME:?Missing ADLC_USERNAME in .env}"
: "${ADLC_PASSWORD:?Missing ADLC_PASSWORD in .env}"
: "${ADLC_FTPS_HOST:?Missing ADLC_FTPS_HOST in .env}"
: "${ADLC_WEB_DIR:?Missing ADLC_WEB_DIR in .env}"

cd "$SITE_DIR"

echo "Publishing site to ${ADLC_FTPS_HOST}:${ADLC_WEB_DIR}"

find . -type f \
  ! -path './.git/*' \
  ! -path './scripts/*' \
  ! -name '.DS_Store' \
  ! -name '.gitignore' \
  ! -name '.env' \
  ! -name '.env.*' \
  ! -name 'Makefile' \
  | sort \
  | while IFS= read -r file; do
    remote_path="${ADLC_WEB_DIR%/}/${file#./}"
    echo "Uploading ${file#./}"
    curl \
      --fail \
      --silent \
      --show-error \
      --ssl-reqd \
      --ftp-create-dirs \
      --ftp-skip-pasv-ip \
      --user "${ADLC_USERNAME}:${ADLC_PASSWORD}" \
      --upload-file "$file" \
      "ftp://${ADLC_FTPS_HOST}${remote_path}"
  done

echo "Publish complete."
