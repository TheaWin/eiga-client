import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

import "./profile-view.scss";

export const ProfileView = () => {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [edit, setEdit] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setName(user.name);
      setEmail(user.email);
      setBirthday(user.birthday);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      fetch(`https://anime-eiga-84a0980bd564.herokuapp.com/users/${storedUser.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch('https://anime-eiga-84a0980bd564.herokuapp.com/anime', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const movies = await response.json();
        setMovies(movies);
        setFavMovies(movies.filter((movie) => storedUser.favoriteMovies.includes(movie._id)));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [user, token, storedUser.username, storedUser.favoriteMovies]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      name: name,
      password: password,
      email: email,
      birthday: birthday,      
    };

    //debug
    console.log(JSON.stringify(data));
    console.log(username);

    fetch(
      `https://anime-eiga-84a0980bd564.herokuapp.com/users/${user.username}`,
      {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then(async(response)=> {
        console.log("response:", response);
        if(response.ok) {
          alert("Profile has been updated sucessfully! Meow ~");
          const updatedUser = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          setUser(updatedUser);
          setEdit(false);
        } else {
          const errorText = await response.text();
          console.log("Error response:", errorText);
          alert("Profile update has failed...meow T_T")
        }
        })
        .catch((err) => console.log("error", err));
    };

  const handleDelete = () => {
    fetch(
      `https://anime-eiga-84a0980bd564.herokuapp.com/users/${user.username}`,
      {
        method:"DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if(response.ok) {
          setUser(null);
          localStorage.clear();
          alert("Your account has been deleted... ｡°(°.◜ᯅ◝°)°｡");
          window.location.replace("/login");
        } else {
          alert("Oops! Your account couldn't be deleted. Universe says STAY! Pretty stay ( •̯́ ₃ •̯̀) ")
        }
      })
      .catch((e)=> {
        alert("Something went wrong");
      });
  };

  const updateFavMovies = (movieId) => {
    setFavMovies((prevFavMovies) =>
      prevFavMovies.filter((m) => m._id !== movieId)
    );
  };

  return (
    <Container>
    <Row className="justify-content-md-left">
      <Col md={12}>
        <Card className="profile-custom">
          <Card.Header as="h5" className="profile-header-custom">Profile</Card.Header>
          <Card.Body>
            {!edit ? (
              <>
                <p>Username: {username}</p>
                <p>Name: {name}</p>
                <p>Birthday: {birthday}</p>
                <p>Email: {email}</p>
                <Button onClick={handleEdit} className="button-custom">Edit</Button>
                <Button variant="danger" onClick={handleDelete} className="buttonDelete-custom" >
                  Delete Account
                </Button>
              </>
            ) : (
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBirthday" className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Button onClick={handleUpdate}>Save</Button>
                <Button variant="secondary" onClick={() => setEdit(false)}>
                  Cancel
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row>
      <Col>
      <Card className="profile-custom">
      <Card.Header as="h5" className="profile-header-custom">Favorite Movies</Card.Header>
      <Row>
        {favMovies.length === 0 ? (
          <p>No favorite movies saved yet!</p>
        ) : (
          favMovies.map((movie) => (
            <Col key={movie._id} className="mb-5 col-lg-4 col-md-6 col-sm-12 card-size d-flex" >
              <MovieCard movie={movie} updateAction={() => updateFavMovies(movie._id)} />
            </Col>
          ))
        )}
      </Row>
      </Card>
      </Col>          
    </Row>
    </Container>
  )
}
