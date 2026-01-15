# Search Feature – Technical Documentation


## Overview

This project implements a GitHub profile search feature with the following capabilities:
- Debounced user input
- Request cancellation using AbortController
- Loading, Success, error, empty, and idle states
- Unit, integration, and end-to-end tests

The goal is to provide a responsive, resilient, and maintainable search experience while keeping concerns well separated.

<br>
<br>

# Architecture

The project is structured to clearly separate responsibilities and promote reusability:
- <b>app</b>
    - assets – static files (CSS, images, etc.)
    - component – application-specific components and logic
- <b>component</b>
    - Generic UI components that can be reused across projects
- <b>lib</b>
    - Pure functions and generic hooks/utilities reusable in any React project
- <b>model</b>
    - Domain models and business representations, reusable across future versions of the application (v2, v3, etc.)
- <b>service</b>
    - Side effects and complex business interactions (API calls .. etc)

<br>
<br>

# UI & Logic Design

Any component that contains non-trivial logic has its logic wrapped inside a dedicated hook.
For example: `<Search />` delegates its logic to `useSearch()`.

useSearch responsibilities

The useSearch hook is responsible for:
- Managing the search query
- Triggering debounced search requests
- Cancelling in-flight requests when the query changes
- Exposes computed UI state (loading, error, noResults, etc.)

States

The UI transitions through the following states:
- `idle` – no query has been submitted
- `loading` – a request is in progress
- `loaded` – results have been successfully fetched
- `error` – an error occurred during the request

<br>
<br>

# Testing Strategy

Unit Tests (Vitest)
- Atomic tests for pure functions and isolated logic
- Focus on behavior and edge cases

Integration Tests (Vitest)
- External dependencies are mocked
- Validation of request flows and state transitions
- Ensures collaboration between modules

End-to-End Tests (Cypress)
- User interaction testing aligned with user stories
- Covers real usage scenarios
- Network requests are mocked using fixtures to ensure consistency tests
- Includes edge cases such as empty results, errors, and API limits


<br>
<br>

# Running the Project


```bash 
# Install dependencies
npm install

# Run the application
npm run dev

# Run unit & integration tests
npm run test

# Run end-to-end tests
npm run e2e
 ```

⸻

# Notes & Limitations

Due to limited available time, the testing strategy focuses on demonstrating the overall approach rather than achieving full test coverage.

Some edge cases and UI behaviors could be further refined, including:
- Additional action button scenarios
- Extended error-handling cases
- Deeper coverage of uncommon edge conditions

This project was also an opportunity to explore Vitest, as well as a non-Redux state management approach relying on hooks and effects.

With more time, the next steps would have been::
- Increasing test coverage
- Refining UI state transitions
- Improving separation between domain logic and UI concerns