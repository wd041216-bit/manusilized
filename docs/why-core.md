# Why Core First

OpenStream started as a core-first proposal because the repository changed OpenClaw runtime behavior directly.

That is no longer the whole story:

- a companion plugin is now viable and implemented
- the deepest runtime parser/streaming behavior is still core-first

## Reasons

### 1. Streaming behavior lives in the provider/runtime path

Partial output assembly is not a task-level concern.
It affects how the host emits assistant updates for every downstream workflow.

### 2. Tool-call fallback needs access to raw model output

Malformed tool-call recovery is easiest to implement near the place where raw provider output is parsed.

### 3. Model heuristics affect system defaults

Context-window detection and reasoning-model recognition influence runtime settings and should be reviewed as platform behavior, not as a task recipe.

## Why Not ClawHub Yet

ClawHub is a strong fit for:

- task-oriented skills
- reusable prompts and workflows
- companion tooling with stable install surfaces

OpenStream currently offers:

- a native plugin companion
- file replacement patches
- installer scripts
- maintainer notes

That is not yet a trustworthy marketplace artifact.

## What Has Become Plugin-Viable Already

OpenClaw now exposes enough plugin surface for OpenStream to ship:

- command helpers
- agent tools
- plugin-shipped skills
- cached prompt guidance
- config generation and heuristic diagnostics

Those parts should live in plugin space now.

## What Still Needs Core Or New Provider Hooks

The remaining hard parts still need either core review or better provider hooks for:

- stream hooks
- model metadata augmentation
- provider-owned repair wrappers for brittle tool-call streams

Until those are available, the honest product shape is:

- plugin companion for installable, collectable value
- core bridge for the remaining deep runtime behavior
