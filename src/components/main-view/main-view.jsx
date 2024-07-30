import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    //set intial value to be an empty list
    const [movies,setMovies] = useState([]);

    const [selectedMovie, setselectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://anime-eiga-84a0980bd564.herokuapp.com/anime")
          .then((response) => response.json())
          .then((data) => {
            const animeFromApi = data.map((anime) => {
              return {
                _id: anime.id,
                Name: anime.Name,
                Description: anime.Description,
                imageURL: anime.imageURL,
                Genre: anime.Genre,
                Director: anime.Director,
                releaseYear: anime.releaseYear
              };
            });
            setMovies(animeFromApi);
          })
      }, []);

    if (selectedMovie) {
        return (
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setselectedMovie(null)}
          />
        );
      }
      if (movies.length === 0) {
        return <div>The list is empty!</div>;
      }
      return (
        <div>
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setselectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </div>
    );
};