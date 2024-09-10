import React, { useState, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

// The Home component is memoized to avoid unnecessary re-renders
const Home = memo(() => {
  // State to hold the list of movies, selected genre, current page, and number of movies per page
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6);
  
  // Hook for navigation
  const navigate = useNavigate();
  
  // Access favorite functions from the FavoritesContext
  const { addFavorite, isFavorite } = useFavorites();

  // Fetch movie data when the component mounts
  useEffect(() => {
    fetch('/data/data.json')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movie data:', error));
  }, []);

  // Memoized filtered list of movies based on the selected genre
  const filteredMovies = useMemo(() => {
    return selectedGenre === 'All' ? movies : movies.filter(movie => movie.genre === selectedGenre);
  }, [selectedGenre, movies]);

  // Calculate indices for pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Total number of pages
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  // Memoized list of genres for filtering
  const genres = useMemo(() => ['All', ...new Set(movies.map(movie => movie.genre))], [movies]);

  // Handler for genre selection change
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setCurrentPage(1); // Reset to the first page when the genre changes
  };

  // Handler for navigating to movie details
  const handleViewClick = (id) => {
    navigate(`/explore/${id}`);
  };

  // Handler for adding a movie to favorites
  const handleAddToFavorites = (movie) => {
    addFavorite(movie);
    alert(`${movie.title} has been added to favorites.`);
  };

  // Handler for changing pages
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Movie List</h2>
      
      <div className="mb-4">
        <label htmlFor="genre" className="mr-2 text-lg font-semibold text-white">Filter by Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="p-2 border rounded bg-gray-800 text-white"
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="border rounded-lg overflow-hidden shadow-md p-4 bg-gray-800">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
            <p className="text-gray-400">{movie.year} - {movie.genre}</p>
            <p className="mt-2 text-gray-300">{movie.synopsis}</p>
            <div className="mt-4 flex space-x-2">
              {/* Button to view movie details */}
              <button
                onClick={() => handleViewClick(movie.id)}
                className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-300"
              >
                View
              </button>
              {/* Button to add movie to favorites */}
              <button
                onClick={() => handleAddToFavorites(movie)}
                className={`bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-300 ${isFavorite(movie.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isFavorite(movie.id)}
              >
                {isFavorite(movie.id) ? 'Added to Favorite' : 'Add to Favorite'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        {/* Pagination controls */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 mx-1"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded mx-1 ${currentPage === i + 1 ? 'bg-yellow-700 text-white' : 'bg-yellow-500 text-white'} hover:bg-yellow-400`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 mx-1"
        >
          &gt;
        </button>
      </div>
    </div>
  );
});

export default Home;
