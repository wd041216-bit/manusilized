# OpenStream Packaging Note

OpenStream is **not currently a standard OpenClaw skill**.

This repository contains runtime patch files for proposed OpenClaw Ollama improvements:

- smoother incremental streaming
- better fallback recovery for malformed tool-call output
- broader context-window and reasoning-model heuristics

Those changes target OpenClaw core behavior, not a task-level skill surface.

## Current Recommendation

Treat this repository as one of the following:

- a maintainer-facing core PR preparation repo
- a future plugin candidate, if the runtime behavior can be exposed through stable OpenClaw extension points

Do **not** submit the current repository contents to ClawHub as a normal skill bundle.

For the current rationale and acceptance path, see:

- [README.md](../README.md)
- [architecture.md](architecture.md)
- [why-core.md](why-core.md)
