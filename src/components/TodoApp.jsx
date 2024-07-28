import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { addTodo as addTodoDB, getTodos as getTodosDB, deleteTodo as deleteTodoDB, clearTodos } from '../utils/indexedDB';
import { useAuth } from '../contexts/AuthProvider';

// API Endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      if (user) {
        // Fetch todos from API
        const response = await fetch(API_URL);
        const data = await response.json();

        // Save to IndexedDB
        await clearTodos();
        const userTodos = data.slice(0, 10).map(todo => ({ ...todo, userEmail: user.email }));
        userTodos.forEach(todo => addTodoDB(todo));

        // Set todos in state
        setTodos(userTodos);
      }
    };
    fetchTodos();
  }, [user]);

  useEffect(() => {
    const fetchStoredTodos = async () => {
      if (user) {
        const storedTodos = await getTodosDB(user.email);
        setTodos(storedTodos);
      }
    };
    fetchStoredTodos();
  }, [user]);

  const addTodoHandler = async (todo) => {
    const newTodo = { ...todo, userEmail: user.email };
    await addTodoDB(newTodo);
    setTodos(prevTodos => [...prevTodos, newTodo]);

    // Optionally, you could also add this new todo to the API
    // await fetch(`${API_URL}/add`, { method: 'POST', body: JSON.stringify(newTodo) });
  };

  const toggleComplete = async (id) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      // Update in IndexedDB
      updatedTodos.forEach(todo => addTodoDB(todo));
      return updatedTodos;
    });
  };

  const deleteTodo = async (id) => {
    await deleteTodoDB(id);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));

    // Optionally, delete from API as well
    // await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
  });

  return (
    <div>
      <TodoForm addTodo={addTodoHandler} />
      <TodoFilter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;
