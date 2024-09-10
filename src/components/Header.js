import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  // Hook to get the current location (pathname)
  const location = useLocation();
  
  // State to keep track of the active path for styling the links
  const [activePath, setActivePath] = useState(location.pathname);
  
  // State to manage the search input
  const [searchInput, setSearchInput] = useState('');
  
  // Hook to get the navigate function for programmatic navigation
  const navigate = useNavigate();

  // Update activePath state whenever location.pathname changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  // Update the URL to reflect the search input and navigate to the search page
  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  // Function to determine the styling of active navigation links
  const getLinkClassName = (path) => {
    return activePath === path
      ? 'text-yellow-400 font-semibold'  // Active link styling
      : 'text-white hover:text-gray-400 transition-colors';  // Inactive link styling
  };

  // Handle form submission for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput.trim()}`);  // Navigate to the search results page with the query
    } else {
      navigate('/');  // If the search input is empty, navigate to the home page
    }
    setSearchInput('');  // Clear the search input
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-gray-800 bg-opacity-75 shadow-md z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <h1 className="text-white text-xl font-bold">
          <NavLink to="/" className={getLinkClassName('/')} end>
            Movie Library
          </NavLink>
        </h1>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/" className={getLinkClassName('/')} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className={getLinkClassName('/favorites')}>
                Favorites
              </NavLink>
            </li>
          </ul>
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="px-2 py-1 rounded-l bg-gray-700 text-white focus:outline-none hidden lg:block"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-gray-800 px-4 py-1 rounded-r hover:bg-yellow-300 focus:outline-none"
            >
              Search
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
};

export default Header;
