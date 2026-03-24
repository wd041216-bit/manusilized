# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Native OpenClaw companion plugin packaging via `openclaw.plugin.json`, `index.ts`, and plugin-shipped skills
- `/openstream` command, `openstream_doctor` tool, and cached prompt guidance for Ollama/open-source model deployments
- `docs/plugin-mode.md` to explain the new plugin-companion plus core-bridge split

### Changed
- Repositioned the repository from patch-only proposal to plugin companion plus maintainer runtime bridge
- Upgraded `package.json` to look like a real OpenClaw extension package
- Extended repository validation to verify plugin files and hook surfaces

## [1.3.2] - 2026-03-19

### Changed
- **Project renamed from Manusilized to OpenStream** — To better align with open-source community values and avoid potential trademark issues
- **Privacy protection features added** — Implemented comprehensive filtering for sensitive information including personal IDs, phone numbers, email addresses, financial data, authentication credentials, and network information

### Fixed
- Removed duplicate tool call pattern that could cause double processing
- Enhanced reasoning model heuristic to exclude non-reasoning models (`deepseek-v3`, `mistral.*large`, `command.*r`)
- Improved streaming logic to ensure content accumulation continues during throttling

## [1.3.1] - 2026-03-19

### Fixed
- **Critical: Tool-guard for Markdown fallback** — `extractMarkdownToolCalls()` now accepts an optional `allowedToolNames` set. Any fenced JSON block whose `name` field is not in the configured tool list is silently skipped, preventing data objects like `{"name":"Alice","age":30}` from being misclassified as tool-use turns and corrupting the conversation (sync from openclaw/openclaw#49179)
- **Critical: Backtick support in JSON payloads** — Replaced the `[^\`]` character-class guard in the Markdown regex with a negative lookahead `(?!\`\`\`)`, allowing single or double backticks inside JSON string values (e.g. shell commands like `echo \`date\``). Previously any backtick in an argument value would cause extraction to fail (sync from openclaw/openclaw#49179)
- **Refactor: makeMarkdownToolCallRe() factory** — Moved the Markdown tool-call regex into a factory function to ensure each call-site gets a fresh `RegExp` instance with `lastIndex = 0`, eliminating shared mutable state bugs
- Critical runtime error with undefined variable `accumulatedBuffer`
- Node.js compatibility issue with `navigator.onLine` reference
- Throttling mechanism that skipped content accumulation and tool calls
- Duplicate tool call pattern in extraction regex patterns
- Incorrect reasoning model heuristics for non-reasoning models

### Changed
- `extractMarkdownToolCalls()` signature updated to accept optional `allowedToolNames?: Set<string>` parameter (fully backward compatible)

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
- Initial release with core OpenStream features
- Incremental streaming for real-time text delta
- Markdown tool-call fallback mechanism
- Extended reasoning model support

### Changed
- Improved compatibility with open-source models
- Enhanced fault tolerance for tool calls
- Better integration with OpenClaw architecture

## [1.0.0] - 2026-03-17

### Added
- Initial release of OpenStream
- Core streaming enhancements
- Basic tool-call fallback functionality
- Reasoning model recognition
