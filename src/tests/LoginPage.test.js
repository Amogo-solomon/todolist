import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import LoginPage from '../pages/LoginPage';

jest.mock('../contexts/AuthProvider', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

test('renders LoginPage and handles form submission', async () => {
  const mockLogin = jest.fn().mockResolvedValueOnce();
  jest.spyOn(require('../contexts/AuthProvider'), 'useAuth').mockReturnValue({
    login: mockLogin,
  });

  render(
    <Router>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </Router>
  );

  // Check if the elements are rendered
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

  // Fill out and submit the form
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
