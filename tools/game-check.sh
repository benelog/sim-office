#!/bin/bash
# Check a chapter of the 3D game in headless Chrome: screenshots and an autoplay to the end.
#   tools/game-check.sh <chapter> [outdir] [steps.mjs] [width height]
# chapter 0 opens the chapter menu. Screenshots go to outdir (default /tmp/game-check/<chapter>).
# Rendering is software (SwiftShader), so it is slower than a real browser.
# Keep TMPDIR short (e.g. /tmp/claude-1000): Chrome aborts at once when its profile's socket path passes 107 bytes.
cd "$(dirname "$0")/.." || exit 1
CH=${1:?chapter number}
OUT=${2:-${TMPDIR:-/tmp}/game-check/$CH}
STEPS=$3
W=${4:-1200}; H=${5:-750}
PORT=$((9300 + RANDOM % 600))
PROFILE=$(mktemp -d "${TMPDIR:-/tmp}/game-check-chrome.XXXXXX")
google-chrome --headless=new --remote-debugging-port=$PORT --no-first-run \
  --use-angle=swiftshader --enable-unsafe-swiftshader --window-size=$W,$H --user-data-dir="$PROFILE" about:blank >/dev/null 2>&1 &
CPID=$!
sleep 1.5
timeout 300 node tools/game-check.mjs $PORT "$CH" "$OUT" $STEPS
kill $CPID 2>/dev/null
sleep 0.5
rm -rf "$PROFILE"
