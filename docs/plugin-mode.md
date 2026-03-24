# Plugin Mode

OpenStream now ships as a native OpenClaw companion plugin.

That changes the packaging story:

- plugin-deliverable now:
  - `/openstream` command
  - `openstream_doctor` tool
  - plugin-shipped skill
  - cached prompt guidance via `before_prompt_build`
  - heuristic and sample-config output for Ollama deployments
- core-bridge still required for:
  - raw stream assembly changes
  - markdown/json tool-call repair at the provider parser boundary
  - exact transport/runtime behavior changes inside the Ollama path

## Why This Matters

This split lets OpenStream become collection-friendly without pretending the hardest runtime work is already solved in plugin space.

## Current Recommended Packaging

1. Submit the companion plugin as the collectable OpenClaw artifact.
2. Keep the core patch files as the maintainer review bridge for deeper runtime changes.
3. Narrow the future platform ask to provider-level hooks that would let OpenStream move more logic out of file replacements.

## Strongest Next Upgrade

The most valuable next step is an Ollama overlay provider plugin that first targets the highest-value narrow slice: malformed markdown / JSON-ish tool-call recovery. From there it can expand into provider hooks for:

- model normalization
- extra-param preparation
- stream wrapping where safe

That would shrink the remaining core patch surface and move OpenStream closer to a fully plugin-native shape.
