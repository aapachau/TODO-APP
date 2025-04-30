import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTodoContext } from '../context/TodoContext';

const TodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const { addTodo } = useTodoContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim(), category.trim() || undefined);
      setText('');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6 transition-all">
      <div className="flex flex-col space-y-3">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="w-full px-4 py-3 pr-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
            autoFocus
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            <PlusCircle size={24} />
          </button>
        </div>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
        />
      </div>
    </form>
  );
};

export default TodoForm;