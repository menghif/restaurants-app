import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Route, Switch, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import About from "./About";
import Restaurant from "./Restaurant";
import Restaurants from "./Restaurants";
import Home from "./Home";
import NotFound from "./NotFound";

function App() {
  const [searchString, setSearchString] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    history.push(`/restaurants?borough=${searchString}`);
    setSearchString("");
  }

  return (
    <>
      <Navbar bg="secondary" variant="dark" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline className="search-box">
            <FormControl
              type="text"
              placeholder="Borough"
              className="mr-sm-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <Button type="submit" variant="info" className="search-button">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>

              <Route
                path="/restaurants"
                render={(props) => (
                  <Restaurants query={props.location.search} page="1" />
                )}
              />

              <Route path="/restaurant/:id">
                <Restaurant />
              </Route>

              <Route exact path="/">
                <Home />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
      <br />
    </>
  );
}

export default App;
