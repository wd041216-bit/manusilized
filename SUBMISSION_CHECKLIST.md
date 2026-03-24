# OpenStream Acceptance Checklist

This checklist tracks the path to eventual OpenClaw inclusion.

## Track A: OpenClaw Core PR

- [ ] Pin the proposal to a specific OpenClaw revision
- [ ] Reduce the patch surface to the minimum required runtime changes
- [ ] Add automated tests for:
  - [ ] streaming assembly
  - [ ] malformed tool-call fallback
  - [ ] context-window heuristics
- [ ] Add at least one reproducible validation fixture or transcript
- [ ] Replace unsupported performance claims with measured results
- [ ] Rewrite PR description for maintainer review

## Track B: Plugin Feasibility

- [ ] Identify which behaviors can move behind plugin hooks or provider wrappers
- [ ] Prototype a non-destructive install path
- [ ] Confirm whether OpenClaw plugin APIs can host the streaming and fallback behavior
- [ ] Compare core PR and plugin maintenance cost

## Track C: ClawHub Eligibility

Only revisit this track if OpenStream becomes:

- a real plugin package
or
- a companion skill that documents and configures an already accepted runtime capability

Before any ClawHub submission:

- [ ] stable install surface exists
- [ ] security/rollback story is documented
- [ ] public docs match the real package shape
- [ ] validation goes beyond repository self-checks
