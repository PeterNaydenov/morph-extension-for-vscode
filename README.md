<img src="header.png" alt="Morph Syntax Highlighting" >

[![Version](https://img.shields.io/badge/version-0.0.5-blue.svg)](https://github.com/PeterNaydenov/morph-extension-for-vscode/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue.svg)](https://marketplace.visualstudio.com/items?itemName=peternaydenov.morph-template-syntax-highlighting)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/PeterNaydenov/morph-extension-for-vscode/actions)
[![Downloads](https://img.shields.io/badge/downloads-100%2B-orange.svg)](https://marketplace.visualstudio.com/items?itemName=peternaydenov.morph-template-syntax-highlighting)

# Morph Syntax Highlighting for VS Code

A VS Code extension that provides syntax highlighting for .morph files used by @peter.naydenov/vite-plugin-morph with **light and dark theme variants**.

## Features

- **Theme Variants**: Light and dark themes with automatic switching
  - **Automatic Theme Switching**: VS Code UI theme integration
  - **Manual Theme Override**: User-selectable theme variants
  - **WCAG AA Compliant**: 4.5:1 contrast ratios for accessibility
  - **Colorblind Safe**: Optimized color palette for all users

- **Section Recognition**: Automatically detects and highlights four main sections:
  - Template content (HTML-like)
  - Helper functions (JavaScript)
  - Handshake data (JSON)
  - Styles (CSS)

- **Placeholder Highlighting**: Different colors for placeholder components:
  - **Light Theme**: Data (blue), Action (purple), Name (green)
  - **Dark Theme**: Data (teal), Action (purple), Name (yellow)
  - **Consistent Styling**: Bold, italic, underline for differentiation
  - **Clear Separators**: Distinct colors for colons and braces

- **Helper Function Visibility**: Clear highlighting for:
  - Function declarations
  - Variable declarations (var/let/const)
  - Class declarations
  - Arrow functions

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS)
3. Search for "Morph Syntax Highlighting"
4. Click "Install"

### Development Installation

1. Clone this repository
2. Navigate to extension directory:
   ```bash
   cd git-morph-extension-for-vscode
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Open VS Code and press `F5` to launch Extension Development Host
6. Open a `.morph` file to test syntax highlighting

### From VSIX File

1. Download the latest `.vsix` file from releases
2. Install via command line:
   ```bash
   code --install-extension morph-syntax-highlighting-*.vsix
   ```

## Usage

Create or open a `.morph` file and the extension will automatically apply syntax highlighting.

### Theme Selection

The extension provides two theme variants:

#### Automatic Theme Switching

- VS Code automatically selects the appropriate Morph theme based on your UI theme
- Light UI theme → Morph Light theme
- Dark UI theme → Morph Dark theme

#### Manual Theme Selection

1. Press `Ctrl+K Ctrl+T` (Windows/Linux) or `Cmd+K Cmd+T` (macOS)
2. Search for "Morph Light" or "Morph Dark"
3. Select your preferred theme
4. Your selection will persist regardless of VS Code UI theme changes

### Placeholder Syntax

Placeholders use three-section format: `{data:action:name}`

- `{::name}` - Named placeholder
- `{data::}` - Data-only placeholder
- `{::action}` - Action-only placeholder
- `{data:action:name}` - Complete placeholder

### Section Structure

```morph
<!-- Template Section (HTML-like with placeholders) -->
<div class="container">
  <h1>{{::title}}</h1>
  <p>{{content::}}</p>
</div>

<script>
// Helper Functions Section (JavaScript)
function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

const config = {
  theme: 'dark'
};
</script>

<script type="application/json">
// Handshake Section (JSON)
{
  "name": "my-component",
  "version": "1.0.0"
}
</script>

<style>
/* Style Section (CSS) */
.container {
  max-width: 1200px;
}

h1 {
  color: #333;
}
</style>
```

## Customization

You can customize colors in your VS Code `settings.json`:

```json
{
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "variable.other.data.morph",
        "settings": {
          "foreground": "#00ff00"
        }
      }
    ]
  }
}
```

## Development

```bash
npm install
npm run compile
npm test
npm run validate:theme  # Test contrast ratios
```

### Theme Development

```bash
# Test theme contrast
npm run test:contrast

# Validate both themes
npm run validate:theme

# Run full test suite
npm test
```

### Key Files

- `src/syntaxes/morph.tmLanguage.json` - TextMate grammar
- `src/themes/morph-light.json` - Light theme variant
- `src/themes/morph-dark.json` - Dark theme variant
- `src/extension.ts` - Extension entry point
- `package.json` - Extension manifest
- `scripts/check-contrast.js` - Contrast validation tool

## Performance

- **Fast Theme Switching**: < 100ms for theme changes
- **Optimized File Sizes**: 3KB per theme (well under 50KB limit)
- **Memory Efficient**: Minimal memory footprint
- **WCAG AA Compliant**: 4.5:1 contrast ratios for all colors
- **Colorblind Accessible**: Safe color palette for all users

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass: `npm test`
6. Submit a pull request

## Version

**Current Version**: 0.0.5

## License

MIT License - see [LICENSE](LICENSE) file for details.
