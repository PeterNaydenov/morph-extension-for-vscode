# Feature Specification: Morph Syntax Highlighting for VS Code

**Feature Branch**: `001-morph-syntax`  
**Created**: 2025-11-17  
**Status**: Draft  
**Input**: User description: "I need to create a syntax definition color theme for visualstudio code. It's should recognize sections described in @peter.naydenov/vite-plugin-morph. It's a text based file like html. <script> tag section without type is place to define helpers - function helpers and var/let/const - template helpers. <script type="application/json"> is for handshake section. Template should be like html (no tags arround them). <style> is for CSS. Starting point for colors is default html, css and json color styles. Latter on I could change them for better readability. I want to see where are the helper definitions. I want to see placeholder well. Data, actions, and placeholder optional name should render in different colors. They are separated by :."

## Clarifications

### Session 2025-11-17

- Q: What is the exact syntax pattern for data, action, and named placeholders? → A: Placeholders have 3 sections separated by :, empty sections keep the : separator (e.g., {::name} for named placeholder with no data/action)
- Q: How should the syntax highlighter respond to malformed or incomplete tags? → A: Use default behavior for each section type (HTML errors for template, JavaScript errors for script, JSON errors for JSON script)
- Q: What specific mixed content scenarios need to be handled in script sections? → A: Handle common edge cases: unclosed tags, nested quotes, template literals with placeholder-like syntax
- Q: What is the acceptable performance threshold for syntax highlighting? → A: 16ms (60fps) response time for 100KB files
- Q: How should colors be differentiated to ensure both visual distinction and accessibility? → A: Use distinct hues with 4.5:1 contrast minimum, colorblind-friendly

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Basic Morph File Syntax Recognition (Priority: P1)

As a developer working with vite-plugin-morph files, I want VS Code to recognize and properly syntax highlight the different sections of my morph files so I can easily distinguish between helpers, handshake data, templates, and styles.

**Why this priority**: This is the foundational capability that enables all other syntax highlighting features and provides immediate value to users.

**Independent Test**: Can be fully tested by opening a .morph file in VS Code and verifying that each section (script tags, style tags, template content) receives appropriate syntax highlighting.

**Acceptance Scenarios**:

1. **Given** a morph file with `<script>` section without type, **When** I open the file in VS Code, **Then** the section should be highlighted as JavaScript with helper functions and variables clearly visible
2. **Given** a morph file with `<script type="application/json">` section, **When** I open the file, **Then** the section should be highlighted as JSON
3. **Given** a morph file with `<style>` section, **When** I open the file, **Then** the section should be highlighted as CSS
4. **Given** a morph file with template content outside script/style tags, **When** I open the file, **Then** the content should be highlighted as HTML

---

### User Story 2 - Placeholder Syntax Highlighting (Priority: P1)

As a developer writing morph templates, I want placeholders (data, actions, and optional names) to be highlighted in different colors so I can quickly identify and distinguish between different types of template variables.

**Why this priority**: This is the core differentiator that makes morph files more readable and distinguishes them from regular HTML files.

**Independent Test**: Can be fully tested by creating template content with various placeholder formats and verifying each type receives distinct coloring.

**Acceptance Scenarios**:

1. **Given** template content with data placeholders (e.g., `{data::}`), **When** I view the file, **Then** data placeholders should be highlighted in one distinct color
2. **Given** template content with action placeholders (e.g., `{::action}`), **When** I view the file, **Then** action placeholders should be highlighted in a different distinct color
3. **Given** template content with named placeholders (e.g., `{::name}`), **When** I view the file, **Then** the name section should be highlighted distinctly from data/action sections
4. **Given** placeholder syntax with colon separators, **When** I view the file, **Then** the colon should be visible and the parts on each side should have appropriate coloring

---

### User Story 3 - Helper Function Visibility (Priority: P2)

As a developer defining helper functions in morph files, I want function declarations and variable definitions to be clearly visible so I can quickly locate and understand the helper code structure.

**Why this priority**: This enhances code navigation and understanding, making it easier to work with complex morph files.

**Independent Test**: Can be fully tested by creating helper functions and variables in the script section and verifying they receive appropriate highlighting.

**Acceptance Scenarios**:

1. **Given** function declarations in the script section, **When** I view the file, **Then** function names should be highlighted distinctly
2. **Given** variable declarations (var/let/const) in the script section, **When** I view the file, **Then** variable names should be highlighted distinctly
3. **Given** helper function calls in template content, **When** I view the file, **Then** function names should be highlighted consistently with their declarations

---

### Edge Cases

- What happens when morph files contain malformed or incomplete tags?
  Use default error handling for each section type (HTML errors for template, JavaScript errors for script, JSON errors for JSON script)
- How does system handle nested placeholders or complex placeholder expressions?
It's not part of the color scheme. It's maintained by @peter.naydenov/vite-plugin-morph
- What happens when script sections contain mixed content types?
  Handle common edge cases: unclosed tags, nested quotes, template literals with placeholder-like syntax (mixed content will be ignored)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST recognize .morph file extension and apply morph syntax highlighting
- **FR-002**: System MUST identify and highlight `<script>` sections without type as JavaScript helper definitions
- **FR-003**: System MUST identify and highlight `<script type="application/json">` sections as JSON handshake data
- **FR-004**: System MUST identify and highlight `<style>` sections as CSS
- **FR-005**: System MUST highlight template content (outside script/style tags) as HTML
- **FR-006**: System MUST distinguish between data placeholders, action placeholders, and named placeholders using different colors with 4.5:1 contrast minimum and colorblind-friendly palettes
- **FR-007**: System MUST highlight colon separators in placeholder syntax appropriately
- **FR-008**: System MUST provide clear visibility for function declarations and variable definitions in helper sections
- **FR-009**: System MUST use default HTML, CSS, and JSON color schemes as the starting point for highlighting
- **FR-010**: System MUST handle malformed tags gracefully without breaking syntax highlighting

### Key Entities *(include if feature involves data)*

- **Morph File**: Text file containing script sections, style sections, and template content
- **Helper Section**: JavaScript code section containing function and variable definitions
- **Handshake Section**: JSON data section for configuration
- **Template Section**: HTML-like content with placeholders
- **Placeholder**: Template variable syntax with exactly 3 sections separated by colons (data:action:name), where empty sections are preserved with colons (e.g., {::name} for name-only, {data::} for data-only)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developers can identify all four morph file sections (helpers, handshake, template, style) within 5 seconds of opening a file
- **SC-002**: 95% of placeholders are correctly highlighted with appropriate colors based on their type (data, action, named)
- **SC-003**: Helper function declarations are visually distinct from regular JavaScript code
- **SC-004**: Syntax highlighting completes within 16ms (60fps) for files up to 100KB in size
- **SC-005**: 90% of users report improved readability of morph files compared to plain text editing