# Todo App

A modern, production-ready todo management application built with **React Router v7**, **TypeScript**, and **Tailwind CSS**. Designed with expert-level developer experience and best practices in mind.

## ✨ Features

### 🚀 Core Functionality

- **Full CRUD Operations**: Create, Read, Update, Delete todos with rich metadata
- **Advanced Filtering**: Filter by status, priority, category, and search by text
- **Multiple View Modes**: Switch between Card view and Table view
- **Bulk Operations**: Select and manage multiple todos at once
- **Real-time Statistics**: Live progress tracking and insights
- **Responsive Design**: Optimized for all device sizes (mobile, tablet, desktop)

### 💾 Data Management

- **Mock Data on First Load**: Automatically loads sample data for immediate testing
- **Local Storage Persistence**: All changes automatically saved to browser's local storage
- **Dynamic State Management**: Seamless transition from mock data to user-generated content
- **Data Reset Options**: Easy reset to mock data or clear all todos

### 🎨 User Experience

- **Modern UI/UX**: Beautiful, intuitive interface built with Tailwind CSS
- **Toast Notifications**: Real-time user feedback with Sonner
- **Confirmation Dialogs**: Safe destructive actions with confirmations
- **Keyboard Navigation**: Full keyboard accessibility support
- **Smooth Animations**: Polished transitions and micro-interactions
- **Loading States**: Clear feedback during async operations
- **Error Handling**: User-friendly error boundaries and messages

### ♿ Accessibility

- **WCAG 2.1 AA Compliant**: Full accessibility support
- **ARIA Labels**: Proper semantic HTML and ARIA attributes
- **Keyboard Navigation**: Complete keyboard support
- **Screen Reader Support**: Optimized for assistive technologies
- **Focus Management**: Proper focus indicators and management

### ⚡ Performance

- **Optimized Rendering**: React.memo, useMemo, and useCallback optimizations
- **Code Splitting**: Lazy loading ready with Suspense boundaries
- **Fast Builds**: Vite-powered development and production builds
- **Type Safety**: Strict TypeScript for catch errors at compile time

## 🛠️ Tech Stack

