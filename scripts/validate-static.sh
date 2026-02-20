#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

exit_code=0

html_files=()
while IFS= read -r file; do
  html_files+=("$file")
done < <(find . -maxdepth 1 -type f -name "*.html" | sed 's|^\./||' | sort)

if [ "${#html_files[@]}" -eq 0 ]; then
  echo "ERROR: No HTML files were found at repository root."
  exit 1
fi

echo "Checking metadata requirements..."
for file in "${html_files[@]}"; do
  if ! rg -q 'rel="canonical"' "$file"; then
    echo "ERROR: $file is missing a canonical tag."
    exit_code=1
  fi

  if ! rg -q 'property="og:title"' "$file"; then
    echo "ERROR: $file is missing Open Graph metadata."
    exit_code=1
  fi

  if ! rg -q 'name="twitter:card"' "$file"; then
    echo "ERROR: $file is missing Twitter metadata."
    exit_code=1
  fi
done

echo "Checking local asset and page references..."
while IFS= read -r reference; do
  path="${reference%%\?*}"
  path="${path%%#*}"

  if [ -z "$path" ]; then
    continue
  fi

  case "$path" in
    http:*|https:*|mailto:*|tel:*|data:*|javascript:*)
      continue
      ;;
  esac

  if [ ! -e "$path" ]; then
    echo "ERROR: Missing local target: $path"
    exit_code=1
  fi
done < <(
  rg -No '(?:href|src)="[^"]+"' "${html_files[@]}" \
    | sed -E 's/.*="([^"]+)"/\1/' \
    | sort -u
)

echo "Checking crawler and manifest files..."
for required_file in robots.txt sitemap.xml site.webmanifest; do
  if [ ! -f "$required_file" ]; then
    echo "ERROR: Missing required file: $required_file"
    exit_code=1
  fi
done

for icon_file in images/icons/icon-192.jpg images/icons/icon-512.jpg images/icons/apple-touch-icon.jpg; do
  if [ ! -f "$icon_file" ]; then
    echo "ERROR: Missing icon file: $icon_file"
    exit_code=1
  fi
done

if [ -f sitemap.xml ] && ! rg -q "<urlset" sitemap.xml; then
  echo "ERROR: sitemap.xml is missing urlset."
  exit_code=1
fi

if [ "$exit_code" -ne 0 ]; then
  echo "Static validation failed."
  exit "$exit_code"
fi

echo "Static validation passed."
