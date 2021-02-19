import { Container, Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./Home.css";

function Home() {
  return (
    <Jumbotron fluid className="new-york-background">
      <Container>
        <h1>Find your next favorite restaurant</h1>
        <br />
        <LinkContainer to="/restaurants">
          <Button variant="outline-secondary">Full List</Button>
        </LinkContainer>
      </Container>
    </Jumbotron>
  );
}

export default Home;
