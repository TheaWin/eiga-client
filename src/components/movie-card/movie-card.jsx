import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Name}
      </div>
    );
  };

  //define all the props constraints for the movie-card
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      Name: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };

