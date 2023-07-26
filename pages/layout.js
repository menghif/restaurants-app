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

import { useState } from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  const [searchString, setSearchString] = useState("");
  const [activeKey, setActiveKey] = useState("/");

  function handleSubmit(e) {
    e.preventDefault();
    setSearchString("");
  }

  return (
    <section>
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
            <Nav.Link href="/restaurants">
              <h2>Full List</h2>
            </Nav.Link>
            <Nav.Link href="/about">
              <h2>About</h2>
            </Nav.Link>
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
          <Col></Col>
        </Row>
      </Container>

      {children}
    </section>
  );
}
