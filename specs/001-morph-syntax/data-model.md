# Data Model: Morph Syntax Highlighting

**Date**: 2025-11-17  
**Feature**: Morph Syntax Highlighting for VS Code

## Overview

This data model defines the structure and validation rules for .morph file syntax highlighting. The model focuses on grammatical structure rather than data persistence, as this is a syntax highlighting feature.

## Core Entities

### MorphFile
The root entity representing a complete .morph file.

**Attributes:**
- `sections`: MorphSection[] - Ordered list of file sections
- `filename`: string - File name with .morph extension
- `size`: number - File size in bytes (for performance validation)

**Validation Rules:**
- Must have at least one section
- Total file size ≤ 100KB (performance requirement)
- Sections must be properly ordered (template → script → style)

### MorphSection
Abstract base class for different section types.

**Attributes:**
- `type`: SectionType - Enum: TEMPLATE, SCRIPT_HELPERS, SCRIPT_HANDSHAKE, STYLE
- `content`: string - Raw section content
- `startLine`: number - Line number where section begins
- `endLine`: number - Line number where section ends

**Validation Rules:**
- Content cannot be empty
- Line numbers must be within file bounds
- Section type must match content format

### TemplateSection
HTML-like content with placeholders.

**Attributes:**
- `inherited`: MorphSection (base attributes)
- `placeholders`: Placeholder[] - All placeholders found in content
- `htmlElements`: HTMLElement[] - HTML tags and attributes

**Validation Rules:**
- Placeholders must follow 3-section format: `{data:action:name}`
- Empty sections preserve colons: `{::name}`, `{data::}`, `{::action}`
- HTML elements must be well-formed (graceful degradation if not)

### ScriptHelpersSection
JavaScript code for helper functions and variables.

**Attributes:**
- `inherited`: MorphSection (base attributes)
- `functions`: FunctionDeclaration[] - Helper function definitions
- `variables`: VariableDeclaration[] - var/let/const declarations

**Validation Rules:**
- Must contain valid JavaScript syntax
- Functions and variables should be properly declared
- Handle mixed content edge cases (unclosed tags, nested quotes)

### ScriptHandshakeSection
JSON configuration data.

**Attributes:**
- `inherited`: MorphSection (base attributes)
- `jsonObject`: object - Parsed JSON content

**Validation Rules:**
- Must contain valid JSON syntax
- Should be parseable without errors
- Handle malformed JSON with default error behavior

### StyleSection
CSS styling rules.

**Attributes:**
- `inherited`: MorphSection (base attributes)
- `cssRules`: CSSRule[] - CSS selectors and declarations

**Validation Rules:**
- Must contain valid CSS syntax
- Selectors and properties should be well-formed
- Handle malformed CSS with default error behavior

## Supporting Entities

### Placeholder
Template placeholder with three colon-separated sections.

**Attributes:**
- `data`: string - Data section (may be empty)
- `action`: string - Action section (may be empty)  
- `name`: string - Name section (may be empty)
- `fullText`: string - Complete placeholder text including braces
- `position`: TextPosition - Location in file

**Validation Rules:**
- Must start with `{` and end with `}`
- Exactly 2 colons separating 3 sections
- Empty sections allowed but colons required
- Examples: `{::name}`, `{data::}`, `{::action}`, `{data:action:name}`

### TextPosition
Location information for text elements.

**Attributes:**
- `line`: number - Line number (0-based)
- `column`: number - Column number (0-based)
- `length`: number - Text length

### FunctionDeclaration
JavaScript function definition.

**Attributes:**
- `name`: string - Function name
- `parameters`: string[] - Parameter names
- `body`: string - Function body content
- `position`: TextPosition - Declaration location

### VariableDeclaration
JavaScript variable declaration.

**Attributes:**
- `name`: string - Variable name
- `type`: VariableType - Enum: VAR, LET, CONST
- `value`: string - Initial value (optional)
- `position`: TextPosition - Declaration location

## State Transitions

### File Parsing States
1. **INITIAL** - Start parsing file
2. **TEMPLATE** - Parsing template section
3. **SCRIPT_HELPERS** - Parsing helper script section
4. **SCRIPT_HANDSHAKE** - Parsing handshake JSON section
5. **STYLE** - Parsing CSS section
6. **COMPLETE** - File fully parsed

### Error Recovery States
- **RECOVERABLE** - Can continue parsing with default behavior
- **FATAL** - Cannot parse file (syntax too malformed)

## Performance Constraints

### Tokenization Performance
- Target: 16ms for 100KB files
- Memory usage: <10MB
- No blocking operations during editing

### Validation Performance
- Grammar validation: <5ms per file
- Placeholder extraction: <10ms per file
- Error detection: <5ms per file

## Accessibility Requirements

### Color Contrast
- Minimum 4.5:1 contrast ratio for normal text
- Colorblind-friendly palettes required
- Support both light and dark themes

### Visual Differentiation
- Data placeholders: Distinct hue 1
- Action placeholders: Distinct hue 2  
- Name placeholders: Distinct hue 3
- Colon separators: Visible but subtle

## Integration Points

### VS Code Extension API
- Language registration for .morph files
- Grammar contribution registration
- Theme integration points
- Performance monitoring hooks

### TextMate Grammar
- Scope name: `source.morph`
- Repository patterns for each entity type
- Capture groups for highlighting
- Error handling patterns

## Testing Requirements

### Unit Tests
- Entity validation rules
- State transition logic
- Performance benchmarks
- Accessibility compliance

### Integration Tests
- Complete file parsing
- VS Code extension integration
- Theme compatibility
- Error recovery scenarios

### Sample Data
- Basic .morph files with all sections
- Complex placeholder combinations
- Malformed content examples
- Large files for performance testing