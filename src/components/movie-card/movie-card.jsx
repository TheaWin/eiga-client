import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, updateUserFavorites }) => {
  const isFavorite = user && user.favoriteMovies ? user.favoriteMovies.includes(movie._id) : false; // Check if user and favoriteMovies exist
  const [favorite, setFavorite] = useState(isFavorite);
    
  const handleFavoriteToggle = () => {
    const url = `https://anime-eiga-84a0980bd564.herokuapp.com/users/${user.username}/${movie._id}`;
    const method = favorite ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(response.ok) {
          setFavorite(!favorite);
          updateUserFavorites(movie._id, !favorite);
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <Col
      key={movie._id}
      className="mb-5 col-xl-3 col-lg-4 col-md-6 col-sm-12 card-size d-flex"
    >
      <Container>
      <Card className="border-0 h-100 justify-content-center card-custom">
        <Card.Img src={movie.imageURL} className="img" />
        <Card.Body className="d-flex flex-column p-2">
          <Row className="align-items-center no-gutters">
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
                  onClick={handleFavoriteToggle}
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
                  onClick={handleFavoriteToggle}
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
    </Col>
  );
};

  //define all the props constraints for the movie-card
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  // updateUserFavorites: PropTypes.func.isRequired,
};

