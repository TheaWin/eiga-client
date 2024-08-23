import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Img from "../img/logo.png";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg">
      <Container>

        <Navbar.Brand as={Link} to="/" className="align-bottom navbar-style">
          <img src={Img} height="80px" alt="logo image" className="d-inline-block aligh-top"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end d-flex flex-grow-1">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                {/* <Nav.Item> */}
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={`/user`}>
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" onClick={onLoggedOut}>Logout</Nav.Link>
                {/* </Nav.Item> */}
                {location.pathname !== "/user" && (
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => onSearch(e.target.value)}
                    />
                  </Form>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};