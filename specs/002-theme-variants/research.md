# Research Findings: Morph Theme Variants

**Created**: 2025-11-18  
**Feature**: Theme Variants for VS Code Extension

## VS Code Theme Type Detection API

### Decision: Use VS Code's built-in theme type detection with "type" property

**Rationale**: VS Code automatically selects themes based on the "type" property ("light" or "dark") when users change their UI theme. This is the standard, well-documented approach used by popular theme extensions.

**Implementation**:
```json
{
  "contributes": {
    "themes": [
      {
        "label": "Morph Light",
        "uiTheme": "vs",
        "type": "light",
        "path": "./themes/morph-light.json"
      },
      {
        "label": "Morph Dark", 
        "uiTheme": "vs-dark",
        "type": "dark",
        "path": "./themes/morph-dark.json"
      }
    ]
  }
}
```

**Alternatives Considered**:
- Programmatic theme switching via Extension API (more complex, unnecessary)
- Single theme with dynamic color adjustment (limited user control)

## Theme Registration Best Practices

### Decision: Standalone theme files with shared color palette generation

**Rationale**: Standalone themes provide better distribution, user customization, and maintenance. Shared palette generation ensures consistency while allowing independent optimization.

**Directory Structure**:
```
src/
├── themes/
│   ├── morph-light.json
│   ├── morph-dark.json
│   └── _palette.json (shared colors)
└── scripts/
    └── generate-themes.js
```

**Best Practices**:
- Each theme file contains complete color definitions
- Use semantic naming (morph-light, morph-dark)
- Include semantic token colors for modern VS Code
- Support high contrast variants

## Color Contrast Validation Tools

### Decision: Automated CLI tools integrated into npm test workflow

**Rationale**: Automated testing ensures consistent WCAG compliance and catches regressions early.

**Selected Tools**:
- **`color-contrast-checker`** - WCAG 2.1 AA/AAA compliance checking
- **`@lhci/cli`** - Lighthouse CI for accessibility testing
- **Custom validation script** - Theme-specific color testing

**Implementation**:
```json
{
  "scripts": {
    "test:contrast": "node scripts/check-contrast.js",
    "test:accessibility": "lhci autorun --config=.lighthouserc.js",
    "validate:theme": "npm run test:contrast && npm run test:accessibility"
  }
}
```

## Colorblind-Friendly Palette Generation

### Decision: Use colorblind-safe color palette with texture/pattern fallbacks

**Rationale**: Ensures accessibility for users with color vision deficiencies while maintaining visual distinction.

**Safe Color Palette**:
- Primary: Purple (#6750A4) - colorblind safe
- Secondary: Blue (#02569B) - universally accessible
- Success: Dark Green (#146C2E) - sufficient contrast
- Warning: Amber (#7D5700) - distinct from red/green
- Error: Dark Red (#BA1A1A) - high contrast

**Validation Tools**:
- Coblis colorblind simulator
- Color Oracle for system-wide testing
- Adobe Color accessibility checker

## Performance Optimization

### Decision: Optimize theme file size and implement lazy loading

**Rationale**: Ensures theme switching within 100ms requirement and minimal extension footprint.

**Optimization Strategies**:
- Minimize theme file sizes (< 50KB per theme)
- Use JSON compression for distribution
- Implement efficient color definitions
- Cache parsed theme data

**Performance Targets**:
- Theme switching: < 100ms
- Extension load time: < 500ms
- Memory usage: < 10MB for theme data

## Error Handling Approach

### Decision: Graceful fallback with user notification

**Rationale**: Provides good user experience when theme switching fails or APIs are unavailable.

**Implementation Strategy**:
- Try-catch blocks around theme switching logic
- Fallback to VS Code default theme
- User notification via VS Code notification system
- Logging for debugging purposes

## Manual Override Implementation

### Decision: Use VS Code's built-in theme picker with custom labels

**Rationale**: Leverages VS Code's native theme selection interface, providing familiar user experience.

**Implementation**:
- Register both themes as separate options in package.json
- Allow manual selection via VS Code theme picker
- Persist user selection in VS Code settings
- Provide "Auto" option for automatic switching

## Version Compatibility

### Decision: Target VS Code 1.70+ for theme type detection stability

**Rationale**: VS Code 1.70 introduced stable theme type detection API, ensuring reliable automatic switching.

**Compatibility Matrix**:
- VS Code 1.70+: Full feature support
- VS Code 1.60-1.69: Manual selection only
- VS Code < 1.60: Not supported

## Testing Strategy

### Decision: Multi-layered testing approach

**Testing Layers**:
1. **Unit Tests**: Contrast ratio validation
2. **Integration Tests**: VS Code API interactions
3. **Accessibility Tests**: WCAG compliance
4. **Performance Tests**: Theme switching speed
5. **User Acceptance Tests**: Real-world scenarios

**Test Automation**:
- Pre-commit hooks for theme validation
- CI/CD pipeline for automated testing
- Manual testing with colorblind simulators

## Implementation Risks and Mitigations

### Low Risk Items
- VS Code API compatibility (well-documented)
- Theme file structure (existing pattern)
- Color contrast validation (established tools)

### Medium Risk Items
- Performance optimization (requires benchmarking)
- Colorblind accessibility (requires thorough testing)

### Mitigation Strategies
- Incremental implementation with testing at each step
- Performance benchmarking and optimization
- Comprehensive accessibility testing with real users

## Summary

All research areas have been thoroughly investigated with clear decisions made for each unknown. The implementation approach follows VS Code extension best practices and ensures accessibility, performance, and maintainability.

**Key Decisions**:
1. Use VS Code's built-in theme type detection
2. Standalone theme files with shared palette generation
3. Automated CLI tools for contrast validation
4. Colorblind-safe color palette
5. Performance optimization with < 100ms switching
6. Graceful error handling with fallback
7. VS Code 1.70+ compatibility target
8. Multi-layered testing strategy

The research phase is complete and ready for implementation planning.
