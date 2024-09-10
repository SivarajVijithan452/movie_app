// src/App.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';  // Import custom styles
import Header from './components/Header';  // Import Header component
import Footer from './components/Footer';  // Import Footer component
import { FavoritesProvider } from './contexts/FavoritesContext';  // Import FavoritesProvider

function App() {
  return (
    <FavoritesProvider>
      <div className="flex flex-col min-h-screen">
        <Header />  {/* Render the header at the top of the page */}
        <main className="flex-grow pt-16">  {/* Container for the main content with padding */}
          <Outlet />  {/* This renders the component for the current route */}
        </main>
        <Footer className="bg-gray-800 text-white py-4 mt-auto" />  {/* Render the footer at the bottom of the page */}
      </div>
    </FavoritesProvider>
  );
}

export default App;
