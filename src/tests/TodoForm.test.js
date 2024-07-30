import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  const mockAddTodo = jest.fn();

  test('renders TodoForm component', () => {
    render(<TodoForm addTodo={mockAddTodo} />);
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
  });

  test('submits form with a new todo', () => {
    render(<TodoForm addTodo={mockAddTodo} />);
    const input = screen.getByPlaceholderText('Add a new todo');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByText('Add Todo'));

    expect(mockAddTodo).toHaveBeenCalledWith({
      id: expect.any(String),
      title: 'New Todo',
      completed: false,
    });
  });
});
