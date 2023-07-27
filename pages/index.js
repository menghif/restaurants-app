import { Button, Container } from "react-bootstrap";

import DashboardLayout from "./layout";
import Link from "next/link";

// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
      <DashboardLayout />
      <Container fluid className="new-york-background">
        <Container>
          <h1>Find your next favorite restaurant</h1>
          <br />
          <Link href="/restaurants">
            <Button variant="outline-secondary">Full List</Button>
          </Link>
        </Container>
      </Container>
      <br />
    </>
  );
}

export default App;
