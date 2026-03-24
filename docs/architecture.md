# OpenStream Architecture

## Goal

OpenStream proposes targeted runtime improvements for OpenClaw's Ollama path, with a new companion plugin layer for diagnostics and guidance.

It is not a task skill. It is now:

- a native OpenClaw companion plugin
- a runtime behavior proposal for the remaining deep-path changes

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

## Plugin-Native Surface

The current repository can now ship these concerns as a real OpenClaw plugin:

- command and CLI diagnostics
- model/context heuristics reporting
- plugin-shipped skills
- cached prompt guidance for Ollama/open-source model behavior
- generated config snippets for plugin mode and runtime bridge mode

Those are safe extension-layer concerns because they do not require replacing provider internals.

## Why The Remaining Surface Is Still Hard To Ship Fully As A Plugin

Skills help the agent perform tasks.

OpenStream changes:

- provider behavior
- runtime parsing
- model metadata heuristics

Those are host-level concerns, so a skill bundle is the wrong abstraction unless the final product becomes only a companion configuration/documentation layer.

## Preferred End State

One of these should become true:

1. the current companion plugin becomes the stable collection/install surface
2. more of the runtime behavior moves behind supported provider/plugin boundaries
3. the smallest remaining unsafe subset lands in OpenClaw core

Until one of those exists, this repo should be treated as a proposal and evaluation artifact.
