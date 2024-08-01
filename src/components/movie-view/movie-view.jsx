import { Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.imageURL} alt="movie cover" />
        </div>
        <div>
          <span>Title: </span>
          <h1>{movie.Name}</h1>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre}</span>
        </div>
        <div>
          <span>Year: </span>
          <span>{movie.releaseYear}</span>
        </div>
        <Button onClick={onBackClick} className="back-button">
          Back
        </Button>      
      </div>
    );
  };