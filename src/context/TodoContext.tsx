import React, { createContext, useContext, useEffect, useState } from 'react';
import { Todo, TodoContextType, FilterType } from '../types';
import { loadTodos, saveTodos, loadDarkMode, saveDarkMode } from '../utils/localStorage';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [darkMode, setDarkMode] = useState(false);

  // Load todos from localStorage on initial render
  useEffect(() => {
    setTodos(loadTodos());
    setDarkMode(loadDarkMode());
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // Save dark mode preference
  useEffect(() => {
    saveDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTodo = (text: string, category?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      status: 'active',
      createdAt: new Date(),
      category
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id 
          ? { ...todo, status: todo.status === 'active' ? 'completed' : 'active' } 
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id 
          ? { ...todo, text } 
          : todo
      )
    );
  };

  const reorderTodos = (startIndex: number, endIndex: number) => {
    const result = Array.from(todos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTodos(result);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const value: TodoContextType = {
    todos,
    filter,
    darkMode,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    reorderTodos,
    toggleDarkMode
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};