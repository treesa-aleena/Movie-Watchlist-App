import React from 'react';
import MovieCard from './MovieCard';

function Watchlist({ watchlist, onRemove }) {
  return (
    <div>
      <h2>My Watchlist ({watchlist.length})</h2>
      {watchlist.length === 0 ? (
        <div className="no-movies">
          <p>Your watchlist is empty.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={onRemove}
              isWatchlist={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;