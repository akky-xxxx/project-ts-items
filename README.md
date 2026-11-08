# project-ts-items

A Bun workspaces monorepo for shared TypeScript development tool configurations.

## Packages

| Package                                                                        | Description          |
| ------------------------------------------------------------------------------ | -------------------- |
| [`@ts-items/oxfmt-config`](workspaces/packages/configurations/oxfmt-config/)   | Shared oxfmt config  |
| [`@ts-items/oxlint-config`](workspaces/packages/configurations/oxlint-config/) | Shared oxlint config |

See each package's README for installation and usage.

## Development

Requires [Bun](https://bun.com) and Node.js (version pinned in `.node-version`).

```bash
bun install      # Install dependencies (also sets up husky and builds packages)
bun check-code   # Run tests and lint for the root and all workspaces
bun a:fix        # Fix format / lint issues for the root and all workspaces
```

`bun check-code` runs the `website` Storybook tests in headless Chromium via Playwright. Install the browser before the first run and after updating `playwright`:

```bash
cd workspaces/applications/website
bunx playwright install chromium
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
