import React from 'react';
import TodoApp from '../components/TodoApp';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../contexts/AuthProvider';

const TodoPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user ? user.name : 'User'}</h1>
        <LogoutButton />
      </header>
      <TodoApp />
    </div>
  );
};

export default TodoPage;
