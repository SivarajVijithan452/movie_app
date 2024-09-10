import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  // State to hold all movies and filtered movies based on the search query
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Hook to get the current location object, which contains the search query
  const location = useLocation();
  
  // Extract the search query from the URL parameters
  const query = new URLSearchParams(location.search).get('q') || '';

  // Ref for the search input to focus it when the component mounts
  const searchInputRef = useRef(null);

  // Fetch movie data when the component mounts
  useEffect(() => {
    fetch('/data/data.json')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movie data:', error));
  }, []);

  // Filter movies based on the search query whenever the query or movies change
  useEffect(() => {
    if (query) {
      setFilteredMovies(movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredMovies([]);
    }
  }, [query, movies]);

  // Focus the search input when the component mounts
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Search Results for "{query}"</h2>
      <input
        ref={searchInputRef}
        type="text"
        value={query}
        readOnly
        className="p-2 border rounded bg-gray-800 text-white mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="border rounded-lg overflow-hidden shadow-md bg-gray-800">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
                <p className="text-gray-400">{movie.year} - {movie.genre}</p>
                <p className="mt-2 text-gray-300">{movie.synopsis}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
