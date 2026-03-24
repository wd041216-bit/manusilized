# OpenStream

OpenStream is a maintainer-facing patch set for proposed OpenClaw Ollama runtime improvements.

It focuses on three concrete areas:

- smoother incremental streaming for Ollama-backed responses
- stronger fallback extraction when open-source models emit tool calls as markdown or malformed JSON
- broader context-window and reasoning-model heuristics for newer open-source models

## Current Status

OpenStream is **not** a standard OpenClaw skill today.

The current repository contains:

- patch files that replace parts of the OpenClaw Ollama runtime
- a helper installer for local evaluation
- lightweight validation scripts
- maintainer notes for a future OpenClaw core PR or plugin rewrite

The current product shape is therefore:

- suitable for evaluating a core PR direction
- not yet suitable for ClawHub submission
- not yet packaged as an OpenClaw plugin

If the long-term goal is official OpenClaw inclusion, the most credible path is:

1. prove the runtime changes with tests and reproducible validation
2. submit the smallest viable core PR
3. evaluate whether the remaining behavior can move into a plugin

Details:

- [docs/architecture.md](docs/architecture.md)
- [docs/why-core.md](docs/why-core.md)

## What Changes

The current patch set touches the Ollama runtime behavior rather than task-level skills.

Primary areas:

- `references/patches/ollama-stream.ts`
  improves streaming assembly and fallback handling for malformed tool-call output
- `references/patches/ollama-models.ts`
  extends model heuristics and context-window detection
- `references/patches/config-utils.ts`
  adds config loading used by the patch installer flow

These are runtime concerns, which is why this repo should be judged as a core/platform proposal first, not as a skill bundle.

## Repository Layout

- [references/patches/](references/patches/)
  canonical patch files under evaluation
- [install-patch.sh](install-patch.sh)
  local helper that copies the patch files into an OpenClaw checkout
- [test-openstream.sh](test-openstream.sh)
  lightweight repository validation
- [docs/architecture.md](docs/architecture.md)
  system boundaries and change surface
- [docs/why-core.md](docs/why-core.md)
  rationale for core-first packaging
- [PR_DESCRIPTION.md](PR_DESCRIPTION.md)
  maintainer-facing PR draft

## Evaluation Flow

Use this repo when you want to inspect or trial the proposed runtime behavior in a local OpenClaw checkout.

### 1. Validate the repository contents

```bash
bash ./test-openstream.sh
```

### 2. Apply the patch to an OpenClaw checkout

```bash
./install-patch.sh /path/to/openclaw
```

Optional flags:

```bash
./install-patch.sh --enable-mega-context /path/to/openclaw
./install-patch.sh --streaming-mode enhanced /path/to/openclaw
```

### 3. Rebuild OpenClaw

```bash
cd /path/to/openclaw
pnpm build
```

### 4. Manually verify behavior

Suggested checks:

- confirm streaming emits partial output smoothly for Ollama-backed responses
- confirm malformed markdown/json tool calls are either recovered or surfaced cleanly
- confirm larger context heuristics are applied only to intended model families
- compare behavior against an unpatched baseline on the same OpenClaw revision

## Important Limits

This repo is intentionally conservative about claims at this stage.

- It does **not** yet include reproducible benchmark data for the percentages previously claimed.
- It does **not** yet include automated integration tests against a pinned OpenClaw revision.
- It does **not** yet offer a plugin package or a ClawHub-ready artifact.
- It currently depends on replacing upstream files, which is a temporary evaluation model rather than a preferred long-term distribution model.

## What Would Make This Collectable by OpenClaw

OpenClaw maintainers will likely need:

- a pinned compatibility target against a specific OpenClaw revision
- real automated tests for streaming, fallback extraction, and model heuristics
- a narrower PR surface than "general runtime supercharger" framing
- evidence-backed benchmarks or replay fixtures
- a clear answer to whether the final shape belongs in core or in a plugin

This repository is now optimized around that maintainer review path rather than around direct skill submission.

## License

MIT
