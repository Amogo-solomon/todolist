import React from 'react';
import { FaTrashAlt, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const TodoList = ({ todos, toggleComplete, deleteTodo }) => {
  return (
    <ul className="list-none p-0">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4 mb-2 transition-transform transform hover:scale-105"
        >
          <div
            className="flex items-center cursor-pointer"
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.completed ? (
              <FaCheckCircle className="text-green-500 mr-2" size={20} />
            ) : (
              <FaRegCircle className="text-gray-500 mr-2" size={20} />
            )}
            <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </span>
          </div>
          <button
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
            onClick={() => deleteTodo(todo.id)}
          >
            <FaTrashAlt size={16} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
