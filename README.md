# OpenStream

OpenStream is now packaged as an OpenClaw companion plugin plus a maintainer-facing core bridge for deeper Ollama runtime improvements.

It focuses on three concrete areas:

- smoother incremental streaming for Ollama-backed responses
- stronger fallback extraction when open-source models emit tool calls as markdown or malformed JSON
- broader context-window and reasoning-model heuristics for newer open-source models

## Current Status

OpenStream is **not** a standard task skill. It is now a native OpenClaw plugin for diagnostics/guidance, plus a core bridge for deeper runtime behavior changes.

The current repository contains:

- a native OpenClaw plugin (`openclaw.plugin.json`, `index.ts`, `skills/`)
- patch files that replace parts of the OpenClaw Ollama runtime
- a helper installer for local evaluation
- lightweight validation scripts
- maintainer notes for a future OpenClaw core PR or plugin rewrite

The current product shape is therefore:

- suitable for OpenClaw plugin collection as a companion plugin
- suitable for evaluating a smaller core PR direction for deeper runtime hooks
- no longer pretending that a ClawHub-style task skill is the right abstraction

If the long-term goal is official OpenClaw inclusion, the most credible path is:

1. ship the companion plugin as the stable install surface
2. prove the remaining runtime changes with tests and reproducible validation
3. submit the smallest viable core PR or provider-hook request
4. move more logic from patch files into plugin space over time

Details:

- [docs/architecture.md](docs/architecture.md)
- [docs/why-core.md](docs/why-core.md)
- [docs/plugin-mode.md](docs/plugin-mode.md)
- [docs/compatibility-matrix.md](docs/compatibility-matrix.md)
- [docs/validation-plan.md](docs/validation-plan.md)

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

- [openclaw.plugin.json](openclaw.plugin.json)
  native OpenClaw plugin manifest
- [index.ts](index.ts)
  plugin entry that registers commands, tools, and prompt guidance
- [skills/openstream/SKILL.md](skills/openstream/SKILL.md)
  plugin-shipped skill for Ollama/OpenStream diagnosis
- [references/patches/](references/patches/)
  canonical patch files under evaluation
- [install-patch.sh](install-patch.sh)
  local helper that copies the patch files into an OpenClaw checkout
- [test-openstream.sh](test-openstream.sh)
  lightweight repository validation
- [scripts/check-openclaw-target.sh](scripts/check-openclaw-target.sh)
  validates a candidate OpenClaw checkout before patching
- [scripts/generate-openclaw-diff.sh](scripts/generate-openclaw-diff.sh)
  produces unified diffs for maintainer review
- [docs/architecture.md](docs/architecture.md)
  system boundaries and change surface
- [docs/why-core.md](docs/why-core.md)
  rationale for the remaining core-first surface
- [docs/plugin-mode.md](docs/plugin-mode.md)
  what is now plugin-native versus still core-bound
- [docs/compatibility-matrix.md](docs/compatibility-matrix.md)
  current compatibility contract and baseline expectations
- [docs/validation-plan.md](docs/validation-plan.md)
  evidence required before formal maintainer submission
- [PR_DESCRIPTION.md](PR_DESCRIPTION.md)
  maintainer-facing PR draft

## Plugin Quickstart

Use the plugin surface when you want something installable, reviewable, and collection-friendly.

### 1. Validate the repository contents

```bash
bash ./test-openstream.sh
```

### 2. Install the plugin locally into OpenClaw

```bash
openclaw plugins install /absolute/path/to/openstream
openclaw plugins enable openstream
openclaw plugins info openstream
```

### 3. Use the plugin

```bash
/openstream doctor
/openstream model qwen3:latest
/openstream sample-config
```

The plugin currently provides:

- `openstream` command
- `openstream_doctor` tool
- plugin-shipped skill guidance
- cached prompt guidance via `before_prompt_build`

On current OpenClaw hosts, local-path install may copy the plugin first and require a separate `openclaw plugins enable openstream` step before the allowlist picks it up.

## Runtime Bridge Evaluation Flow

Use this repo when you want to inspect or trial the proposed runtime behavior in a local OpenClaw checkout.

### 1. Validate the repository contents

```bash
bash ./test-openstream.sh
```

### 2. Apply the patch to an OpenClaw checkout

```bash
./scripts/check-openclaw-target.sh /path/to/openclaw
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

### 5. Generate maintainer-facing diffs

```bash
./scripts/generate-openclaw-diff.sh /path/to/openclaw
```

## Important Limits

This repo is intentionally conservative about claims at this stage.

- The plugin surface is real, but it does **not** yet replace the raw Ollama stream/parser path.
- It does **not** yet include reproducible benchmark data for the percentages previously claimed.
- It does **not** yet include automated integration tests against a pinned OpenClaw revision.
- The deepest runtime behavior still depends on replacing upstream files, which is a temporary bridge rather than the preferred long-term distribution model.

## What Would Make This Collectable by OpenClaw

OpenClaw maintainers will likely need:

- a native plugin surface that feels installable and reviewable
- a pinned compatibility target against a specific OpenClaw revision
- real automated tests for streaming, fallback extraction, and model heuristics
- a narrower PR surface than "general runtime supercharger" framing
- evidence-backed benchmarks or replay fixtures
- a clear answer to which behavior belongs in plugin space versus core/runtime hooks

This repository is now optimized around that maintainer review path while also offering a collection-friendly companion plugin.

## License

MIT
