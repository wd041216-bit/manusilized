# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.1] - 2026-03-19

### Fixed
- Critical runtime error with undefined variable `accumulatedBuffer`
- Node.js compatibility issue with `navigator.onLine` reference
- Throttling mechanism that skipped content accumulation and tool calls
- Duplicate tool call pattern in extraction regex patterns
- Incorrect reasoning model heuristics for non-reasoning models

## [1.2.0] - 2026-03-18

### Added
- Enhanced streaming with configurable parameters for smoother output
- Support for 2M context window (mega context) in compatible models
- Extended tool call extraction patterns for better compatibility
- Intelligent context window detection with caching
- Predefined context windows for popular models
- Configuration options for streaming modes (standard, enhanced, ultra)
- Support for thinking/reasoning output in streaming

### Changed
- Improved error handling and recovery mechanisms
- Enhanced tool call extraction with additional regex patterns
- Better model recognition for reasoning capabilities
- Optimized buffer management for smoother streaming
- Extended max tokens support for large context windows

### Fixed
- Issues with large context window handling
- Tool call extraction reliability with various model formats
- Streaming performance with high-latency connections
- Memory efficiency in context window detection

## [1.1.0] - 2026-03-18

### Added
- Initial release with core Manusilized features
- Incremental streaming for real-time text delta
- Markdown tool-call fallback mechanism
- Extended reasoning model support

### Changed
- Improved compatibility with open-source models
- Enhanced fault tolerance for tool calls
- Better integration with OpenClaw architecture

## [1.0.0] - 2026-03-17

### Added
- Initial release of Manusilized
- Core streaming enhancements
- Basic tool-call fallback functionality
- Reasoning model recognition