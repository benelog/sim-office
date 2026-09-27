#!/bin/bash
# Check Sim Office (office/index.html) in headless Chrome: screenshots of the title, home and every zone, then every
# conversation that can be opened, day by day (up to 3 days), and a phone-sized look at the end.
#   tools/office-check.sh <outdir> [steps.mjs] [width height]
# A steps.mjs exports default async ({ ev, shot, sleep, log, send }) => {} for custom checks.
# Rendering is software (SwiftShader), so it is slower than a real browser.
# Keep TMPDIR short (e.g. TMPDIR=/tmp/claude-1000): Chrome aborts at once when its profile's socket path passes 107 bytes.
cd "$(dirname "$0")/.." || exit 1
OUT=${1:-${TMPDIR:-/tmp}/office-check}
STEPS=$2
W=${3:-1200}; H=${4:-750}
PORT=$((9300 + RANDOM % 600))
PROFILE=$(mktemp -d "${TMPDIR:-/tmp}/office-check-chrome.XXXXXX")
google-chrome --headless=new --remote-debugging-port=$PORT --no-first-run --autoplay-policy=no-user-gesture-required \
  --use-angle=swiftshader --enable-unsafe-swiftshader --window-size=$W,$H --user-data-dir="$PROFILE" about:blank >/dev/null 2>&1 &
CPID=$!
sleep 1.5
SO_DB_JSON=$SO_DB_JSON SO_DAYS=$SO_DAYS SO_HERO=$SO_HERO timeout 900 node tools/office-check.mjs $PORT "$OUT" "$STEPS" $W $H
CODE=$?
kill $CPID 2>/dev/null
sleep 0.5
rm -rf "$PROFILE"
exit $CODE
