import React from 'react';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { TodoProvider } from '../context/TodoContext';

const TodoApp: React.FC = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 max-w-xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 transition-colors">
            <Header />
            <TodoForm />
            <TodoFilter />
            <TodoList />
          </div>
          <footer className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>TodoFlow © {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    </TodoProvider>
  );
};

export default TodoApp;