---

description: "Task list for feature implementation"
---

# Tasks: Morph Syntax Highlighting

**Input**: Design documents from `/specs/001-morph-syntax/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Grammar validation tests included as specified in research.md and contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **VS Code Extension**: `src/`, `tests/` at repository root
- **Syntaxes**: `src/syntaxes/` for grammar files
- **Themes**: `src/themes/` for color themes
- **Tests**: `tests/suite/` for test files, `test/sample/` for test data

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create VS Code extension project structure per implementation plan
- [X] T002 Initialize TypeScript project with VS Code Extension API dependencies
- [X] T003 [P] Configure ESLint and Prettier for TypeScript
- [X] T004 [P] Setup Mocha test framework and VS Code test runner
- [X] T005 [P] Configure TypeScript compilation and build scripts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create main extension entry point in src/extension.ts
- [X] T007 [P] Copy TextMate grammar from contracts to src/syntaxes/morph.tmLanguage.json
- [X] T008 [P] Copy color theme from contracts to src/themes/morph-theme.json
- [X] T009 [P] Copy language configuration from contracts to src/language-configuration.json
- [X] T010 Create package.json with language contributions and activation events
- [X] T011 Setup basic extension activation and language registration
- [X] T012 Configure vscode-tmgrammar-test for grammar validation

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Basic Morph File Syntax Recognition (Priority: P1) 🎯 MVP

**Goal**: VS Code recognizes and properly highlights the four main sections of .morph files

**Independent Test**: Open a .morph file in VS Code and verify each section (script tags, style tags, template content) receives appropriate syntax highlighting

### Tests for User Story 1

- [X] T013 [P] [US1] Create basic morph file samples in test/sample/basic.morph
- [X] T014 [P] [US1] Create grammar validation test in tests/suite/syntax.test.ts
- [X] T015 [P] [US1] Create extension activation test in tests/suite/extension.test.ts

### Implementation for User Story 1

- [X] T016 [US1] Implement script section detection in src/syntaxes/morph.tmLanguage.json
- [X] T017 [US1] Implement style section detection in src/syntaxes/morph.tmLanguage.json
- [X] T018 [US1] Implement template section detection in src/syntaxes/morph.tmLanguage.json
- [X] T019 [US1] Configure language contributions in package.json for .morph files
- [X] T020 [US1] Test section highlighting with sample files
- [X] T021 [US1] Validate grammar patterns with vscode-tmgrammar-test

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Placeholder Syntax Highlighting (Priority: P1)

**Goal**: Placeholders (data, actions, names) are highlighted in different colors for quick identification

**Independent Test**: Create template content with various placeholder formats and verify each type receives distinct coloring

### Tests for User Story 2

- [X] T022 [P] [US2] Create placeholder test samples in test/sample/placeholders.morph
- [X] T023 [P] [US2] Create placeholder highlighting tests in tests/suite/placeholders.test.ts

### Implementation for User Story 2

- [X] T024 [US2] Implement placeholder pattern matching in src/syntaxes/morph.tmLanguage.json
- [X] T025 [US2] Add data placeholder highlighting in src/themes/morph-theme.json
- [X] T026 [US2] Add action placeholder highlighting in src/themes/morph-theme.json
- [X] T027 [US2] Add name placeholder highlighting in src/themes/morph-theme.json
- [X] T028 [US2] Configure colon separator highlighting in src/themes/morph-theme.json
- [X] T029 [US2] Test placeholder color differentiation with sample files
- [X] T030 [US2] Validate contrast ratios meet WCAG AA 4.5:1 requirement

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Helper Function Visibility (Priority: P2)

**Goal**: Function declarations and variable definitions in helper sections are clearly visible

**Independent Test**: Create helper functions and variables in script section and verify they receive appropriate highlighting

### Tests for User Story 3

- [X] T031 [P] [US3] Create helper function test samples in test/sample/helpers.morph
- [X] T032 [P] [US3] Create helper highlighting tests in tests/suite/helpers.test.ts

### Implementation for User Story 3

- [X] T033 [US3] Enhance JavaScript highlighting for helper functions in src/syntaxes/morph.tmLanguage.json
- [X] T034 [US3] Enhance variable highlighting (var/let/const) in src/syntaxes/morph.tmLanguage.json
- [X] T035 [US3] Add function name highlighting in src/themes/morph-theme.json
- [X] T036 [US3] Add variable name highlighting in src/themes/morph-theme.json
- [X] T037 [US3] Test helper function visibility with sample files
- [X] T038 [US3] Validate function/variable distinction is clear

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T039 [P] Create comprehensive README.md documentation
- [X] T040 [P] Create CHANGELOG.md for version tracking
- [X] T041 Performance optimization for 100KB files (16ms target)
- [X] T042 Memory usage optimization (<10MB target)
- [X] T043 [P] Additional edge case testing in test/sample/malformed.morph
- [X] T044 [P] Accessibility validation with colorblind simulators
- [X] T045 [P] Cross-platform testing (Windows, macOS, Linux)
- [X] T046 Final grammar validation with comprehensive test suite
- [X] T047 Package extension for distribution (.vsix file)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Builds on US1 but independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Enhances US1 but independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Grammar patterns before theme colors
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Create basic morph file samples in test/sample/basic.morph"
Task: "Create grammar validation test in tests/suite/syntax.test.ts"
Task: "Create extension activation test in tests/suite/extension.test.ts"

# Launch all section detection tasks together:
Task: "Implement script section detection in src/syntaxes/morph.tmLanguage.json"
Task: "Implement style section detection in src/syntaxes/morph.tmLanguage.json"
Task: "Implement template section detection in src/syntaxes/morph.tmLanguage.json"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Package and test extension

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Basic highlighting (MVP!)
3. Add User Story 2 → Test independently → Placeholder differentiation
4. Add User Story 3 → Test independently → Helper visibility
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (section detection)
   - Developer B: User Story 2 (placeholder highlighting)
   - Developer C: User Story 3 (helper visibility)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Performance targets: 16ms for 100KB files, <10MB memory usage
- Accessibility requirement: WCAG AA 4.5:1 contrast ratios