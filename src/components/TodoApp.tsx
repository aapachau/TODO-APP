import React from 'react';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { TodoProvider } from '../context/TodoContext';

const TodoApp: React.FC = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-primary dark:bg-gradient-dark transition-all duration-300">
        <div className="container mx-auto px-4 py-8 max-w-xl">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 transition-all">
            <Header />
            <TodoForm />
            <TodoFilter />
            <TodoList />
          </div>
          <footer className="mt-6 text-center text-sm text-white dark:text-gray-300">
            <p>TodoFlow © {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    </TodoProvider>
  );
};

export default TodoApp;