import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../pages/HomePage';

test('renders HomePage with links', () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );

  // Check if the elements are rendered
  expect(screen.getByText('Welcome to the Todo App')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Register')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
});
