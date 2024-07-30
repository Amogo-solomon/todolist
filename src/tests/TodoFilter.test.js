import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoFilter from './TodoFilter';

describe('TodoFilter', () => {
  const mockSetFilter = jest.fn();

  test('renders TodoFilter component', () => {
    render(<TodoFilter filter="all" setFilter={mockSetFilter} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('sets filter to all', () => {
    render(<TodoFilter filter="all" setFilter={mockSetFilter} />);
    fireEvent.click(screen.getByText('All'));
    expect(mockSetFilter).toHaveBeenCalledWith('all');
  });

  test('sets filter to active', () => {
    render(<TodoFilter filter="all" setFilter={mockSetFilter} />);
    fireEvent.click(screen.getByText('Active'));
    expect(mockSetFilter).toHaveBeenCalledWith('active');
  });

  test('sets filter to completed', () => {
    render(<TodoFilter filter="all" setFilter={mockSetFilter} />);
    fireEvent.click(screen.getByText('Completed'));
    expect(mockSetFilter).toHaveBeenCalledWith('completed');
  });
});
