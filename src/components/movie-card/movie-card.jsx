import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card onClick={() => onMovieClick(movie)}>
        <Card.Img variant="top" src={movie.imageURL}/>
        <Card.Body>
          <Card.Title>{movie.Name}</Card.Title>
        </Card.Body>
      </Card>
      // <div
      //   onClick={() => {
      //     onMovieClick(movie);
      //   }}
      // >
      //   {movie.Name}
      // </div>
    );
  };

  //define all the props constraints for the movie-card
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      Name: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };

