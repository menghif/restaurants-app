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

export default function Layout({ children }) {
  const [searchString, setSearchString] = useState("");
  const [activeKey, setActiveKey] = useState("/");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    setSearchString("");
    router.push(`/restaurants?borough=${encodeURIComponent(searchString)}`);
  }

  function isActive(href) {
    const { pathname } = useRouter();
    return pathname === href;
  }

  return (
    <>
      <Navbar bg="secondary" data-bs-theme="dark" expand="md">
        <Container fluid xs="auto">
          <Navbar.Brand href="/">New York Restaurants</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-between"
          >
            <Nav
              className="me-auto"
              activeKey={activeKey}
              onSelect={(selectedKey) => setActiveKey(selectedKey)}
            >
              <Nav.Link href="/restaurants" active={isActive("/restaurants")}>
                Full List
              </Nav.Link>
              <Nav.Link href="/about" active={isActive("/about")}>
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
                    variant="info"
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
