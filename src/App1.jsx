import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from '../src/components/AuthProvider';
import TodoApp from '../src/components/TodoApp';
import Login from '../src/components/Login';
import ProtectedRoute from '../src/components/ProtectedRoute';

const Home = () => <div>Welcome to the Todo App!</div>;
const About = () => <div>About this App: A simple Todo list application.</div>;

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <nav className="flex justify-around p-4 bg-gray-800 text-white">
          <Link to="/">Home</Link>
          <Link to="/todos">Todos</Link>
          <Link to="/about">About</Link>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<ProtectedRoute element={TodoApp} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
