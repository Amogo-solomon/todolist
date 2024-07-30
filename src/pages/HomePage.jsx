import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white ml-10">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Todo App</h1>
      <div className="flex space-x-4 mr-5">
        <Link to="/login" className="bg-white text-blue-500 p-4 rounded text-md ml-2 mr-5">Login</Link>
        <Link to="/register" className="bg-white text-blue-500 p-4 rounded text-md ml-2 mr-5">Register</Link>
        <Link to="/about" className="bg-white text-blue-500 p-4 rounded text-md ml-2 mr-5">About</Link>
      </div>
    </div>
  );
};

export default HomePage;