- **Framework**: [React Router v7](https://reactrouter.com/) (SSR-ready)
- **Language**: TypeScript 5.8+ (strict mode)
- **Styling**: Tailwind CSS 4.1+
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **pnpm** 8+ (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd todo-reactrouterv7-tailwind-cloudflare

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📜 Available Scripts

### Development

```bash
pnpm dev              # Start development server with hot reload
pnpm build            # Build for production
pnpm start            # Start production server
```

### Code Quality

```bash
pnpm typecheck        # Type check TypeScript files
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors automatically
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting
```

### Testing

```bash
pnpm test             # Run tests in watch mode
pnpm test:ui          # Run tests with interactive UI
pnpm test:coverage    # Run tests with coverage report
pnpm test:watch       # Run tests in watch mode
```

### Validation

```bash
pnpm validate         # Run all checks (typecheck, lint, format, test)
```

## 🏗️ Project Structure

```
app/
├── common/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Design system primitives (Button, Input, Card, etc.)
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── SuspenseBoundary.tsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── useTodos.ts     # Main data management hook
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── useClickOutside.ts
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   │   ├── storage.ts      # Safe localStorage utilities
│   │   ├── cn.ts           # Class name utility (clsx + tailwind-merge)
│   │   └── animate.ts      # Animation utilities
│   ├── constants/          # Constants and configuration
│   └── data/               # Mock data
├── routes/                 # Page components and routing
│   ├── home.tsx
│   └── todos/
│       ├── index.tsx
│       ├── new.tsx
│       ├── [id].tsx
│       └── [id]/edit.tsx
└── root.tsx               # Root component with error boundary
```

## 🎨 UI Components & Design System

This project includes a comprehensive design system with reusable UI primitives:

### Available Components

- **Button**: Variants (primary, secondary, danger, ghost), sizes, loading states
- **Input**: Labels, error states, helper text, icons
- **Select**: Consistent styling, error handling
- **Card**: Variants, compound components (Header, Title, Content, Footer)
- **LoadingSpinner**: Multiple sizes and variants
- **ErrorBoundary**: Comprehensive error handling
- **SuspenseBoundary**: Async component loading

### Usage Example

```tsx
import { Button, Input, Card } from "~/common/components/ui";
import { useDebounce } from "~/common/hooks";

function MyComponent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  return (
    <Card variant="elevated" padding="md">
      <Input
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type to search..."
      />
      <Button variant="primary" size="md">
        Submit
      </Button>
    </Card>
  );
}
```

## 🪝 Custom Hooks

### useTodos
Central data management hook providing:
- Todo CRUD operations
- Filtering and search
- Local storage persistence
- Mock data management
- Statistics calculation

### Utility Hooks

- **useDebounce**: Debounce values (useful for search inputs)
- **useLocalStorage**: Type-safe localStorage with SSR safety
- **useMediaQuery**: React to media query changes
- **useClickOutside**: Detect clicks outside elements

### Usage Example

```tsx
import { useDebounce, useLocalStorage, useMediaQuery } from "~/common/hooks";

function MyComponent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Use debouncedSearch for API calls
  useEffect(() => {
    if (debouncedSearch) {
      // Perform search
    }
  }, [debouncedSearch]);
}
```

## 🧪 Testing

The project uses **Vitest** for fast, reliable testing:

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Interactive UI mode
pnpm test:ui
```

### Test Structure

- Tests are co-located with components or in `__tests__` directories
- Uses React Testing Library for component testing
- Example test file: `app/common/utils/__tests__/storage.test.ts`

## 🔧 Developer Experience

### Code Quality Tools

- **ESLint**: Comprehensive linting with React, TypeScript, and React Router rules
- **Prettier**: Automatic code formatting with consistent style
- **TypeScript**: Strict type checking with enhanced compiler options
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters only on staged files

### Pre-commit Hooks

Automatically on every commit:
- ✅ Run ESLint on staged files
- ✅ Format code with Prettier
- ✅ Prevent commits with linting errors

### VS Code Integration

1. **Recommended Extensions**: VS Code will prompt you to install:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript Language Features

2. **Auto-configured Settings**:
   - Format on save
   - ESLint auto-fix on save
   - TypeScript workspace version
   - EditorConfig support

### EditorConfig

Consistent editor settings across the team:
- 2-space indentation
- LF line endings
- UTF-8 encoding
- Trim trailing whitespace

## 📚 Documentation

- **[CONTRIBUTING.md](./CONTRIBUTING.md)**: Development guidelines and best practices
- **[docs/DX_IMPROVEMENTS.md](./docs/DX_IMPROVEMENTS.md)**: Complete developer experience improvements
- **[docs/UI_UX_IMPROVEMENTS.md](./docs/UI_UX_IMPROVEMENTS.md)**: UI/UX components and patterns
- **[docs/DATA_MANAGEMENT.md](./docs/DATA_MANAGEMENT.md)**: Data flow and storage patterns

## 🗂️ Data Schema

Each todo includes:

- **Basic Info**: Title, description, category
- **Time Management**: Start/end times, reminders
- **Organization**: Tags, priority (low/medium/high), status (pending/progress/completed/cancelled)
- **Attachments**: Files and links
- **User Context**: User information and avatars
- **Metadata**: Creation/update timestamps

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Development setup
- Code style guidelines
- Testing requirements
- Git workflow
- Pull request process

### Quick Start for Contributors

```bash
# 1. Fork and clone
git clone <your-fork-url>
cd todo-reactrouterv7-tailwind-cloudflare

# 2. Install dependencies
pnpm install

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes and test
pnpm validate

# 5. Commit (pre-commit hooks will run automatically)
git commit -m "feat: your feature description"

# 6. Push and create a pull request
git push origin feature/your-feature-name
```

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [React Router](https://reactrouter.com/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vitest](https://vitest.dev/) for fast testing
- [React Hook Form](https://react-hook-form.com/) for form management
- [Zod](https://zod.dev/) for schema validation

---

**Built with ❤️ using modern web technologies**
