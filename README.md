# Morph Syntax Highlighting

A VS Code extension that provides syntax highlighting for .morph files used by @peter.naydenov/vite-plugin-morph.

## Features

- **Section Recognition**: Automatically detects and highlights four main sections:
  - Template content (HTML-like)
  - Helper functions (JavaScript)
  - Handshake data (JSON)
  - Styles (CSS)

- **Placeholder Highlighting**: Different colors for placeholder components:
  - Data sections: Teal, bold
  - Action sections: Purple, italic
  - Name sections: Yellow, underline
  - Colon separators: Gold, bold
  - Braces: Red, bold

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
```

### Key Files

- `src/syntaxes/morph.tmLanguage.json` - TextMate grammar
- `src/themes/morph-theme.json` - Color theme
- `src/extension.ts` - Extension entry point
- `package.json` - Extension manifest

## Performance

- Targets 16ms response time for 100KB files
- Memory usage under 10MB
- WCAG AA compliant color schemes (4.5:1 contrast)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass: `npm test`
6. Submit a pull request

## License

MIT License - see LICENSE file for details.
