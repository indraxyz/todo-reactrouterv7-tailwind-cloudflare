# Contributing Guide

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd todo-reactrouterv7-tailwind-cloudflare

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Development Workflow

### Code Quality Standards

This project uses several tools to maintain code quality:

- **ESLint**: Code linting and style checking
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Vitest**: Unit testing

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm typecheck        # Type check TypeScript files
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors automatically
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting

# Testing
pnpm test             # Run tests
pnpm test:ui          # Run tests with UI
pnpm test:coverage    # Run tests with coverage
pnpm test:watch       # Run tests in watch mode

# Validation
pnpm validate         # Run all checks (typecheck, lint, format, test)
```

### Pre-commit Hooks

This project uses Husky and lint-staged to automatically:
- Run ESLint on staged files
- Format code with Prettier
- Prevent commits with linting errors

These hooks run automatically when you commit. Make sure your code passes all checks before committing.

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types - use proper types or `unknown`
- Enable strict mode checks
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript for component props

### File Organization

```
app/
├── common/
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   └── constants/     # Constants and configuration
├── routes/            # Route components
└── root.tsx          # Root component
```

### Naming Conventions

- **Components**: PascalCase (e.g., `TodoCard.tsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useTodos.ts`)
- **Utilities**: camelCase (e.g., `storage.ts`)
- **Types**: PascalCase (e.g., `Todo.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_TODOS`)

## Testing

### Writing Tests

- Write tests for all new features
- Test user interactions, not implementation details
- Use Testing Library for React component tests
- Aim for good test coverage (80%+)

### Example Test

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TodoCard } from "~/common/components/TodoCard";

describe("TodoCard", () => {
  it("renders todo title", () => {
    const todo = { id: "1", title: "Test Todo" };
    render(<TodoCard todo={todo} />);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });
});
```

## Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(todos): add bulk delete functionality
fix(storage): handle localStorage quota exceeded error
docs(readme): update installation instructions
```

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass: `pnpm validate`
4. Commit your changes with clear messages
5. Push to your fork
6. Create a pull request with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots (if UI changes)

## VS Code Setup

This project includes VS Code settings for optimal development experience:

1. Install recommended extensions (VS Code will prompt you)
2. Settings are automatically configured for:
   - Format on save
   - ESLint auto-fix
   - TypeScript workspace version

## Troubleshooting

### Common Issues

**ESLint errors:**
```bash
pnpm lint:fix
```

**Type errors:**
```bash
pnpm typecheck
```

**Formatting issues:**
```bash
pnpm format
```

**Test failures:**
- Check that all dependencies are installed
- Ensure test environment is set up correctly
- Review test output for specific errors

## Questions?

If you have questions or need help, please:
1. Check existing issues and discussions
2. Create a new issue with your question
3. Reach out to maintainers

Thank you for contributing! 🎉

