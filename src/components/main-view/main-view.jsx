import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
    //set intial value to be an empty list
    const [movies,setMovies] = useState([]);
    const [selectedMovie, setselectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token,setToken] = useState(null);

    useEffect(() => {
      if(!token) {
        return;
      }

        fetch("https://anime-eiga-84a0980bd564.herokuapp.com/anime", {
          headers: {Authorization: `Bearer ${token}`}
        })
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
      }, [token]);

    if (!user) {
      return ( 
      <>
      <LoginView onLoggedIn={(user,token) => {
        setUser(user);
        setToken(token);
      }} />
      or
      <SignupView />
      </>
      );
    }
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
          <button onClick={() => {setUser(null); setToken(null); localStorage.clear();}}>
            Logout
          </button>  
        </div>
    );
};