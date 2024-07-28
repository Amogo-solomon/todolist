// src/components/Header.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
/* import { PowerIcon } from '@heroicons/react/solid'; */

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      {/* <h1 className="text-xl font-bold">Todo App</h1> */}
      <div className="flex justify-between ">
        {user && <span className="mr-4">Welcome, {user.name}</span>}
        <button onClick={handleLogout} className="text-red-500">
          {/* <PowerIcon className="w-6 h-6" /> */} Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
