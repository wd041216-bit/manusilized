#!/bin/bash
set -euo pipefail

# Lightweight repository validation for OpenStream.

echo "OpenStream Validation"
echo "====================="

echo "1. File structure"
if [ -f "references/patches/ollama-stream.ts" ] && [ -f "references/patches/ollama-models.ts" ]; then
  echo "PASS: Core patch files found"
else
  echo "FAIL: Missing core patch files"
  exit 1
fi

if [ -f "install-patch.sh" ]; then
  echo "PASS: Installation script found"
else
  echo "FAIL: Missing installation script"
  exit 1
fi

echo "2. Patch files are non-trivial"
STREAM_FILE_SIZE=$(wc -c < "references/patches/ollama-stream.ts" | tr -d ' ')
MODELS_FILE_SIZE=$(wc -c < "references/patches/ollama-models.ts" | tr -d ' ')

if [ "$STREAM_FILE_SIZE" -gt 10000 ]; then
  echo "PASS: ollama-stream.ts has sufficient content"
else
  echo "FAIL: ollama-stream.ts appears to be too small"
  exit 1
fi

if [ "$MODELS_FILE_SIZE" -gt 5000 ]; then
  echo "PASS: ollama-models.ts has sufficient content"
else
  echo "FAIL: ollama-models.ts appears to be too small"
  exit 1
fi

echo "3. Expected feature markers"

# Check for enhanced streaming features
if grep -q "streamInterval" "references/patches/ollama-stream.ts"; then
  echo "PASS: Streaming parameters found"
else
  echo "FAIL: Streaming parameters missing"
  exit 1
fi

# Check for mega context support
if grep -q "OLLAMA_MEGA_CONTEXT_WINDOW\|2097152" "references/patches/ollama-models.ts"; then
  echo "PASS: Mega context window support found"
else
  echo "FAIL: Mega context window support missing"
  exit 1
fi

# Check for additional tool call patterns
if grep -q "ADDITIONAL_TOOL_CALL_PATTERNS" "references/patches/ollama-stream.ts"; then
  echo "PASS: Extended tool call patterns found"
else
  echo "FAIL: Extended tool call patterns missing"
  exit 1
fi

echo "4. Installer options"

if grep -q "ENABLE_MEGA_CONTEXT" "install-patch.sh"; then
  echo "PASS: Mega context option found in installer"
else
  echo "FAIL: Mega context option missing from installer"
  exit 1
fi

if grep -q "STREAMING_MODE" "install-patch.sh"; then
  echo "PASS: Streaming mode options found in installer"
else
  echo "FAIL: Streaming mode options missing from installer"
  exit 1
fi

echo "5. Documentation completeness"

REQUIRED_DOCS=("README.md" "CHANGELOG.md" "docs/architecture.md" "docs/why-core.md")
for doc in "${REQUIRED_DOCS[@]}"; do
  if [ -f "$doc" ]; then
    echo "PASS: $doc found"
  else
    echo "FAIL: $doc missing"
    exit 1
  fi
done

echo ""
echo "Summary"
echo "======="
echo "Repository-level validation passed."
echo "This script does not replace integration testing against a pinned OpenClaw revision."

exit 0
