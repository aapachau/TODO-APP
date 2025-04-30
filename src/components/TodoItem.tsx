import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash, Edit, X, Save } from 'lucide-react';
import { Todo } from '../types';
import { useTodoContext } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li 
      className={`group flex items-center justify-between p-3 mb-2 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 
      ${todo.status === 'completed' ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'} 
      dark:border-gray-700`}
    >
      <div className="flex items-center flex-1 min-w-0">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-colors
          ${todo.status === 'completed' 
            ? 'bg-emerald-500 border-emerald-500 dark:bg-emerald-600 dark:border-emerald-600' 
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400'}`}
          aria-label={todo.status === 'completed' ? 'Mark as active' : 'Mark as completed'}
        >
          {todo.status === 'completed' && <Check size={14} className="text-white" />}
        </button>

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onBlur={handleSave}
          />
        ) : (
          <div className="flex-1 min-w-0">
            <p 
              className={`text-sm sm:text-base truncate ${
                todo.status === 'completed' 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              {todo.text}
            </p>
            {todo.category && (
              <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mt-1">
                {todo.category}
              </span>
            )}
          </div>
        )}
      </div>

      <div className={`flex space-x-1 items-center ${isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-200`}>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
              aria-label="Save"
            >
              <Save size={18} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              aria-label="Cancel"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="p-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              aria-label="Edit"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              aria-label="Delete"
            >
              <Trash size={18} />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;