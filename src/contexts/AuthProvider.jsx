// src/contexts/AuthProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwt_encode, jwt_decode } from '../utils/jwt';
import { addUser, getUser, deleteUser } from '../utils/indexedDB';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwt_decode(token);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email, password) => {
    const storedUser = await getUser(email);
    if (storedUser && storedUser.password === '*'.repeat(password.length)) {
      const token = storedUser.token;
      const decodedUser = jwt_decode(token);
      setUser(decodedUser);
      localStorage.setItem('token', token);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const register = async ({ name, email, password }) => {
    const payload = { name, email };
    const token = jwt_encode(payload);
    const maskedPassword = '*'.repeat(password.length);
    const user = { name, email, password: maskedPassword, token };
    await addUser(user);
    localStorage.setItem('token', token);
    const decodedUser = jwt_decode(token);
    setUser(decodedUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
