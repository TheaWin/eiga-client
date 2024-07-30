export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.imageURL} alt="movie cover" />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Name}</span>
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
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };