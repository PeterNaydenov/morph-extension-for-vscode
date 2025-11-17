# Morph Syntax Highlighting Extension

A VS Code extension that provides syntax highlighting for `.morph` template files with special emphasis on:

- **Placeholders** - `{{variable}}` syntax with distinct colors
- **Sections** - Different backgrounds for script, style, and handshake sections
- **Functions** - Highlighted function and constant names
- **Operators** - Special morph operators (`>`, `[]`, `^`, `?`, `+`)

## Features

### Placeholder Highlighting

- `{{variable}}` - Blue background with bold text
- `{{variable : helper1, helper2}}` - Different colors for variables vs helpers
- `{{@all}}` and `{{@root}}` - Special control keywords
- Morph operators (`>`, `[]`, `^`, `?`, `+`) - Purple and bold

### Section Differentiation

- **Template section** - Standard HTML highlighting
- **Script section** - Darker background with JavaScript highlighting
- **Style section** - Medium-dark background with CSS highlighting
- **Handshake section** - Darkest background with JSON highlighting

### Function/Variable Highlighting

- `function myFunc()` - Bold orange highlighting
- `const myVar` - Bold blue highlighting
- Enhanced visibility for declarations

## Installation

### Development Installation

1. Clone this repository
2. Navigate to the extension directory:
   ```bash
   cd vscode-morph-extension
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Open VS Code and press `F5` to launch a new Extension Development Host window
6. Open a `.morph` file to test the syntax highlighting

### Production Installation

1. Package the extension:
   ```bash
   npm install -g vsce
   vsce package
   ```
2. Install the `.vsix` file in VS Code:
   ```bash
   code --install-extension morph-syntax-highlighting-*.vsix
   ```

## Usage

Once installed, `.morph` files will automatically get syntax highlighting. The extension recognizes:

- Morph placeholders: `{{variable}}`, `{{variable : helper}}`, `{{@all}}`
- Script sections: `<script>...</script>`
- Style sections: `<style>...</style>`
- Handshake sections: `<script type="application/json">...</script>`
- Function declarations: `function name()`
- Variable declarations: `const name`, `let name`, `var name`

## Customization

You can customize the colors by adding this to your VS Code `settings.json`:

```json
{
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "meta.placeholder.morph",
        "settings": {
          "foreground": "#your-color",
          "background": "#your-bg-color"
        }
      }
    ]
  }
}
```

## Development

The extension is built with:

- **TypeScript** for the extension logic
- **TextMate Grammar** for syntax highlighting
- **JSON Theme** for color customization

Key files:

- `syntaxes/morph.tmLanguage.json` - Main syntax grammar
- `themes/morph-theme.json` - Color theme definitions
- `src/extension.ts` - Extension entry point

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `F5` in VS Code
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
