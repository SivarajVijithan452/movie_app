import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

const DetailsPage = () => {
  // Retrieve the movie ID from the URL parameters
  const { id } = useParams();
  
  // State to hold the movie details
  const [movie, setMovie] = useState(null);
  
  // Context methods for managing favorites
  const { addFavorite, isFavorite } = useFavorites();

  // Fetch movie details when the component mounts or the ID changes
  useEffect(() => {
    fetch('/data/data.json')
      .then((response) => response.json())
      .then((data) => {
        // Find the selected movie based on the ID
        const selectedMovie = data.find(movie => movie.id === parseInt(id));
        setMovie(selectedMovie);
      })
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [id]);

  // Function to handle adding the movie to favorites
  const handleAddToFavorites = () => {
    if (movie) {
      addFavorite(movie);
      alert(`${movie.title} has been added to favorites.`);
    }
  };

  // Show a loading message while the movie details are being fetched
  if (!movie) {
    return <div>Loading...</div>;
  }

  // Render the movie details
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* Movie image */}
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        {/* Movie title */}
        <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
        {/* Movie release date */}
        <p className="text-lg mb-2">Release Date: {movie.releaseDate}</p>
        {/* Movie year */}
        <p className="text-lg mb-2">Year: {movie.year}</p>
        {/* Movie genre */}
        <p className="text-lg mb-2">Genre: {movie.genre}</p>
        {/* Movie rating */}
        <p className="text-lg mb-2">Rating: {movie.rating || 'N/A'}</p>
        {/* Movie synopsis */}
        <p className="text-gray-400 mb-4">{movie.synopsis}</p>
        {/* Button to add/remove movie from favorites */}
        <button
          className={`px-4 py-2 rounded ${isFavorite(movie.id) ? 'bg-yellow-300 text-gray-800' : 'bg-yellow-400 text-gray-800'} hover:bg-yellow-300`}
          onClick={handleAddToFavorites}
        >
          {isFavorite(movie.id) ? 'Added to Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
