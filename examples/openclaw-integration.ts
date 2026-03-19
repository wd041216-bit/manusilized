// OpenStream Integration Example: OpenClaw
// Shows how to integrate OpenStream with OpenClaw agent system

import { createOllamaStreamFn } from '../references/patches/ollama-stream';
import { isReasoningModelHeuristic } from '../references/patches/ollama-models';

/**
 * Example 1: Basic OpenClaw Integration
 * 
 * This example shows the minimal integration required to use OpenStream
 * with OpenClaw's agent system.
 */
export async function basicOpenClawIntegration() {
  // Create OpenStream-enhanced stream function
  const streamFn = createOllamaStreamFn({
    model: 'qwen3:8b',
    messages: [
      { role: 'user', content: 'What is the weather in Beijing?' }
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'get_weather',
          description: 'Get current weather for a city',
          parameters: {
            type: 'object',
            properties: {
              city: { type: 'string', description: 'City name' }
            },
            required: ['city']
          }
        }
      }
    ]
  });

  // Stream the response
  for await (const event of streamFn) {
    if (event.type === 'text_delta') {
      process.stdout.write(event.delta);
    } else if (event.type === 'tool_call') {
      console.log('\n[Tool Call]', event.toolCall);
    } else if (event.type === 'text_end') {
      console.log('\n[Complete]');
    }
  }
}

/**
 * Example 2: Reasoning Model Detection
 * 
 * OpenStream automatically detects reasoning models and enables
 * extended thinking support.
 */
export async function reasoningModelIntegration() {
  const modelId = 'qwq-32b';
  
  // Check if model is a reasoning model
  if (isReasoningModelHeuristic(modelId)) {
    console.log(`${modelId} is a reasoning model - enabling extended thinking`);
    
    // OpenStream will automatically enable thinking: true
    // and configure appropriate streaming parameters
  }

  // The model detection also correctly excludes non-reasoning models
  const nonReasoningModels = ['deepseek-v3', 'mistral-large', 'command-r'];
  for (const model of nonReasoningModels) {
    if (!isReasoningModelHeuristic(model)) {
      console.log(`${model} is NOT a reasoning model - using standard mode`);
    }
  }
}

/**
 * Example 3: Mega Context Window (2M tokens)
 * 
 * OpenStream supports context windows up to 2M tokens with
 * memory-efficient handling.
 */
export async function megaContextIntegration() {
  // For models with large context windows (GLM-5, Kimi-K2.5)
  const streamFn = createOllamaStreamFn({
    model: 'glm-5',
    messages: [
      // ... long conversation history
    ],
    // OpenStream automatically detects and enables mega context
    // when the model supports it
  });

  // No special configuration needed - OpenStream handles it automatically
}

/**
 * Example 4: Privacy Protection
 * 
 * OpenStream automatically filters sensitive information from responses.
 */
export async function privacyProtectionIntegration() {
  const streamFn = createOllamaStreamFn({
    model: 'qwen3:8b',
    messages: [
      { 
        role: 'user', 
        content: 'What is my email and phone number?' 
      }
    ]
  });

  // User provides: "My email is test@example.com and phone is 13812345678"
  // OpenStream will automatically filter to: "My email is t***@example.com and phone is 138****5678"

  for await (const event of streamFn) {
    if (event.type === 'text_delta') {
      // Content is already filtered
      process.stdout.write(event.delta);
    }
  }
}

/**
 * Example 5: Error Recovery with Retry
 * 
 * OpenStream provides robust error handling with automatic retry.
 */
export async function errorRecoveryIntegration() {
  const streamFn = createOllamaStreamFn({
    model: 'qwen3:8b',
    messages: [
      { role: 'user', content: 'Explain quantum computing' }
    ],
    // OpenStream automatically retries on transient failures
    // with exponential backoff
  });

  try {
    for await (const event of streamFn) {
      // Stream events are handled automatically
      // with proper error recovery
    }
  } catch (error) {
    // OpenStream will retry automatically before throwing
    console.error('Stream failed after retries:', error);
  }
}

/**
 * Example 6: Configuration-based Setup
 * 
 * OpenStream can be configured via JSON file for flexible deployment.
 */
export async function configurationIntegration() {
  // config/openstream-streaming.json
  const config = {
    streaming: {
      mode: 'enhanced',  // 'standard', 'enhanced', 'ultra'
      bufferSize: 2048,
      throttleDelay: 5,
      enableThinkingOutput: true,
      streamInterval: 25
    },
    context: {
      enableMegaContext: true,
      maxContextWindow: 2097152,  // 2M tokens
      autoDetectContext: true
    }
  };

  // Create stream with configuration
  const streamFn = createOllamaStreamFn({
    model: 'qwen3:8b',
    messages: [],
    config  // OpenStream applies configuration automatically
  });
}

// Export all examples
export default {
  basicOpenClawIntegration,
  reasoningModelIntegration,
  megaContextIntegration,
  privacyProtectionIntegration,
  errorRecoveryIntegration,
  configurationIntegration
};