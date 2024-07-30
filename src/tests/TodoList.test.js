import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { FaTrashAlt, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import TodoList from './TodoList';

describe('TodoList', () => {
  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();
  const todos = [
    { id: '1', title: 'Todo 1', completed: false },
    { id: '2', title: 'Todo 2', completed: true },
  ];

  test('renders TodoList component', () => {
    render(<TodoList todos={todos} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  test('calls toggleComplete on todo click', () => {
    render(<TodoList todos={todos} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    fireEvent.click(screen.getByText('Todo 1'));
    expect(mockToggleComplete).toHaveBeenCalledWith('1');
  });

  test('calls deleteTodo on delete button click', () => {
    render(<TodoList todos={todos} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    fireEvent.click(screen.getByLabelText('Delete Todo 1'));
    expect(mockDeleteTodo).toHaveBeenCalledWith('1');
  });

  test('displays completed todo with check icon', () => {
    render(<TodoList todos={todos} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    expect(screen.getByTestId('todo-2').querySelector('svg')).toContainElement(screen.getByTestId('check-circle-icon'));
  });
});
