import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
  Col,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";

function BrandIcon() {
  return (
    <svg
      className="navbar-brand-icon"
      width="22"
      height="22"
      viewBox="0 0 4 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 2v9" />
      <path d="M4 2v5a3 3 0 0 0 6 0V2" />
      <path d="M7 11v11" />
    </svg>
  );
}

export default function Layout({ children }) {
  const [searchString, setSearchString] = useState("");
  const router = useRouter();
  const { pathname } = router;

  function handleSubmit(e) {
    e.preventDefault();
    setSearchString("");
    router.push(`/restaurants?borough=${encodeURIComponent(searchString)}`);
  }

  return (
    <>
      <Navbar className="app-navbar" data-bs-theme="dark" expand="md">
        <Container fluid xs="auto">
          <Navbar.Brand href="/">
            <BrandIcon />
            New York Restaurants
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-between"
          >
            <Nav className="me-auto">
              <Nav.Link
                href="/restaurants"
                active={pathname === "/restaurants"}
              >
                Full List
              </Nav.Link>
              <Nav.Link href="/about" active={pathname === "/about"}>
                About
              </Nav.Link>
            </Nav>
            <Form onSubmit={handleSubmit} className="search-box">
              <Row xs="auto">
                <Col xs="auto">
                  <FormControl
                    type="text"
                    data-bs-theme="light"
                    placeholder="Borough"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                  />
                </Col>
                <Col xs="auto" className="search-button-col">
                  <Button
                    type="submit"
                    variant="orange"
                    className="search-button"
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {children}
    </>
  );
}
