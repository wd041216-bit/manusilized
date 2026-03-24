# OpenStream Architecture

## Goal

OpenStream proposes targeted runtime improvements for OpenClaw's Ollama path.

It is not a task skill. It is a runtime behavior proposal.

## Current Change Surface

### `ollama-stream.ts`

Responsibilities touched by the patch:

- assembling partial streamed output
- handling malformed or markdown-embedded tool calls
- cleaning visible assistant content when tool-call output leaks into normal text
- improving error handling around incomplete stream state

Why it matters:

- this file sits on the provider/runtime path where streaming correctness and tool-call recovery actually happen

### `ollama-models.ts`

Responsibilities touched by the patch:

- model-family detection
- context-window heuristics
- reasoning-model heuristics

Why it matters:

- OpenClaw needs stable model metadata to choose sane defaults for open-source Ollama models

### `config-utils.ts`

Responsibilities touched by the patch:

- runtime configuration loading for the proposed behavior flags

Why it matters:

- evaluation is easier when streaming and context behavior can be toggled without editing code

## Why This Is Hard to Ship as a Skill

Skills help the agent perform tasks.

OpenStream changes:

- provider behavior
- runtime parsing
- model metadata heuristics

Those are host-level concerns, so a skill bundle is the wrong abstraction unless the final product becomes only a companion configuration/documentation layer.

## Preferred End State

One of these should become true:

1. the smallest safe subset lands in OpenClaw core
2. the behavior is refactored behind supported plugin boundaries

Until one of those exists, this repo should be treated as a proposal and evaluation artifact.
