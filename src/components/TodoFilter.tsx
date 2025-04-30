import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import { FilterType } from '../types';

const TodoFilter: React.FC = () => {
  const { filter, setFilter, todos } = useTodoContext();
  
  const filters: FilterType[] = ['all', 'active', 'completed'];
  
  const activeTodoCount = todos.filter(todo => todo.status === 'active').length;
  const completedTodoCount = todos.filter(todo => todo.status === 'completed').length;
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pb-2 border-b dark:border-gray-700">
      <div className="flex space-x-4 mb-4 sm:mb-0">
        {filters.map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize
              ${filter === filterType 
                ? 'bg-indigo-600 text-white dark:bg-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
          >
            {filterType}
            {filterType === 'active' && activeTodoCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-white text-indigo-600 dark:bg-gray-800">
                {activeTodoCount}
              </span>
            )}
            {filterType === 'completed' && completedTodoCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-white text-indigo-600 dark:bg-gray-800">
                {completedTodoCount}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {activeTodoCount === 0 ? 'No tasks remaining' : `${activeTodoCount} task${activeTodoCount !== 1 ? 's' : ''} remaining`}
      </div>
    </div>
  );
};

export default TodoFilter;