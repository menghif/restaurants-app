import { Container, Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./NotFound.css";

function NotFound() {
  return (
    <Jumbotron fluid className="background">
      <Container className="message">
        <br />
        <h1>404</h1>
        <h2>Page Not Found</h2>

        <br />
        <LinkContainer to="/restaurants">
          <Button variant="outline-light">Full List</Button>
        </LinkContainer>
      </Container>
    </Jumbotron>
  );
}

export default NotFound;
