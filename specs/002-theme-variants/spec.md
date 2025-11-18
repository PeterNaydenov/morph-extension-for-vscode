# Feature Specification: Morph Theme Variants for VS Code

**Feature Branch**: `002-theme-variants`  
**Created**: 2025-11-18  
**Status**: Draft  
**Input**: User description: "Requirement: Provide both light and dark theme variants that automatically switch based on VS Code's main theme selection. Key Points: - Create two theme files: morph-dark-theme.json and morph-light-theme.json - Dark theme: \"uiTheme\": \"vs-dark\" + \"type\": \"dark\" - Light theme: \"uiTheme\": \"vs\" + \"type\": \"light\" - VS Code will auto-switch between themes based on user's main theme choice - Ensures proper contrast for users of both light (like Solarized) and dark themes - Prevents visual mismatch where dark syntax colors appear on light backgrounds"

## Clarifications

### Session 2025-11-18

- Q: Should the light and dark themes use the same color palette with adjusted brightness, or different color schemes? → A: Use the same color palette with adjusted brightness/luminance to maintain consistency while ensuring proper contrast
- Q: What should happen if a user manually selects a theme that doesn't match their VS Code UI theme? → A: Allow manual selection but provide visual indication of mismatch and recommend auto-switching
- Q: Should theme switching be immediate or require VS Code restart? → A: Theme switching should be immediate without requiring restart
- Q: What happens when theme switching fails or VS Code theme APIs are unavailable? → A: Graceful fallback to default theme with user notification
- Q: What minimum VS Code version should be supported for theme variants functionality? → A: VS Code 1.70+ (theme type detection stable)
- Q: Should the Morph themes inherit from existing VS Code themes or be completely standalone? → A: Completely standalone themes with full color definitions

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Automatic Theme Switching (Priority: P1)

As a developer using VS Code with different UI themes throughout the day, I want the Morph syntax highlighting to automatically switch between light and dark variants so I always have proper contrast and readability.

**Why this priority**: This is the core functionality that solves the visual mismatch issue and provides seamless user experience.

**Independent Test**: Can be fully tested by switching VS Code's main theme and verifying the Morph syntax theme automatically switches to match.

**Acceptance Scenarios**:

1. **Given** VS Code is set to a light UI theme, **When** I open a .morph file, **Then** the Morph light theme should be automatically applied
2. **Given** VS Code is set to a dark UI theme, **When** I open a .morph file, **Then** the Morph dark theme should be automatically applied
3. **Given** I switch VS Code from light to dark theme, **When** I have a .morph file open, **Then** the Morph syntax highlighting should immediately switch to the dark variant
4. **Given** I switch VS Code from dark to light theme, **When** I have a .morph file open, **Then** the Morph syntax highlighting should immediately switch to the light variant

---

### User Story 2 - Manual Theme Override (Priority: P2)

As a developer with specific preferences, I want to manually select either the light or dark Morph theme regardless of my VS Code UI theme so I can use my preferred color scheme.

**Why this priority**: Provides user flexibility and control while maintaining the auto-switching as default behavior.

**Independent Test**: Can be fully tested by manually selecting Morph themes and verifying they persist regardless of UI theme changes.

**Acceptance Scenarios**:

1. **Given** VS Code is set to a light UI theme, **When** I manually select the Morph dark theme, **Then** the dark theme should be applied and persist
2. **Given** VS Code is set to a dark UI theme, **When** I manually select the Morph light theme, **Then** the light theme should be applied and persist
3. **Given** I have manually selected a Morph theme, **When** I switch VS Code UI themes, **Then** my manual selection should remain active
4. **Given** I want to return to auto-switching, **When** I select the "Auto" Morph theme option, **Then** the theme should switch based on VS Code UI theme

---

### User Story 3 - Theme Consistency (Priority: P1)

As a developer working with Morph files, I want the light and dark theme variants to maintain visual consistency so code structure and syntax patterns remain recognizable across themes.

**Why this priority**: Ensures users don't lose familiarity when switching between themes and maintains productivity.

**Independent Test**: Can be fully tested by comparing the same file in both themes and verifying consistent color mapping.

**Acceptance Scenarios**:

1. **Given** a .morph file with helper functions, **When** I view it in both light and dark themes, **Then** function declarations should use the same color family (adjusted for contrast)
2. **Given** a .morph file with placeholders, **When** I view it in both themes, **Then** data, action, and named placeholders should maintain their distinct color relationships
3. **Given** a .morph file with mixed content types, **When** I switch between themes, **Then** the visual hierarchy and emphasis should remain consistent
4. **Given** both themes are applied, **When** I compare them side by side, **Then** the color palette should show clear relationship between light and dark variants

---

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST provide two theme variants: morph-light-theme.json and morph-dark-theme.json
- **FR-002**: System MUST configure light theme with "uiTheme": "vs" and "type": "light"
- **FR-003**: System MUST configure dark theme with "uiTheme": "vs-dark" and "type": "dark"
- **FR-004**: System MUST automatically switch theme variants based on VS Code's main UI theme selection
- **FR-005**: System MUST ensure proper contrast ratios (minimum 4.5:1) for both light and dark variants
- **FR-006**: System MUST maintain color palette consistency between light and dark variants
- **FR-007**: System MUST allow manual theme override independent of VS Code UI theme
- **FR-008**: System MUST provide immediate theme switching without requiring VS Code restart
- **FR-009**: System MUST prevent visual mismatch where dark syntax colors appear on light backgrounds
- **FR-010**: System MUST ensure both themes are colorblind-friendly and accessible
- **FR-011**: System MUST provide graceful fallback to default theme with user notification when theme switching fails

### Key Entities _(include if feature involves data)_

- **Light Theme Variant**: morph-light-theme.json with colors optimized for light backgrounds
- **Dark Theme Variant**: morph-dark-theme.json with colors optimized for dark backgrounds
- **Auto-Switching Logic**: VS Code's built-in theme type detection and automatic variant selection
- **Manual Override**: User's ability to select specific theme variant regardless of UI theme
- **Color Palette**: Consistent color family used across both variants with adjusted luminance

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of users experience automatic theme switching when changing VS Code UI themes
- **SC-002**: 95% of users report improved readability compared to single-theme implementation
- **SC-003**: Theme switching completes within 100ms for immediate visual feedback
- **SC-004**: Both light and dark variants maintain 4.5:1 minimum contrast ratios for all syntax elements
- **SC-005**: 90% of users can identify corresponding syntax elements between light and dark themes
- **SC-006**: Zero instances of visual mismatch reported where theme colors conflict with UI background
- **SC-007**: Manual theme override works correctly 100% of the time when selected by users

## Assumptions

- VS Code's theme switching mechanism supports automatic variant selection based on "type" property
- Users have VS Code version 1.70+ that supports theme type detection
- Existing morph-theme.json can be used as base for creating both variants
- Color adjustments for light/dark variants will be achieved through complete color definitions for each variant
- Extension package.json can properly register both theme variants for automatic detection

## Dependencies

- VS Code Extension API for theme registration and configuration
- Existing Morph syntax highlighting implementation (001-morph-syntax)
- VS Code's built-in theme type detection and switching mechanism
- Color contrast calculation tools for accessibility compliance
