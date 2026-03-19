// OpenStream Integration Example: LangChain
// Shows how to integrate OpenStream with LangChain.js

import { createOllamaStreamFn } from '../references/patches/ollama-stream';

/**
 * LangChain Integration Wrapper
 * 
 * This wrapper allows OpenStream to work seamlessly with LangChain's
 * tool calling and streaming interfaces.
 */
export class OpenStreamLangChainWrapper {
  private model: string;
  private tools: any[];

  constructor(model: string = 'qwen3:8b', tools: any[] = []) {
    this.model = model;
    this.tools = tools;
  }

  /**
   * Stream messages with LangChain-compatible interface
   */
  async *stream(messages: Array<{ role: string; content: string }>) {
    const streamFn = createOllamaStreamFn({
      model: this.model,
      messages,
      tools: this.tools
    });

    let fullContent = '';
    const toolCalls: any[] = [];

    for await (const event of streamFn) {
      if (event.type === 'text_delta') {
        fullContent += event.delta;
        yield {
          type: 'token',
          token: event.delta
        };
      } else if (event.type === 'tool_call') {
        toolCalls.push(event.toolCall);
        yield {
          type: 'tool_call',
          toolCall: event.toolCall
        };
      } else if (event.type === 'text_end') {
        yield {
          type: 'final',
          content: fullContent,
          toolCalls
        };
      }
    }
  }

  /**
   * Invoke with LangChain-compatible interface
   */
  async invoke(messages: Array<{ role: string; content: string }>) {
    const streamGen = this.stream(messages);
    let finalResult: any;

    for await (const event of streamGen) {
      if (event.type === 'final') {
        finalResult = event;
      }
    }

    return {
      content: finalResult?.content || '',
      toolCalls: finalResult?.toolCalls || []
    };
  }

  /**
   * Bind tools for LangChain tool calling
   */
  bindTools(tools: any[]) {
    return new OpenStreamLangChainWrapper(this.model, tools);
  }
}

/**
 * Example: Using OpenStream with LangChain-style tool calling
 */
export async function langChainToolCallingExample() {
  // Define tools in LangChain format
  const tools = [
    {
      type: 'function',
      function: {
        name: 'search',
        description: 'Search for information',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query' }
          },
          required: ['query']
        }
      }
    }
  ];

  // Create OpenStream instance with tools
  const llm = new OpenStreamLangChainWrapper('qwen3:8b', tools);

  // Stream the response
  console.log('Streaming response:');
  for await (const event of llm.stream([
    { role: 'user', content: 'What is the capital of France?' }
  ])) {
    if (event.type === 'token') {
      process.stdout.write(event.token);
    } else if (event.type === 'tool_call') {
      console.log('\n[Tool Call]', event.toolCall);
    }
  }
}

/**
 * Example: Using OpenStream in a LangChain agent workflow
 */
export async function langChainAgentWorkflowExample() {
  const tools = [
    {
      type: 'function',
      function: {
        name: 'calculator',
        description: 'Perform calculations',
        parameters: {
          type: 'object',
          properties: {
            expression: { type: 'string', description: 'Math expression' }
          },
          required: ['expression']
        }
      }
    },
    {
      type: 'function',
      function: {
        name: 'search',
        description: 'Search the web',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query' }
          },
          required: ['query']
        }
      }
    }
  ];

  const llm = new OpenStreamLangChainWrapper('qwen3:8b', tools);

  // Agent workflow
  const messages = [
    { role: 'user', content: 'What is 25 * 4 + 10?' }
  ];

  // First call - model decides to use calculator
  const result = await llm.invoke(messages);

  if (result.toolCalls.length > 0) {
    const toolCall = result.toolCalls[0];
    console.log(`Model wants to call: ${toolCall.function.name}`);
    console.log(`Arguments: ${JSON.stringify(toolCall.function.arguments)}`);

    // Execute tool (simulated)
    const toolResult = executeToolCall(toolCall);

    // Add tool result to messages
    messages.push({
      role: 'tool',
      content: JSON.stringify(toolResult)
    });

    // Second call - model provides final answer
    const finalResult = await llm.invoke(messages);
    console.log(`Final answer: ${finalResult.content}`);
  } else {
    console.log(`Direct answer: ${result.content}`);
  }
}

function executeToolCall(toolCall: any): any {
  // Simulated tool execution
  if (toolCall.function.name === 'calculator') {
    const expr = toolCall.function.arguments.expression;
    // Safe evaluation (in production, use a proper math parser)
    try {
      const result = eval(expr);
      return { result };
    } catch (error) {
      return { error: 'Invalid expression' };
    }
  }
  return { status: 'executed' };
}

export default {
  OpenStreamLangChainWrapper,
  langChainToolCallingExample,
  langChainAgentWorkflowExample
};