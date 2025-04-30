import { Todo } from '../types';

const TODO_STORAGE_KEY = 'todo-app-storage';
const DARK_MODE_KEY = 'todo-app-dark-mode';

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
};

export const loadTodos = (): Todo[] => {
  const data = localStorage.getItem(TODO_STORAGE_KEY);
  if (!data) return [];
  
  try {
    const parsedData = JSON.parse(data);
    // Convert string dates back to Date objects
    return parsedData.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  } catch (error) {
    console.error('Failed to parse todos from localStorage', error);
    return [];
  }
};

export const saveDarkMode = (isDark: boolean): void => {
  localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
};

export const loadDarkMode = (): boolean => {
  const data = localStorage.getItem(DARK_MODE_KEY);
  if (!data) {
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse dark mode setting from localStorage', error);
    return false;
  }
};