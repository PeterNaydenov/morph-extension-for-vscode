# Research: Morph Syntax Highlighting Implementation

**Date**: 2025-11-17  
**Feature**: Morph Syntax Highlighting for VS Code

## TextMate Grammar Implementation

### Decision: Use TextMate grammar (.tmLanguage.json) with Oniguruma regex patterns
**Rationale**: VS Code's native syntax highlighting system, proven performance, extensive community support
**Alternatives considered**: Semantic tokens API (more complex for basic highlighting), custom parser (overkill for this use case)

### Key Grammar Structure
- Scope name: `source.morph`
- Repository pattern for reusability
- Separate patterns for each section type (script, style, template)
- Placeholder-specific patterns with colon-separated section handling

## VS Code Extension Architecture

### Decision: Standard VS Code extension structure with language contributions
**Rationale**: Follows VS Code conventions, ensures compatibility, simplifies distribution
**Alternatives considered**: Language Server Protocol (unnecessary overhead), standalone tool (not integrated)

### Essential Components
- `package.json` with language and grammar contributions
- `syntaxes/morph.tmLanguage.json` for grammar definition
- `language-configuration.json` for editor behavior
- Activation event: `onLanguage:morph`

## Performance Optimization Strategy

### Decision: Optimized regex patterns with lazy loading
**Rationale**: Meets 16ms target for 100KB files, minimal memory footprint
**Alternatives considered**: Semantic highlighting (more complex), WebAssembly parsing (overkill)

### Key Techniques
- Atomic groups and possessive quantifiers to prevent backtracking
- Simple, specific patterns over complex nested matches
- Lazy loading with activation events
- Performance testing with large files

## Accessibility & Color Theme Integration

### Decision: WCAG AA compliant color schemes with theme integration
**Rationale**: Ensures accessibility, leverages VS Code's theme system
**Alternatives considered**: Fixed color schemes (not theme-aware), custom theming (complex)

### Implementation Approach
- 4.5:1 contrast minimum for normal text
- Colorblind-friendly palettes
- Integration with VS Code's existing theme system
- Both light and dark theme support

## Error Handling Strategy

### Decision: Graceful degradation using default VS Code behavior
**Rationale**: Consistent user experience, leverages existing error handling
**Alternatives considered**: Custom error highlighting (complex), silent failures (poor UX)

### Approach
- Template section: HTML error handling
- Script sections: JavaScript/JSON error handling
- Malformed tags: Default VS Code behavior for each content type

## Testing Framework

### Decision: VS Code test runner with vscode-tmgrammar-test
**Rationale**: Comprehensive testing, VS Code native, community validation
**Alternatives considered**: Manual testing only (insufficient), custom test framework (reinvention)

### Test Coverage
- Grammar pattern validation
- Performance benchmarking (16ms target)
- Accessibility compliance (contrast ratios)
- Edge case handling (malformed content)

## Performance Benchmarks

### Targets from Constitution
- Initial load: <50ms
- Typing response: <10ms (targeting 16ms for 100KB files)
- Memory usage: <10MB

### Validation Approach
- Automated performance testing
- Large file benchmarking (100KB+)
- Memory profiling during operation
- Tokenization time measurement

## Implementation Dependencies

### Core Technologies
- TypeScript 5.x (VS Code standard)
- VS Code Extension API
- TextMate grammar format
- Oniguruma regex engine

### Development Tools
- VS Code Extension Development Host
- vscode-tmgrammar-test for grammar validation
- Mocha test framework
- Performance profiling tools

## Risk Mitigation

### Performance Risks
- Complex regex patterns causing backtracking
- Large file parsing performance
- Memory usage optimization

### Mitigation Strategies
- Regex pattern optimization
- Performance testing at multiple file sizes
- Memory usage monitoring
- Gradual complexity increase

### Accessibility Risks
- Insufficient contrast ratios
- Colorblind compatibility issues

### Mitigation Strategies
- Automated contrast validation
- Colorblind simulator testing
- Multiple theme variant support
- Community feedback integration