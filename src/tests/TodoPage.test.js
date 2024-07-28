import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import TodoPage from '../pages/TodoPage';

jest.mock('../components/LogoutButton', () => () => <button>Logout</button>);
jest.mock('../components/TodoApp', () => () => <div>TodoApp Component</div>);

test('renders TodoPage with user name and components', () => {
  render(
    <Router>
      <AuthProvider>
        <TodoPage />
      </AuthProvider>
    </Router>
  );

  // Mock user
  const user = { name: 'John Doe' };
  jest.spyOn(require('../contexts/AuthProvider'), 'useAuth').mockReturnValue({
    user,
  });

  // Check if the elements are rendered
  expect(screen.getByText(`Welcome, ${user.name}`)).toBeInTheDocument();
  expect(screen.getByText('TodoApp Component')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();
});
