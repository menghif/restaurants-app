import { Button, Container } from "react-bootstrap";

import Link from "next/link";

function App() {
  return (
    <Container fluid className="new-york-background">
      {/* <h1>Find your next favorite restaurant</h1> */}
      <Link href="/restaurants">
        <Button variant="outline-secondary">Full List</Button>
      </Link>
    </Container>
  );
}

export default App;
