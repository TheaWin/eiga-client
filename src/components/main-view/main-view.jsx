import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
    //set intial value to be an empty list
    const [movies,setMovies] = useState([]);
    const [selectedMovie, setselectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser);
    const [token,setToken] = useState(storedToken);

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
                _id: anime._id,
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

      const updateUserFavorites = (movieId, isFavorite) => {
        setUser((prevUser) => {
          const updatedFavorites = isFavorite
            ? [...prevUser.favoriteMovies, movieId]
            : prevUser.favoriteMovies.filter((id) => id !== movieId);
          
          localStorage.setItem("user", JSON.stringify({...prevUser,favoriteMovies: updateUserFavorites}));
          return { ...prevUser, favoriteMovies: updatedFavorites };
        });
      };

      return (
        <>
        <BrowserRouter>
          <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          />
    
          {/* <Container> */}
            <Row className="margin-top-custom justify-content-center mb-5">
              
                <Routes>
                  <Route
                    path="/signup"
                    element={
                      user ? <Navigate to="/" /> : <SignupView />
                    }
                  />
    
                  <Route
                    path="/login"
                    element={
                      user ? (
                        <Navigate to="/" />
                      ) : (
                        <LoginView
                          onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                            localStorage.setItem("user", JSON.stringify(user));
                            localStorage.setItem("token", token);
                          }}
                        />
                      )
                    }
                  />
    
                  <Route
                    path="/anime/:movieId"
                    element={
                      !user ? (
                        <Navigate to="/login" replace />
                      ) : movies.length === 0 ? (
                        <Col> The list is empty! </Col>
                      ) : (
                        <Col>
                          <MovieView movies={movies} />
                        </Col>
                      )
                    }
                  />
    
                  <Route
                    path="/"
                    element={
                      !user ? (
                        <Navigate to="/login" replace />
                      ) : movies.length === 0 ? (
                        <Col>The list is empty!</Col>
                      ) : (
                        <>
                          {movies.map((movie) => (
                            <Col className="mb-5 col-lg-4 col-md-6 col-sm-12 card-size d-flex">
                            <MovieCard 
                              key={movie._id}
                              movie={movie}
                              updateAction={setUser}
                            />
                            </Col>
                           
                          ))}
                        </>
                      )
                    }
                  />
    
                  <Route
                    path="/user"
                    element={
                      <ProfileView
                        user={storedUser}
                        token={storedToken}
                        movies={movies}
                        setUser={setUser}
                        updateUserFavorites={updateUserFavorites}

                      />
                    }
                  />
                </Routes>
              
            </Row>
          {/* </Container> */}
          </BrowserRouter>
        </>
      )
};