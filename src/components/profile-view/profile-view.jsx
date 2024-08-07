import React, { useState, useEffect } from "react";
import { Button, Card, CardGroup, Col, Container, Form, Row } from "react-bootstrap";

import "./profile-view.scss";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({user, token, movies, setUser, updateUserFavorites}) => {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [edit, setEdit] = useState(false);
  
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setName(user.name);
      setEmail(user.email);
      setBirthday(user.birthday);
    }
  }, [user]);

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
                <Button onClick={handleEdit}>Edit</Button>
                <Button variant="danger" onClick={handleDelete}>
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
      <Container>
              {user.favoriteMovies && user.favoriteMovies.length > 0 ? (
                user.favoriteMovies.map((movieId) => {
                  const movie = movies.find((m) => m._id === movieId);
                  return (
                    <Col
                      key={movieId}>
                        <MovieCard
                         movie={movie}
                         token={token}
                         setUser={setUser}
                         user={user}
                         updateUserFavorites={updateUserFavorites}
                      />
                    </Col>                      
                  ) ; null ;
                })
              ) : (
                <p>No favorite movies found.</p>
              )}
            </Container>
      </Card>
      </Col>          
    </Row>
    </Container>
  )
}
