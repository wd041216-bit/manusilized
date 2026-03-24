# Why Core First

OpenStream currently starts as a core-first proposal because the repository changes OpenClaw runtime behavior directly.

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

- file replacement patches
- installer scripts
- maintainer notes

That is not yet a trustworthy marketplace artifact.

## What Could Make Plugin Packaging Viable Later

If OpenClaw exposes stable extension points for:

- provider wrappers
- stream hooks
- model metadata augmentation
- config registration

then OpenStream should be re-evaluated as a plugin.

Until then, core review is the more honest product shape.
