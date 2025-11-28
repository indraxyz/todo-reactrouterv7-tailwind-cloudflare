# Data Management Implementation

## Overview

Todo App menggunakan pendekatan hybrid untuk manajemen data yang menggabungkan mock data pada first load dengan local state persistence menggunakan localStorage.

## Architecture

### Data Flow Diagram

```
First Load → Check localStorage → Load mock data (if empty) → Save to localStorage
     ↓
User Interactions → Update local state → Auto-save to localStorage → Persist between sessions
     ↓
Reset Options → Restore mock data or clear all → Update localStorage
```

## Implementation Details

### 1. Mock Data Initialization

#### File: `app/common/data/mockData.ts`

```typescript
export const mockTodos: Todo[] = [
  // Pre-populated sample todos with realistic data
  // Includes various categories, priorities, and statuses
];
```

**Karakteristik:**

- 6 sample todos dengan data yang lengkap
- Mencakup berbagai kategori: Work, Personal, Learning, Health
- Status yang bervariasi: pending, progress, completed, cancelled
- Prioritas yang berbeda: low, medium, high

### 2. Local Storage Management

#### File: `app/common/hooks/useTodos.ts`

**Storage Keys:**

```typescript
const TODOS_STORAGE_KEY = "todos-app-data";
const FILTERS_STORAGE_KEY = "todos-app-filters";
```

**Helper Functions:**

```typescript
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  // Load data from localStorage with error handling
  // Convert date strings back to Date objects for todos
};

const saveToStorage = <T>(key: string, value: T): void => {
  // Save data to localStorage with error handling
};
```

### 3. State Initialization

#### Todos State

```typescript
const [todos, setTodos] = useState<Todo[]>(() => {
  const storedTodos = loadFromStorage(TODOS_STORAGE_KEY, mockTodos);
  // If no stored data, use mock data and save it
  if (storedTodos === mockTodos) {
    saveToStorage(TODOS_STORAGE_KEY, mockTodos);
  }
  return storedTodos;
});
```

#### Filters State

```typescript
const [filters, setFilters] = useState<TodoFilters>(() => {
  const defaultFilters: TodoFilters = {
    /* ... */
  };
  return loadFromStorage(FILTERS_STORAGE_KEY, defaultFilters);
});
```

### 4. Auto-Persistence

```typescript
// Save todos to localStorage whenever they change
useEffect(() => {
  saveToStorage(TODOS_STORAGE_KEY, todos);
}, [todos]);

// Save filters to localStorage whenever they change
useEffect(() => {
  saveToStorage(FILTERS_STORAGE_KEY, filters);
}, [filters]);
```

### 5. Mock Data Detection

```typescript
const isUsingMockData = useMemo(() => {
  if (todos.length !== mockTodos.length) return false;

  // Compare todos with mock data
  return todos.every((todo, index) => {
    const mockTodo = mockTodos[index];
    return (
      todo.id === mockTodo.id &&
      todo.title === mockTodo.title &&
      todo.description === mockTodo.description
    );
  });
}, [todos]);
```

## User Experience Features

### 1. TodoDataInfo Component

**File:** `app/common/components/TodoDataInfo.tsx`

**Fitur:**

- Menampilkan status data (mock vs local)
- Jumlah total todos
- Tombol reset ke mock data
- Tombol clear all todos
- Informasi panduan untuk user

**Visual Indicators:**

- Blue info box dengan ikon informasi
- Status text yang jelas
- Tombol aksi yang mudah diakses

### 2. Reset Functionality

```typescript
const resetToMockData = useCallback(() => {
  setTodos(mockTodos);
  saveToStorage(TODOS_STORAGE_KEY, mockTodos);
}, []);

const clearAllTodos = useCallback(() => {
  setTodos([]);
  saveToStorage(TODOS_STORAGE_KEY, []);
}, []);
```

## Data Persistence Strategy

### 1. Automatic Saving

- Setiap perubahan state otomatis disimpan ke localStorage
- Tidak ada manual save button yang diperlukan
- Data tersimpan real-time

### 2. Error Handling

```typescript
try {
  localStorage.setItem(key, JSON.stringify(value));
} catch (error) {
  console.warn(`Failed to save data to localStorage key "${key}":`, error);
}
```

### 3. Date Object Handling

```typescript
// Convert date strings back to Date objects for todos
if (key === TODOS_STORAGE_KEY && Array.isArray(parsed)) {
  return parsed.map((todo: any) => ({
    ...todo,
    startTime: new Date(todo.startTime),
    endTime: new Date(todo.endTime),
    reminders: todo.reminders.map((reminder: string) => new Date(reminder)),
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt),
  })) as T;
}
```

## Benefits

### 1. Developer Experience

- **Immediate Testing**: Mock data tersedia segera setelah app load
- **No Setup Required**: User bisa langsung test fitur tanpa input data
- **Consistent Starting Point**: Reset ke mock data memungkinkan testing yang konsisten

### 2. User Experience

- **Persistent Data**: Data tersimpan antara session browser
- **No Data Loss**: Perubahan otomatis tersimpan
- **Easy Recovery**: Reset ke mock data jika diperlukan

### 3. Performance

- **Fast Initial Load**: Data tersedia dari localStorage
- **No Network Calls**: Semua operasi local
- **Efficient Updates**: Hanya data yang berubah yang di-update

## Future Enhancements

### 1. Backend Integration

- Sync dengan server API
- Conflict resolution untuk offline changes
- Real-time collaboration

### 2. Advanced Persistence

- IndexedDB untuk data yang lebih besar
- Service Worker untuk offline support
- Data compression

### 3. Data Migration

- Version control untuk schema changes
- Automatic data migration
- Backup and restore functionality

## Testing Scenarios

### 1. First Load

- App harus load dengan mock data
- Mock data harus tersimpan ke localStorage
- Status harus menunjukkan "Using mock data"

### 2. Data Persistence

- Buat todo baru
- Refresh browser
- Todo harus masih ada
- Status harus menunjukkan "Using local data"

### 3. Reset Functionality

- Modifikasi beberapa todos
- Reset ke mock data
- Data harus kembali ke state awal
- Status harus kembali ke "Using mock data"

### 4. Clear All

- Clear all todos
- Data harus kosong
- Status harus menunjukkan "Using local data"

## Troubleshooting

### Common Issues

1. **Data tidak tersimpan**

   - Check browser localStorage support
   - Verify storage quota
   - Check console untuk error messages

2. **Date objects tidak valid**

   - Ensure proper date string format
   - Check timezone handling
   - Verify date parsing logic

3. **Performance issues dengan data besar**
   - Consider pagination
   - Implement virtual scrolling
   - Optimize filter operations

### Debug Tools

```typescript
// Debug state changes
useEffect(() => {
  console.log("=== TODOS STATE CHANGED ===");
  console.log("Current todos state:", todos);
  console.log("Todos count:", todos.length);
  console.log("=== END STATE CHANGE ===");
}, [todos]);
```

## Best Practices

1. **Error Handling**: Selalu handle localStorage errors gracefully
2. **Data Validation**: Validate data sebelum save ke storage
3. **Performance**: Gunakan debouncing untuk frequent updates
4. **User Feedback**: Berikan feedback yang jelas tentang data status
5. **Recovery Options**: Selalu sediakan cara untuk recover data
