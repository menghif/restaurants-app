import { Card } from "react-bootstrap";
import "./About.css";

function About() {
  return (
    <Card bg="light" text="dark">
      <Card.Body>
        <Card.Title>About</Card.Title>
        <Card.Text className="about-text">
          Ciao! My name is Francesco Menghi, I'm currently studying computer
          programming at Seneca College. I have been learning new web
          programming tools and frameworks such as React and I am very excited
          to continue to build upon this knowledge.
          <br />
          <br />
          Please let me know what I can do to improve this app!
          <br />
          You can find the code for it on my{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/menghif/restaurants-app"
          >
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
