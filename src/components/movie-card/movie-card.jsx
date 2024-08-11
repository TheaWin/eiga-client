import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, updateAction}) => {

  const [favorite, setFavorite] = useState(false);
  const movieId = movie._id;

  if(!movie) {
    return null;
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(user && user.favoriteMovies && user.favoriteMovies.includes(movieId)) {
      setFavorite(true);
    }
  }, [movieId]);
    
  const handleAddFavorite = async (movieId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`https://anime-eiga-84a0980bd564.herokuapp.com/users/${user.username}/${movie._id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if(response.status === 401) throw new Error('Unauthorized');
        throw new Error ('Meow...T_T I can\'t seem to add it to your favorites' );
      }

      const updateUserFavorites = await response.json();
      localStorage.setItem('user', JSON.stringify(updateUserFavorites));
      setFavorite(true);
      updateAction(movieId);
      console.log('yayyy. task done~~~')
    } catch (error) {
      console.log(
        `An error occured: ${error.message}`
      );
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch (`https://anime-eiga-84a0980bd564.herokuapp.com/users/${user.username}/${movie._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized');
        throw new Error('Meow...T_T I can\'t seem to remove it from your favorites');
      }

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setFavorite(false);
      updateAction(movieId);
      console.log('eliminated~~~~')
    } catch (error) {
      console.log (`An error occured: ${error.message}`);
  }
};

  return (
      <Container>
      <Card className="border-0 h-100 justify-content-center card-custom">
        <Card.Img src={movie.imageURL} className="img" />
        <Card.Body className="d-flex flex-column p-2">
          <Row className="align-items-center">
            <Col xs="auto" className="flex-grow-1">
              <Link to={`/anime/${encodeURIComponent(movie._id)}`}>
                <Button
                  className="w-100 button-custom"
                  variant="primary"
                >
                  More...
                </Button>
              </Link>
            </Col>

            <Col className="col-auto">
              {favorite ? (
                <Button
                  variant="link"
                  onClick={() => handleRemoveFavorite(movie._id)}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="red"
                      class="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                </Button>
              ) : (
                <Button
                  variant="link"
                  onClick={ () => handleAddFavorite(movie._id)}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"          
                      fill="red"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
    </Card>
    </Container>
  );
};

  //define all the props constraints for the movie-card
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
  updateAction: PropTypes.func.isRequired,
};

