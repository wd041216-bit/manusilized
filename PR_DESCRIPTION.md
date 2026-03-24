# OpenStream Core PR Draft

## Summary

This proposal improves the OpenClaw Ollama runtime in three focused areas:

- incremental streaming behavior
- recovery from malformed tool-call output
- context-window and reasoning-model heuristics

## Why

Open-source model integrations often fail in ways that are runtime-specific rather than task-specific:

- output arrives in uneven chunks or with poor partial-update behavior
- tool calls are emitted as markdown or malformed JSON instead of native structured calls
- newer model families expose larger context windows or reasoning behavior that are not recognized by existing heuristics

These issues are best evaluated close to the runtime/provider layer.

## Proposed Change Surface

- `src/agents/ollama-stream.ts`
  improve streaming assembly and fallback extraction behavior
- `src/agents/ollama-models.ts`
  extend context and model heuristics
- `src/agents/config-utils.ts`
  support config loading used by the runtime changes

## Review Expectations

This PR should be evaluated on:

- correctness of fallback parsing
- backward compatibility for existing Ollama integrations
- observability and failure behavior
- whether each change truly belongs in core rather than a plugin

## Evidence Needed Before Submission

- automated tests for changed runtime behavior
- validation against a pinned OpenClaw revision
- reproducible before/after transcripts or fixtures
- measured benchmarks for any performance claims

## Non-Goals

- introducing a new ClawHub skill
- packaging this repository as a marketplace artifact before the runtime shape is proven
- making broad marketing claims without benchmark support
