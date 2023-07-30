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
    <div>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar bg="secondary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">New York Restaurants</Navbar.Brand>
        </Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mr-auto"
            activeKey={activeKey}
            onSelect={(selectedKey) => setActiveKey(selectedKey)}
          >
            <Nav.Link href="/restaurants" active={isActive("/restaurants")}>
              <h2>Full List</h2>
            </Nav.Link>
            <Nav.Link href="/about" active={isActive("/about")}>
              <h2>About</h2>
            </Nav.Link>
          </Nav>
          <Form onSubmit={handleSubmit} className="search-box">
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

      {children}

      <footer>
        <Container>
          <Row>
            <Col>
              <p>test1</p>
            </Col>
            <Col>
              <p>test2</p>
            </Col>
            <Col>
              <p>test3</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
