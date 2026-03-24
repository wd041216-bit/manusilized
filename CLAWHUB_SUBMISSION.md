# ClawHub Status

OpenStream is **not ready for ClawHub submission in its current form**.

Why:

- the repository modifies OpenClaw runtime files directly
- it is not packaged as a standard skill bundle
- it is not yet packaged as an installable plugin
- its current validation surface is still too weak for marketplace-style distribution

## What must be true before ClawHub is reconsidered

- the runtime behavior is either accepted into OpenClaw core, or isolated behind a supported plugin boundary
- the package has a stable install surface
- validation includes reproducible tests instead of file-presence checks alone
- README and submission copy make only evidence-backed claims

## Preferred next step

Pursue OpenClaw core acceptance first.

If later refactored into a plugin, revisit ClawHub with:

- plugin manifest
- installation instructions
- compatibility matrix
- rollback notes
- benchmark-backed validation
