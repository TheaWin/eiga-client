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
    
          <Container>
            <Row className="justify-content-md-center">
              
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
                        <Col md={8}>
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
                            <Col className="mb-4" key={movie.id} md={3}>
                              <MovieCard movie={movie} />
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
                      />
                    }
                  />
                </Routes>
              
            </Row>
          </Container>
          </BrowserRouter>
        </>
      )
};