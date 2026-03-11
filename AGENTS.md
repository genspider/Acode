# AGENTS.md - Acode Code Editor

Acode is a Cordova-based code editor for Android. This file provides guidance for AI agents working in this repository.

---

## Project Overview

- **Type**: Mobile app (Android) / Code editor
- **Framework**: Cordova + Web technologies
- **Primary Languages**: JavaScript, TypeScript, SCSS
- **Build Tool**: rspack (webpack alternative)
- **Package Manager**: npm

---

## Commands

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for Android
npm run build
```

### Code Quality

```bash
# Lint and fix (Biome)
npm run lint

# Format code (Biome)
npm run format

# Run all checks (lint + format)
npm run check

# TypeScript type checking
npm run typecheck
```

### Testing

Tests are **runtime tests** executed via the TestCode plugin in the Acode Android app. There is no standard `npm test` command. Tests are located in `src/test/*.test.js`.

To run tests:

1. Build and install the Acode app on Android
2. Install the TestCode plugin
3. Tests run within the app context

---

## Code Style

### Formatting

- **Indentation**: Tabs (configured in `biome.json`)
- **Line endings**: LF
- **Max line length**: Default (Biome handles this)

### Linting Rules (Biome)

Configured in `biome.json`:

```json
{
  "formatter": { "indentStyle": "tab" },
  "linter": {
    "rules": {
      "complexity": {
        "noStaticOnlyClass": "error",
        "noUselessSwitchCase": "error",
        "useFlatMap": "error"
      },
      "style": {
        "useForOf": "error",
        "useNodejsImportProtocol": "error",
        "useNumberNamespace": "error"
      },
      "suspicious": {
        "noDoubleEquals": "error",
        "noThenProperty": "error",
        "useIsArray": "error"
      }
    }
  }
}
```

### TypeScript

- Strict mode enabled in `tsconfig.json`
- Target: ES2020
- Module: ESNext
- Path aliases configured (e.g., `utils/*` maps to `src/utils/*`)

### JavaScript Conventions

**Imports**:

```javascript
// External packages
import { EditorView } from "@codemirror/view";

// Path aliases (baseUrl: "./src")
import Uri from "utils/Uri";
import lspStatusBar from "components/lspStatusBar";

// Relative imports
import { clearDiagnosticsEffect } from "./diagnostics";
```

**Naming**:

- Classes: `PascalCase` (e.g., `EditorManager`, `TestRunner`)
- Functions/variables: `camelCase` (e.g., `getIndentUnit`, `safeString`)
- Constants: `camelCase` or `UPPER_SNAKE_CASE`

**Error Handling**:

- Use try/catch for async operations
- Throw descriptive errors
- Use custom error classes when appropriate

**Exports**:

```javascript
// Named exports preferred
export function doSomething() {}

// Default exports for main modules
export default function main() {}

// Re-export from submodules
export { bundles, default as lspApi } from "./api";
```

---

## Project Structure

```
src/
├── cm/                    # CodeMirror editor
│   ├── lsp/              # LSP (Language Server Protocol)
│   │   ├── clientManager.ts
│   │   ├── serverLauncher.ts
│   │   └── types.ts
│   └── modes/            # Language modes
├── components/           # UI components
├── dialogs/              # Dialog components
├── fileSystem/           # File system handling
├── handlers/             # Event handlers
├── lang/                 # Language/i18n
├── lib/                  # Core libraries
│   ├── editorManager.js
│   ├── editorFile.js
│   └── ...
├── pages/                # App pages
├── plugins/              # Cordova plugins
├── settings/             # Settings handlers
├── styles/               # Global styles
├── test/                 # Runtime tests
│   ├── tester.js         # Test runner
│   └── *.test.js
├── theme/                # Theme definitions
├── utils/                # Utility functions
└── views/                # View components
```

---

## Important Patterns

### Adding New Features

1. **UI Components**: Add to `src/components/` or `src/dialogs/`
2. **Libraries**: Add to `src/lib/`
3. **Pages**: Add to `src/pages/`
4. **Settings**: Add to `src/settings/`

### LSP Integration

The project uses CodeMirror's LSP client. To add language support:

1. Create a server launcher in `src/cm/lsp/servers/`
2. Register in `src/cm/lsp/serverRegistry.ts`
3. Add language configuration in appropriate places

### Plugin Development

Plugins are Cordova plugins in `src/plugins/`. Each has its own `package.json`.

---

## Common Tasks

### Run Type Check

```bash
npm run typecheck
```

### Fix Lint Errors

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

### Build for Android

```bash
npm run build
```

---

## Notes

- This is an Android app built with Cordova
- The editor uses CodeMirror 6
- Tests run at runtime in the app, not in CI
- Path aliases are defined in `tsconfig.json`
- Biome is used for both linting and formatting (not ESLint/Prettier)
