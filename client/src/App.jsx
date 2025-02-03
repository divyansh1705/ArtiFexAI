// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider } from './components/themeToggle.jsx'
import { Home, CreatePost } from './pages';
import ThemeToggleButton from './components/ThemeToggleButton.jsx';
import { logo } from './assets';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <header className="w-full flex justify-between items-center bg-white dark:bg-gray-900 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] dark:border-b-gray-700">
          <Link to="/">
            <img src={logo} alt="logo" className="w-28 object-contain" />
          </Link>

          <div className="flex space-x-4">
            <ThemeToggleButton /> {/* Add theme toggle button */}
            <Link
              to="/create-post"
              className="font-inter font-medium bg-[#6469ff] text-white dark:text-white px-4 py-2 rounded-md"
            >
              Create
            </Link>
          </div>
        </header>

        <main className="dark:bg-[#1a1a1a] text-black dark:text-white sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
