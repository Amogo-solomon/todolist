import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Todo App</h1>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-white text-blue-500 p-4 rounded">Login</Link>
        <Link to="/register" className="bg-white text-blue-500 p-4 rounded">Register</Link>
        <Link to="/about" className="bg-white text-blue-500 p-4 rounded">About</Link>
      </div>
    </div>
  );
};

export default HomePage;
