import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((anime) => anime._id ===movieId);

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
      <Link to={"/"}>
        <button>Back</button>
      </Link>      
    </div>
  );
};