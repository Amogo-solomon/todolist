import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoApp from './TodoApp';
import { AuthProvider } from '../contexts/AuthProvider';
import { getTodosDB, addTodoDB, deleteTodoDB, clearTodos } from '../utils/indexedDB';

// Mock the IndexedDB functions
jest.mock('../utils/indexedDB', () => ({
  getTodosDB: jest.fn(),
  addTodoDB: jest.fn(),
  deleteTodoDB: jest.fn(),
  clearTodos: jest.fn(),
}));

// Mock the API fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, title: 'Test Todo', completed: false }]),
  })
);

describe('TodoApp', () => {
  const mockUser = { email: 'user@example.com' };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('token', 'mockToken');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders TodoApp component', async () => {
    render(
      <AuthProvider>
        <TodoApp />
      </AuthProvider>
    );

    expect(await screen.findByText('Add Todo')).toBeInTheDocument();
    expect(await screen.findByText('All')).toBeInTheDocument();
    expect(await screen.findByText('Active')).toBeInTheDocument();
    expect(await screen.findByText('Completed')).toBeInTheDocument();
  });

  test('fetches and displays todos', async () => {
    getTodosDB.mockResolvedValue([{ id: 1, title: 'Test Todo', completed: false }]);

    render(
      <AuthProvider>
        <TodoApp />
      </AuthProvider>
    );

    expect(await screen.findByText('Test Todo')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const newTodo = { id: 2, title: 'New Todo', completed: false };
    addTodoDB.mockResolvedValue(newTodo);

    render(
      <AuthProvider>
        <TodoApp />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Add a new todo'), {
      target: { value: 'New Todo' },
    });
    fireEvent.click(screen.getByText('Add Todo'));

    await waitFor(() => expect(screen.getByText('New Todo')).toBeInTheDocument());
  });

  test('deletes a todo', async () => {
    const todoId = 1;
    deleteTodoDB.mockResolvedValue();

    render(
      <AuthProvider>
        <TodoApp />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    });
  });

  test('filters todos', async () => {
    getTodosDB.mockResolvedValue([
      { id: 1, title: 'Active Todo', completed: false },
      { id: 2, title: 'Completed Todo', completed: true },
    ]);

    render(
      <AuthProvider>
        <TodoApp />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText('Completed Todo')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Active'));
    expect(screen.getByText('Active Todo')).toBeInTheDocument();
  });
});
