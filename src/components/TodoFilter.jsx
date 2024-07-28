import React from 'react';

const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-around mb-4">
      <button
        className={`p-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={`p-2 ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button
        className={`p-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilter;
