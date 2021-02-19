import { Card } from "react-bootstrap";
import "./About.css";

function About() {
  return (
    <Card bg="light" text="dark">
      <Card.Body>
        <Card.Title>About</Card.Title>
        <Card.Text className="about-text">
          Hi, my name is Francesco, I am currently studying computer programming
          at Seneca College.
          <br />
          You can find the code for this project on my{" "}
          <a target="_blank" rel="noreferrer" href="https://github.com/menghif">
            Github
          </a>
          .
          <br />
          This project was created using{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://create-react-app.dev/"
          >
            Create-React-App
          </a>{" "}
          and deployed on{" "}
          <a target="_blank" rel="noreferrer" href="https://vercel.com/">
            Vercel
          </a>
          .
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default About;
