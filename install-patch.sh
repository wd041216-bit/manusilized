#!/bin/bash
# Script to apply Manusilized patches to a local OpenClaw installation

echo "🚀 Welcome to the Manusilized Patch Installer!"
echo ""

# Parse command line arguments
ENABLE_MEGA_CONTEXT=false
STREAMING_MODE="standard"
HELP=false

while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      HELP=true
      shift
      ;;
    --enable-mega-context)
      ENABLE_MEGA_CONTEXT=true
      shift
      ;;
    --streaming-mode)
      STREAMING_MODE="$2"
      shift 2
      ;;
    *)
      OPENCLAW_PATH="$1"
      shift
      ;;
  esac
done

if [ "$HELP" = true ]; then
  echo "Usage: ./install-patch.sh [OPTIONS] [/path/to/openclaw]"
  echo ""
  echo "Options:"
  echo "  -h, --help               Show this help message"
  echo "  --enable-mega-context    Enable 2M context window support"
  echo "  --streaming-mode MODE    Set streaming mode (standard|enhanced|ultra)"
  echo ""
  echo "Examples:"
  echo "  ./install-patch.sh /path/to/openclaw"
  echo "  ./install-patch.sh --enable-mega-context /path/to/openclaw"
  echo "  ./install-patch.sh --streaming-mode enhanced /path/to/openclaw"
  exit 0
fi

if [ -z "$OPENCLAW_PATH" ]; then
  echo "❌ Error: Please provide the path to your OpenClaw installation."
  echo "Usage: ./install-patch.sh [OPTIONS] /path/to/openclaw"
  echo "Run './install-patch.sh --help' for more information."
  exit 1
fi

if [ ! -d "$OPENCLAW_PATH/src/agents" ]; then
  echo "❌ Error: Could not find src/agents in the provided path ($OPENCLAW_PATH)."
  echo "Are you sure this is the root of the OpenClaw repository?"
  exit 1
fi

echo "📦 Applying patches to $OPENCLAW_PATH..."

# Backup original files if they haven't been backed up already
if [ ! -f "$OPENCLAW_PATH/src/agents/ollama-stream.ts.bak" ]; then
  echo "🔄 Backing up original files..."
  cp "$OPENCLAW_PATH/src/agents/ollama-stream.ts" "$OPENCLAW_PATH/src/agents/ollama-stream.ts.bak"
  cp "$OPENCLAW_PATH/src/agents/ollama-models.ts" "$OPENCLAW_PATH/src/agents/ollama-models.ts.bak"
else
  echo "🔄 Backups already exist, skipping backup step..."
fi

# Copy patched files
echo "✨ Copying patched files..."
cp ./references/patches/ollama-stream.ts "$OPENCLAW_PATH/src/agents/ollama-stream.ts"
cp ./references/patches/ollama-models.ts "$OPENCLAW_PATH/src/agents/ollama-models.ts"
cp ./references/patches/config-utils.ts "$OPENCLAW_PATH/src/agents/config-utils.ts"

# Create configuration file based on options
echo "🔧 Creating configuration..."
CONFIG_DIR="$OPENCLAW_PATH/config"
mkdir -p "$CONFIG_DIR"

# Write streaming configuration
cat > "$CONFIG_DIR/manusilized-streaming.json" << EOF
{
  "streaming": {
    "mode": "$STREAMING_MODE",
    "bufferSize": 2048,
    "throttleDelay": 5,
    "enableThinkingOutput": true,
    "streamInterval": 25
  },
  "context": {
    "enableMegaContext": $ENABLE_MEGA_CONTEXT,
    "maxContextWindow": $(if [ "$ENABLE_MEGA_CONTEXT" = true ]; then echo "2097152"; else echo "262144"; fi),
    "autoDetectContext": true
  }
}
EOF

echo ""
echo "✅ Success! Manusilized patches have been applied."
echo "Configuration has been written to $CONFIG_DIR/manusilized-streaming.json"

if [ "$ENABLE_MEGA_CONTEXT" = true ]; then
  echo "🌐 Mega context window support (up to 2M tokens) has been enabled."
fi

echo "Please navigate to your OpenClaw directory and run 'pnpm build' to compile the changes."
echo "If you encounter any issues, you can restore the backups (.bak files)."

# Show additional information based on options
if [ "$STREAMING_MODE" != "standard" ]; then
  echo ""
  echo "⚡ Enhanced streaming mode '$STREAMING_MODE' has been configured."
  echo "   This provides smoother, more responsive output streaming."
fi