export type TodoStatus = 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
  createdAt: Date;
  category?: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoContextType {
  todos: Todo[];
  filter: FilterType;
  darkMode: boolean;
  addTodo: (text: string, category?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  setFilter: (filter: FilterType) => void;
  reorderTodos: (startIndex: number, endIndex: number) => void;
  toggleDarkMode: () => void;
}