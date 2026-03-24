# OpenStream Upgrade Plan

> Historical planning note. This roadmap is useful for internal sequencing, but it should not be treated as evidence of shipped behavior. For the current maintainer-facing framing, see [README.md](README.md), [docs/architecture.md](docs/architecture.md), and [docs/why-core.md](docs/why-core.md).

## Current State Analysis

Based on my analysis of the current openstream implementation and OpenClaw's architecture, I've identified several areas for improvement to make the OpenClaw experience as smooth, stable, secure, and elegant as Manus.

## Identified Pain Points in OpenClaw

1. **Streaming Experience**: Lack of real-time text delta streaming leads to poor user experience
2. **Tool Call Reliability**: Open-source models often fail with native JSON Function Calling
3. **Context Window Management**: Limited support for extended context windows
4. **Reasoning Model Recognition**: Inadequate detection and optimization for reasoning models
5. **Error Handling**: Insufficient fallback mechanisms for common failure scenarios

## Upgrade Objectives

### Phase 1: Enhanced Streaming (Silky Smooth Experience)
- Implement incremental streaming with live typewriter effect
- Add configurable streaming parameters
- Improve WebSocket connection stability

### Phase 2: Fault-Tolerant Tool Calls (Reliability)
- Enhanced Markdown tool-call fallback mechanism
- Better error recovery for malformed tool calls
- Support for multiple tool call formats

### Phase 3: Extended Context Support (Scalability)
- Dynamic context window detection and configuration
- Support for 1M-2M token contexts
- Memory-efficient handling of large contexts

### Phase 4: Advanced Reasoning Model Support (Intelligence)
- Expanded heuristic patterns for reasoning models
- Specialized handling for new model families
- Performance optimizations for reasoning tasks

### Phase 5: Robust Error Handling (Stability)
- Comprehensive error recovery mechanisms
- Graceful degradation strategies
- Detailed logging and monitoring

## Implementation Roadmap

### Immediate Improvements (v1.1.0)
1. Enhanced streaming with configurable parameters
2. Improved tool call extraction with better regex patterns
3. Better error handling and recovery

### Medium-term Enhancements (v1.2.0)
1. Extended context window support (up to 2M tokens)
2. Advanced reasoning model detection
3. Performance optimizations

### Long-term Goals (v2.0.0)
1. Full Manus-like experience parity
2. Enterprise-grade reliability features
3. Advanced memory management systems

## Technical Approach

### Streaming Enhancement
- Modify `ollama-stream.ts` to support configurable streaming intervals
- Add buffering mechanisms for smoother output
- Implement connection health monitoring

### Tool Call Improvement
- Extend `extractMarkdownToolCalls` with additional patterns
- Add support for YAML tool call formats
- Implement retry mechanisms for failed extractions

### Context Management
- Enhance `queryOllamaContextWindow` with caching
- Add support for dynamic context resizing
- Implement memory-efficient chunking for large contexts

### Reasoning Model Support
- Expand `isReasoningModelHeuristic` with new patterns
- Add specialized configurations for reasoning models
- Implement thinking mode detection and optimization

## Testing Strategy

1. Unit tests for all core functions
2. Integration tests with various Ollama models
3. Performance benchmarks for streaming and tool calls
4. Compatibility tests with different OpenClaw versions

## Expected Outcomes

1. 50% reduction in perceived latency through incremental streaming
2. 90% success rate for tool calls with open-source models
3. Support for context windows up to 2M tokens
4. Seamless integration with existing OpenClaw workflows
