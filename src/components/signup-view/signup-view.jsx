import React, { useState } from "react";
import { Button, Card, CardGroup, Col, Container, Form, Row } from "react-bootstrap";

//SignupView function componenent
export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState ("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: username,
      name: name,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch("https://anime-eiga-84a0980bd564.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8} lg={5}>
          <CardGroup>
            <Card className="mb-5 border border-0">
              <Card.Body>
                <Card.Title className="title-custom">Join us! Meow~</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername" className="mb-3 mt-2">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                        pattern="[a-zA-Z0-9]+"
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            "Username must have at least 3 characters and be alphanumeric."
                          )}
                      />
                    </Form.Group>

                    <Form.Group controlId="formName" className="mb-3">
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type="text" 
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password" 
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email" 
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formBirthday" className="mb-3">
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control
                        type="date" 
                        value = {birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                      />
                    </Form.Group>
                    
                    <Button type="submit" className="button-custom">
                      Submit
                    </Button>
                  </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  )
}