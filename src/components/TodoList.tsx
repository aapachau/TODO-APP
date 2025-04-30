import React from 'react';
import TodoItem from './TodoItem';
import { useTodoContext } from '../context/TodoContext';

const TodoList: React.FC = () => {
  const { todos, filter } = useTodoContext();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    return todo.status === filter;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="text-6xl mb-4">✓</div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
          {filter === 'all' 
            ? 'No tasks yet' 
            : filter === 'active' 
              ? 'No active tasks' 
              : 'No completed tasks'}
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          {filter === 'all' 
            ? 'Add a task to get started' 
            : filter === 'active' 
              ? 'All caught up!' 
              : 'Complete a task to see it here'}
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-4 transition-all">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;