import React from 'react';

function MovieCard({ movie, onAdd, onRemove, isWatchlist, isAdded }) {
  const { title, genre, year, rating } = movie;

  return (
    <div className="movie-card">
      <div>
        <h3>{title}</h3>
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Rating:</strong> ⭐ {rating}/10</p>
        <span className="genre-tag">{genre}</span>
      </div>

      <div>
        {!isWatchlist ? (
          <button
            className={`add-btn ${isAdded ? 'added-btn' : ''}`}
            onClick={() => !isAdded && onAdd(movie)}
            disabled={isAdded}
          >
            {isAdded ? 'Added' : 'Add to Watchlist'}
          </button>
        ) : (
          <button
            className="remove-btn"
            onClick={() => onRemove(movie.id)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;