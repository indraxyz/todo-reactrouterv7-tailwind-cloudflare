# Todo App

A modern, responsive todo management application built with React, TypeScript, and Tailwind CSS.

## Features

### 🚀 Core Functionality

- **Create, Read, Update, Delete** todos with rich metadata
- **Advanced filtering and searching** by status, priority, category, and text
- **Multiple view modes**: Card view and Table view
- **Bulk operations** for managing multiple todos
- **Real-time statistics** and progress tracking
- **Responsive design** for all device sizes

### 💾 Data Management

- **Mock Data on First Load**: The app automatically loads with sample data for immediate testing
- **Local Storage Persistence**: All changes are automatically saved to browser's local storage
- **Dynamic State Management**: Seamless transition from mock data to user-generated content
- **Data Reset Options**: Easy reset to mock data or clear all todos

### 🎨 User Experience

- **Modern UI/UX** with Tailwind CSS
- **Toast notifications** for user feedback
- **Confirmation dialogs** for destructive actions
- **Keyboard shortcuts** and accessibility features
- **Dark/light mode** support (coming soon)

## Data Flow

### First Load

1. App checks local storage for existing data
2. If no data exists, loads mock data and saves it to local storage
3. User sees sample todos immediately

### User Interactions

1. All CRUD operations update local state
2. Changes are automatically persisted to local storage
3. Data persists between browser sessions
4. Mock data can be restored at any time

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

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

### Build for Production

```bash
pnpm build
pnpm start
```

## Development

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

### Developer Experience Features

This project includes comprehensive developer experience tooling:

- **ESLint**: Code linting with React, TypeScript, and React Router rules
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking
- **Vitest**: Fast unit testing with React Testing Library
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files only
- **EditorConfig**: Consistent editor settings
- **VS Code**: Optimized settings and recommended extensions

### Pre-commit Hooks

The project uses Husky to automatically:
- Run ESLint on staged files
- Format code with Prettier
- Prevent commits with linting errors

### VS Code Setup

1. Install recommended extensions (VS Code will prompt you)
2. Settings are automatically configured for:
   - Format on save
   - ESLint auto-fix
   - TypeScript workspace version

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed development guidelines.

## Project Structure

```
app/
├── common/
│   ├── components/     # Reusable UI components
│   ├── data/          # Mock data and data sources
│   ├── hooks/         # Custom React hooks
│   └── types/         # TypeScript type definitions
├── routes/            # Page components and routing
└── welcome/           # Landing page assets
```

## Key Components

### useTodos Hook

The central data management hook that provides:

- Todo CRUD operations
- Filtering and search
- Local storage persistence
- Mock data management
- Statistics calculation

### TodoDataInfo Component

Shows current data status and provides:

- Data source indication (mock vs local)
- Reset to mock data functionality
- Clear all todos option
- User guidance information

## Data Schema

Each todo includes:

- **Basic Info**: Title, description, category
- **Time Management**: Start/end times, reminders
- **Organization**: Tags, priority, status
- **Attachments**: Files and links
- **User Context**: User information and avatars
- **Metadata**: Creation/update timestamps

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
