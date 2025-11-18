# Data Model: Morph Theme Variants

**Created**: 2025-11-18  
**Feature**: Theme Variants for VS Code Extension

## Theme Configuration Entity

### ThemeVariant
```typescript
interface ThemeVariant {
  name: string;           // "Morph Light" | "Morph Dark"
  type: "light" | "dark";  // Theme type for auto-switching
  uiTheme: "vs" | "vs-dark"; // VS Code UI theme
  path: string;           // File path to theme JSON
  label: string;          // Display name in theme picker
}
```

### ThemeConfiguration
```typescript
interface ThemeConfiguration {
  variants: ThemeVariant[];     // Available theme variants
  autoSwitching: boolean;       // Enable automatic switching
  manualOverride: string | null; // Manually selected theme
  fallbackTheme: string;        // Fallback theme on errors
  lastKnownTheme: string;       // Last applied theme for recovery
}
```

## Color Palette Entity

### ColorPalette
```typescript
interface ColorPalette {
  // Syntax highlighting colors
  placeholder: {
    data: string;      // Data placeholder color
    action: string;    // Action placeholder color  
    name: string;      // Named placeholder color
    separator: string; // Colon separator color
    braces: string;    // Brace delimiters color
  };
  
  // Language-specific colors
  javascript: {
    functions: string;
    variables: string;
    keywords: string;
    strings: string;
    comments: string;
  };
  
  css: {
    selectors: string;
    properties: string;
    values: string;
  };
  
  html: {
    tags: string;
    attributes: string;
  };
  
  json: {
    keys: string;
    values: string;
  };
  
  // Editor colors
  editor: {
    background: string;
    foreground: string;
    selection: string;
    lineHighlight: string;
  };
}
```

### ThemeColors
```typescript
interface ThemeColors {
  // Workbench colors (UI elements)
  workbench: {
    background: string;
    foreground: string;
    sideBarBackground: string;
    sideBarForeground: string;
    activityBarBackground: string;
    activityBarForeground: string;
    titleBarActiveBackground: string;
    titleBarActiveForeground: string;
  };
  
  // Token colors (syntax highlighting)
  tokenColors: TokenColorRule[];
  
  // Semantic token colors
  semanticTokenColors: {
    [tokenType: string]: string;
  };
}
```

## Token Color Rule Entity

### TokenColorRule
```typescript
interface TokenColorRule {
  name?: string;           // Human-readable name
  scope: string | string[]; // TextMate scope selectors
  settings: {
    foreground?: string;    // Text color
    background?: string;    // Background color
    fontStyle?: string;     // "bold", "italic", "underline"
  };
}
```

## Theme State Entity

### ThemeState
```typescript
interface ThemeState {
  currentTheme: string;     // Currently active theme
  isAutoSwitching: boolean; // Auto-switching enabled
  lastError: ThemeError | null; // Last error encountered
  performance: {
    switchTime: number;     // Last switch time in ms
    loadTime: number;       // Theme load time in ms
  };
}
```

### ThemeError
```typescript
interface ThemeError {
  code: string;            // Error code
  message: string;         // Error message
  timestamp: number;       // Error timestamp
  context?: any;          // Additional error context
}
```

## Validation Rules

### ContrastValidation
```typescript
interface ContrastValidation {
  foreground: string;      // Foreground color
  background: string;      // Background color
  ratio: number;          // Contrast ratio
  passesAA: boolean;      // WCAG AA compliance (4.5:1)
  passesAAA: boolean;     // WCAG AAA compliance (7:1)
  element: string;        // UI element name
}
```

### ThemeValidation
```typescript
interface ThemeValidation {
  themeName: string;       // Theme being validated
  contrastResults: ContrastValidation[]; // All contrast checks
  overallValid: boolean;   // Overall validation result
  issues: ValidationIssue[]; // Validation issues found
}
```

### ValidationIssue
```typescript
interface ValidationIssue {
  severity: "error" | "warning"; // Issue severity
  element: string;              // UI element with issue
  description: string;          // Issue description
  suggestion?: string;          // Suggested fix
}
```

## User Preferences Entity

### UserPreferences
```typescript
interface UserPreferences {
  autoSwitching: boolean;    // Enable automatic theme switching
  preferredTheme: string;    // User's preferred theme
  showNotifications: boolean; // Show theme change notifications
  enableFallback: boolean;   // Enable graceful fallback
  accessibilityMode: "standard" | "high-contrast" | "colorblind";
}
```

## Relationships

### Entity Relationships
```
ThemeConfiguration (1) -> (*) ThemeVariant
ThemeVariant (1) -> (1) ColorPalette
ColorPalette (1) -> (*) ThemeColors
ThemeColors (1) -> (*) TokenColorRule
ThemeState (1) -> (0..1) ThemeError
ThemeValidation (1) -> (*) ContrastValidation
ThemeValidation (1) -> (*) ValidationIssue
UserPreferences (1) -> (1) ThemeConfiguration
```

## State Transitions

### Theme Switching States
```
Initial -> Loading -> Applied
    |         |          |
    v         v          v
Error <- Fallback <- Manual
```

### State Transition Rules
1. **Initial**: Extension loads, reads configuration
2. **Loading**: Theme file being loaded and parsed
3. **Applied**: Theme successfully applied to VS Code
4. **Error**: Theme loading/application failed
5. **Fallback**: Fallback theme applied
6. **Manual**: User manually selected theme

## Data Validation Rules

### Theme File Validation
- Theme files must be valid JSON
- Required fields: name, type, colors, tokenColors
- Color values must be valid hex codes
- Contrast ratios must meet WCAG AA minimum (4.5:1)

### Configuration Validation
- Theme variants must have unique names
- File paths must exist and be accessible
- UI theme values must be valid VS Code values
- Type values must be "light" or "dark"

### Performance Validation
- Theme switching must complete within 100ms
- Theme files must be under 50KB
- Memory usage must stay under 10MB

## Storage Requirements

### Extension Storage
- Theme configuration: VS Code workspace settings
- User preferences: VS Code global settings
- Theme state: Extension context storage
- Error logs: Extension log files

### File System Storage
- Theme files: Extension directory (read-only)
- Generated themes: Build output directory
- Validation reports: Test output directory
- Performance metrics: Log files

## Security Considerations

### Data Protection
- No user data collection beyond theme preferences
- Theme files are static and read-only
- Error logs contain no sensitive information
- All data stored locally in VS Code extension storage

### Access Control
- Theme files accessible only to extension
- User preferences require explicit user action
- No network access required for theme switching
- No file system access beyond extension directory
