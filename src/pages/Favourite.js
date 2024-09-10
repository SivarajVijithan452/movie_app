import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

const Favorite = () => {
  // Access the favorites and removeFavorite functions from the FavoritesContext
  const { favorites, removeFavorite } = useFavorites();
  
  // Hook for navigating programmatically
  const navigate = useNavigate();

  // Function to handle removing a movie from favorites
  const handleRemoveClick = (id) => {
    removeFavorite(id);
    alert('Movie removed from favorites.'); // Alert user when a movie is removed
  };

  // Function to handle viewing movie details
  const handleViewClick = (id) => {
    navigate(`/explore/${id}`); // Navigate to the movie detail page
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Favorite Movies</h2>
      
      {/* Button to navigate back to the home page */}
      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 mb-4"
      >
        Back to Home
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.length > 0 ? (
          // Render favorite movies if there are any
          favorites.map((movie) => (
            <div key={movie.id} className="border rounded-lg overflow-hidden shadow-md p-4 bg-gray-800">
              {/* Movie image */}
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-48 object-cover mb-4"
              />
              
              {/* Movie title */}
              <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
              
              {/* Movie year and genre */}
              <p className="text-gray-400">{movie.year} - {movie.genre}</p>
              
              {/* Movie synopsis */}
              <p className="mt-2 text-gray-300">{movie.synopsis}</p>
              
              <div className="mt-4 flex justify-between">
                {/* Button to view movie details */}
                <button
                  onClick={() => handleViewClick(movie.id)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-300"
                >
                  View
                </button>
                
                {/* Button to remove movie from favorites */}
                <button
                  onClick={() => handleRemoveClick(movie.id)}
                  className="bg-red-400 text-gray-800 px-4 py-2 rounded hover:bg-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          // Message displayed if no favorite movies are present
          <p className="text-gray-500">No favorite movies added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
