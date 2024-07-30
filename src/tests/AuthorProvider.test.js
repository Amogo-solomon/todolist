import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthProvider';

// Mock JWT functions
jest.mock('../utils/jwt', () => ({
  jwt_encode: jest.fn((payload) => `encoded-${JSON.stringify(payload)}`),
  jwt_decode: jest.fn((token) => {
    const parts = token.split('-');
    return { email: parts[1] };
  }),
}));

// Mock IndexedDB functions
jest.mock('../utils/indexedDB', () => ({
  addUser: jest.fn(),
  getUser: jest.fn(),
  deleteUser: jest.fn(),
}));

const TestComponent = () => {
  const { user, login, register, logout } = useAuth();
  return (
    <div>
      {user ? (
        <>
          <p data-testid="user">{user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => login('user@example.com', 'password')}>Login</button>
          <button onClick={() => register({ name: 'User', email: 'user@example.com', password: 'password' })}>
            Register
          </button>
        </>
      )}
    </div>
  );
};

describe('AuthProvider', () => {
  test('renders login and register buttons when not authenticated', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('calls login function and sets user', async () => {
    const { login } = useAuth();
    const mockUser = { email: 'user@example.com' };
    jest.spyOn(require('../utils/indexedDB'), 'getUser').mockResolvedValue({ email: 'user@example.com', password: '****' });
    jest.spyOn(require('../utils/jwt'), 'jwt_decode').mockReturnValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));
    expect(await screen.findByTestId('user')).toHaveTextContent(mockUser.email);
  });

  test('calls register function and sets user', async () => {
    const { register } = useAuth();
    const mockUser = { email: 'user@example.com' };
    jest.spyOn(require('../utils/indexedDB'), 'addUser').mockResolvedValue(mockUser);
    jest.spyOn(require('../utils/jwt'), 'jwt_decode').mockReturnValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Register'));
    expect(await screen.findByTestId('user')).toHaveTextContent(mockUser.email);
  });

  test('calls logout function and removes user', async () => {
    const { login, logout } = useAuth();
    const mockUser = { email: 'user@example.com' };
    jest.spyOn(require('../utils/indexedDB'), 'getUser').mockResolvedValue(mockUser);
    jest.spyOn(require('../utils/jwt'), 'jwt_decode').mockReturnValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Logout'));
    expect(screen.queryByTestId('user')).toBeNull();
  });
});
