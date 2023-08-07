import { Card, Button, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <div className="d-flex justify-content-center">
      <Card className="m-4" style={{ maxWidth: "50rem" }}>
        <Card.Body>
          <Row className="mt-3">
            <Col>
              <a href="https://github.com/menghif">
                <Card.Img
                  style={{ maxWidth: "17rem" }}
                  className="mb-3"
                  src="https://avatars.githubusercontent.com/u/53121061?v=4"
                />
              </a>
            </Col>
            <Col sm={8}>
              <Card.Title>About</Card.Title>
              <Card.Text className="about-text">
                Hello, my name is Francesco 👋
                <br />
                <br />I made this app using the{" "}
                <a href="https://nextjs.org/">Next.js</a> framework. The layout
                was built using{" "}
                <a href="https://react-bootstrap.github.io">React-Bootstrap</a>{" "}
                components and the restaurants' information comes from the{" "}
                <a href="https://mongodb.com/">MongoDB</a> sample data using the{" "}
                <a href="https://www.mongodb.com/docs/atlas/app-services/data-api/">
                  Data API
                </a>{" "}
                Service. The project was deployed on{" "}
                <a href="https://vercel.com/">Vercel</a>.
              </Card.Text>
              <Button
                className="mb-3"
                href="https://github.com/menghif/restaurants-app"
                variant="primary"
              >
                Source Code
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
