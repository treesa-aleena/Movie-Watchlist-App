import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import Watchlist from './components/Watchlist';

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/movies.json');
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleAddToWatchlist = (movie) => {
    const exists = watchlist.some((item) => item.id === movie.id);
    if (!exists) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const handleRemoveFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== id));
  };

  const filteredMovies = selectedGenre === 'All'
    ? movies
    : movies.filter((movie) => movie.genre === selectedGenre);

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Thriller', 'Romantic'];

  return (
    <div className="container">
      <header>
        <h1>Malayalam Movie Watchlist</h1>
        <p>Explore top Malayalam movies, filter by genre, and save your favorites</p>
      </header>

      <Watchlist watchlist={watchlist} onRemove={handleRemoveFromWatchlist} />

      <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #1f1f2e' }} />

      <h2>Available Movies</h2>

      <div className="filter-container">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`filter-btn ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p style={{ marginTop: '10px', color: '#9ca3af' }}>Loading movies...</p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="no-movies">
          <p>No movies found.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map((movie) => {
            const isAdded = watchlist.some((item) => item.id === movie.id);
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAdd={handleAddToWatchlist}
                isWatchlist={false}
                isAdded={isAdded}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;