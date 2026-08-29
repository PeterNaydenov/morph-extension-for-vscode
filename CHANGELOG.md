# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [0.0.7] - 2026-08-29

### Changed

- **Dev dependencies**: Bumped `@biomejs/biome` 2.5.10 → 2.5.11, `@types/node` 26.2.0 → 26.4.0, `mocha` 11.7.5 → 11.8.0

### Fixed

- **Marketplace README**: Synced the version badge and "Current Version" text with the actually-published version. The 0.0.6 publish on 2026-08-23 went out with README still pointing at 0.0.5, so the Marketplace page was rendering a stale `Current Version: 0.0.5` until the next publish repaints the README.



## [0.0.6] - 2026-08-23

### Changed

- **Toolchain upgrade**: TypeScript 5.9 → 7.0.2, ESLint 9 → 10, Prettier 3.7 → 3.9, `@vscode/test-electron` 2 → 3, `@vscode/vsce` 3.7 → 3.9
- **Linter/Formatter**: Migrated from ESLint + Prettier to Biome 2.5 (single tool, faster runs)
- **Node imports**: Use `node:` protocol for built-in module imports
- **TypeScript config**: Explicit `types: ["node"]` (TS 7 no longer auto-injects node types)
- **Test config**: `forEach` callbacks now use block bodies where return values were being ignored

### Removed

- **TypeScript ESLint**: Dropped `@typescript-eslint/*` and `typescript-eslint` packages (incompatible with TypeScript 7)
- **ESLint config**: `eslint.config.js`, `.prettierrc.json`, `.prettierignore` removed
- **Lighthouse CI**: Dropped `@lhci/cli` and `.lighthouserc.js` (config pointed at `localhost:3000`, never matched this project)

### Security

- **Dependency overrides**: Pinned `diff ≥8.0.4` and `serialize-javascript ≥7.0.5` via npm overrides to address transitive vulnerabilities
- **Audit**: `npm audit` reports 0 vulnerabilities

### Added

- **Release workflow**: `.github/workflows/release.yml` triggered on `v*` tag push — runs lint + tests + contrast, packages `.vsix`, publishes to VS Code Marketplace (when `VSCE_PAT` secret is set), and creates a GitHub release with the `.vsix` attached

## [0.0.5] - 2025-11-18

### Added

- **Theme Variants**: Light and dark theme support
- **Automatic Theme Switching**: VS Code UI theme integration
- **Manual Theme Override**: User-selectable theme variants
- **Enhanced Accessibility**: WCAG AA compliance for both themes
- **Color Validation**: Automated contrast testing tools
- **Performance Optimization**: Fast theme switching (< 100ms)

### Changed

- **Theme Architecture**: Refactored to support multiple variants
- **Color Palette**: Optimized for both light and dark backgrounds
- **Package Configuration**: Updated theme contributions
- **Extension Description**: Updated to reflect theme variants

### Fixed

- **Contrast Issues**: Resolved low contrast in light theme
- **Color Accessibility**: Improved colorblind-friendly palette

## [0.0.4] - 2025-11-17

### Added

- Initial syntax highlighting for .morph files
- Section recognition (template, script, style, handshake)
- Placeholder highlighting with color differentiation
- Helper function visibility
- WCAG AA compliant color schemes

## [0.0.3] - 2025-11-17

### Added

- Complete TextMate grammar implementation
- Color theme with accessible contrast ratios
- Comprehensive test suite
- VS Code extension packaging

### Changed

- Updated package.json with proper language contributions
- Enhanced placeholder pattern matching

## [0.0.2] - 2025-11-17

### Added

- Basic extension structure
- Initial grammar definition
- Test framework setup

## [0.0.1] - 2025-11-17

### Added

- Project initialization
- Extension scaffolding
