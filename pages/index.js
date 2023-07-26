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

      <style>{`
      body {
        background-color: #eceff4;
      }
      
      nav {
        box-shadow: 0 3px 5px lightgray;
        margin-bottom: 40px;
      }
      
      .navbar-brand {
        color: whitesmoke;
        margin-right: 30px;
        font-style: italic;
        font-weight: 700;
        font-size: 1.4em;
        font-family: sans-serif;
        text-shadow: 1.5px 1.5px 0.5px #138496;
      }
      
      @media (max-width: 575px) {
        .search-box {
          flex-direction: column;
          margin: 5px 0;
        }
      
        .search-button {
          margin-top: 10px;
        }
      }
      
      `}</style>
    </>
  );
}

export default App;
