# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational project that implements React's core internals from scratch (createElement, render, useState) to understand how React works under the hood. The custom React library is used to build a Todo List application. The primary language of documentation and comments is Korean.

There are no test, lint, or build scripts configured.

## Architecture

### Rendering Pipeline

```
index.html (#root div)
  → src/index.js (creates ReactRootElement, calls render with App)
    → src/react/src/index.js (core library)
    → src/App.js (Todo List component)
```

### Custom React Library (`src/react/src/index.js`)

Three core pieces:

- **`ReactElement`** — Constructor takes `(type, props, ...children)`. Creates a real DOM node immediately (no virtual DOM yet). Props starting with `"on"` are registered as event listeners; others become attributes. String children set `textContent`; ReactElement children are `appendChild`'d.

- **`ReactRootElement`** — Wraps the root DOM element. `render(componentFn)` clears innerHTML, resets the hook cursor, executes the component function, and appends the resulting DOM tree.

- **`useState`** — Closure-based implementation using parallel `stateList`/`setStateList` arrays indexed by a global `cursor`. The cursor resets to 0 on each render, which is why hook call order must be consistent (no conditional hooks). `setState` updates the value and triggers `root.render()`.

### Key Design Decisions

- No virtual DOM or reconciliation — the entire DOM tree is rebuilt on every state change
- `ReactElement` creates real DOM nodes in its constructor (not a plain object like real React)
- `root` is exported from `src/index.js` and imported by the React library for setState re-renders (circular dependency by design)
- Global cursor state is shared across all components

### Planned Features (from docs/week1.md)

Batch updates, Virtual DOM, reconciliation/diffing algorithm, component lifecycle, additional hooks (useEffect, useReducer).