# OpenStream Integration Examples

This directory contains examples showing how to integrate OpenStream with various frameworks and use cases.

## Examples Overview

### 1. OpenClaw Integration (`openclaw-integration.ts`)

Basic integration with OpenClaw's agent system.

**Features demonstrated**:
- Basic streaming setup
- Reasoning model detection
- Mega context window support
- Privacy protection
- Error recovery
- Configuration-based setup

```typescript
import { createOllamaStreamFn } from '../references/patches/ollama-stream';

const streamFn = createOllamaStreamFn({
  model: 'qwen3:8b',
  messages: [{ role: 'user', content: 'Hello!' }]
});

for await (const event of streamFn) {
  if (event.type === 'text_delta') {
    process.stdout.write(event.delta);
  }
}
```

### 2. LangChain Integration (`langchain-integration.ts`)

Integration with LangChain.js framework.

**Features demonstrated**:
- LangChain-compatible streaming interface
- Tool calling with LangChain format
- Agent workflow pattern

```typescript
import { OpenStreamLangChainWrapper } from './langchain-integration';

const llm = new OpenStreamLangChainWrapper('qwen3:8b', tools);

for await (const event of llm.stream(messages)) {
  if (event.type === 'token') {
    process.stdout.write(event.token);
  }
}
```

### 3. Standalone Usage (`standalone-usage.ts`)

Direct API usage without frameworks.

**Features demonstrated**:
- Direct API calls
- Manual tool handling
- Custom event processing

## Running Examples

### Prerequisites

1. Node.js 22+ installed
2. Ollama running locally (or configure remote endpoint)
3. Required dependencies installed

```bash
npm install
```

### Run Examples

```bash
# OpenClaw integration
npx tsx examples/openclaw-integration.ts

# LangChain integration
npx tsx examples/langchain-integration.ts

# Standalone usage
npx tsx examples/standalone-usage.ts
```

## Common Patterns

### Streaming with Tool Calls

```typescript
const streamFn = createOllamaStreamFn({
  model: 'qwen3:8b',
  messages: [{ role: 'user', content: 'What is the weather in Beijing?' }],
  tools: [weatherTool]
});

for await (const event of streamFn) {
  if (event.type === 'text_delta') {
    process.stdout.write(event.delta);
  } else if (event.type === 'tool_call') {
    const result = await executeTool(event.toolCall);
    // Add result to messages and continue
  }
}
```

### Privacy Protection

OpenStream automatically filters sensitive information:

```typescript
// User provides: "My email is test@example.com and phone is 13812345678"
// OpenStream filters to: "My email is t***@example.com and phone is 138****5678"

const streamFn = createOllamaStreamFn({
  model: 'qwen3:8b',
  messages: [{ role: 'user', content: userInput }]
});

// Content is automatically filtered in the response
```

### Reasoning Model Detection

```typescript
import { isReasoningModelHeuristic } from '../references/patches/ollama-models';

if (isReasoningModelHeuristic('qwq-32b')) {
  // Enable extended thinking support
  console.log('Reasoning model detected');
}
```

### Mega Context Window

For models with 2M token context windows:

```typescript
// OpenStream automatically detects and enables mega context
const streamFn = createOllamaStreamFn({
  model: 'glm-5',  // Supports 2M tokens
  messages: longConversationHistory
});
```

## Configuration

### JSON Configuration File

Create `config/openstream-streaming.json`:

```json
{
  "streaming": {
    "mode": "enhanced",
    "bufferSize": 2048,
    "throttleDelay": 5,
    "enableThinkingOutput": true,
    "streamInterval": 25
  },
  "context": {
    "enableMegaContext": true,
    "maxContextWindow": 2097152,
    "autoDetectContext": true
  }
}
```

### Programmatic Configuration

```typescript
const config = {
  streaming: { mode: 'ultra' },
  context: { enableMegaContext: true }
};

const streamFn = createOllamaStreamFn({
  model: 'qwen3:8b',
  messages: [],
  config
});
```

## Error Handling

OpenStream provides automatic retry with exponential backoff:

```typescript
try {
  for await (const event of streamFn) {
    // Process events
  }
} catch (error) {
  // OpenStream retries automatically before throwing
  console.error('Stream failed after retries:', error);
}
```

## Testing

Run the test suite to verify OpenStream functionality:

```bash
npm test
```

## Troubleshooting

### Tool Calls Not Detected

If tool calls are not being detected, ensure:
1. Tool names are in the allowed list
2. Tool call format is correct (JSON or YAML)
3. Fallback extraction is enabled

### Streaming Latency Issues

If streaming is slow:
1. Check network connection to Ollama
2. Reduce throttle delay in configuration
3. Use 'standard' mode instead of 'enhanced'

### Context Window Errors

For context window issues:
1. Enable mega context in configuration
2. Check model supports requested context size
3. Refer to MODEL_COMPATIBILITY.md

## Need Help?

1. Check [MODEL_COMPATIBILITY.md](../docs/MODEL_COMPATIBILITY.md) for model-specific quirks
2. Run privacy check: `./scripts/privacy-check.sh`
3. Open a GitHub issue with logs and model information