# Quick Start Guide: Morph Theme Variants

**Purpose**: Get started with developing and testing Morph theme variants for VS Code  
**Created**: 2025-11-18  
**Feature**: Theme Variants (002-theme-variants)

## Prerequisites

### Development Environment
- **VS Code**: Version 1.70 or later
- **Node.js**: Version 18 or later  
- **npm**: Version 9 or later
- **Git**: For version control

### VS Code Extensions for Development
- **Extension Development Host**: Built into VS Code
- **Color Highlight**: For visual color validation
- **Theme Designer**: Optional, for theme editing

## Setup Instructions

### 1. Clone and Setup Repository
```bash
git clone <repository-url>
cd git-morph-extension-for-vscode
git checkout 002-theme-variants
npm install
```

### 2. Development Environment
```bash
# Install dependencies
npm install

# Run tests to verify setup
npm test

# Run linting to check code quality
npm run lint
```

### 3. Launch Extension Development Host
1. Open the project in VS Code
2. Press `F5` or go to `Run > Start Debugging`
3. This launches a new VS Code window (Extension Development Host)
4. The Morph extension will be loaded in this window

## Theme Development Workflow

### 1. Create Theme Variants
```bash
# Theme files are located in src/themes/
ls src/themes/
# morph-theme.json (existing dark theme)
# morph-light.json (to be created)
# morph-dark.json (to be created)
```

### 2. Theme File Structure
Each theme file follows this structure:
```json
{
  "name": "Morph Light",
  "type": "light",
  "colors": {
    "editor.background": "#ffffff",
    "editor.foreground": "#333333"
  },
  "tokenColors": [
    {
      "name": "Comments",
      "scope": ["comment"],
      "settings": {
        "foreground": "#6A9955"
      }
    }
  ]
}
```

### 3. Update Package.json Configuration
```json
{
  "contributes": {
    "themes": [
      {
        "label": "Morph Light",
        "uiTheme": "vs",
        "type": "light",
        "path": "./src/themes/morph-light.json"
      },
      {
        "label": "Morph Dark",
        "uiTheme": "vs-dark", 
        "type": "dark",
        "path": "./src/themes/morph-dark.json"
      }
    ]
  }
}
```

## Testing Your Themes

### 1. Manual Testing
1. Launch Extension Development Host (`F5`)
2. Open a `.morph` file in the new window
3. Press `Ctrl+K Ctrl+T` to open theme picker
4. Select "Morph Light" or "Morph Dark"
5. Verify syntax highlighting works correctly

### 2. Automatic Theme Switching Test
1. In Extension Development Host, go to `File > Preferences > Color Theme`
2. Select a light VS Code theme (e.g., "Light+")
3. Verify Morph Light theme is automatically applied
4. Select a dark VS Code theme (e.g., "Dark+")
5. Verify Morph Dark theme is automatically applied

### 3. Contrast Validation
```bash
# Run contrast validation tests
npm run test:contrast

# Run full accessibility tests
npm run test:accessibility

# Run complete theme validation
npm run validate:theme
```

## Color Palette Guidelines

### Light Theme Colors
```json
{
  "placeholder": {
    "data": "#0066CC",      // Blue for data
    "action": "#9900CC",    // Purple for actions
    "name": "#008800",      // Green for names
    "separator": "#CC6600", // Orange for separators
    "braces": "#CC0000"     // Red for braces
  }
}
```

### Dark Theme Colors
```json
{
  "placeholder": {
    "data": "#4FC3F7",      // Light blue for data
    "action": "#CE93D8",    // Light purple for actions
    "name": "#81C784",      // Light green for names
    "separator": "#FFB74D", // Light orange for separators
    "braces": "#E57373"     // Light red for braces
  }
}
```

## Validation Requirements

### Contrast Ratios
- **WCAG AA**: Minimum 4.5:1 contrast ratio
- **WCAG AAA**: Recommended 7:1 contrast ratio
- **Critical Elements**: Editor foreground/background, syntax highlighting

### Colorblind Accessibility
- Avoid red/green combinations
- Use blue/yellow or magenta/cyan combinations
- Test with colorblind simulators
- Include texture/patterns when possible

### Performance Requirements
- Theme switching: < 100ms
- File size: < 50KB per theme
- Memory usage: < 10MB total

## Common Development Tasks

### Adding New Syntax Elements
1. Identify the TextMate scope for the element
2. Add color rule to `tokenColors` array
3. Test with sample `.morph` files
4. Validate contrast ratios

### Updating Color Palette
1. Modify colors in theme files
2. Run contrast validation
3. Test in both light and dark themes
4. Verify colorblind accessibility

### Debugging Theme Issues
1. Check VS Code Developer Tools (`Help > Toggle Developer Tools`)
2. Inspect applied colors in Elements panel
3. Verify theme file syntax is valid JSON
4. Check console for error messages

## Testing Checklist

### Before Committing
- [ ] Both theme variants load without errors
- [ ] Automatic theme switching works
- [ ] Manual theme selection works
- [ ] All contrast ratios meet WCAG AA
- [ ] Colorblind accessibility tested
- [ ] Performance requirements met
- [ ] No console errors or warnings
- [ ] All syntax elements highlighted correctly

### Before Release
- [ ] Full test suite passes (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Accessibility validation passes
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Version number incremented

## Troubleshooting

### Common Issues

**Theme not appearing in picker**
- Check package.json theme configuration
- Verify theme file paths are correct
- Ensure theme files are valid JSON

**Automatic switching not working**
- Verify "type" property is set correctly
- Check VS Code version (1.70+ required)
- Test with different VS Code themes

**Poor contrast ratios**
- Use contrast validation tools
- Adjust colors to meet 4.5:1 minimum
- Test with online contrast checkers

**Performance issues**
- Optimize theme file size
- Remove unused color rules
- Test theme switching speed

### Getting Help
- Check VS Code Extension API documentation
- Review existing theme extensions for examples
- Use VS Code Developer Tools for debugging
- Consult accessibility guidelines for color choices

## Next Steps

1. **Create light theme variant** based on existing dark theme
2. **Update package.json** with both theme configurations
3. **Test automatic switching** functionality
4. **Validate accessibility** requirements
5. **Run performance tests** and optimize
6. **Document any customizations** for future maintenance

## Resources

- [VS Code Theme Documentation](https://code.visualstudio.com/api/extension-guides/color-theme)
- [TextMate Grammar Guide](https://manual.macromates.com/en/language_grammars)
- [WCAG Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Colorblind Accessibility Guide](https://webaim.org/articles/visual/colorblind/)
