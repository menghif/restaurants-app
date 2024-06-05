import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import Background from "../components/background";

function App() {
  return (
    <div className="d-flex justify-content-around">
      <div
        className="position-absolute d-flex align-self-center"
        style={{ zIndex: 1 }}
      >
        <Card
          className="p-4"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
        >
          <h1>Find your next favorite restaurant</h1>
          <Button
            className="btn btn-lg align-self-center"
            href="/restaurants"
            variant="orange"
          >
            Full List
          </Button>
        </Card>
      </div>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Background />
      </div>
    </div>
  );
}

export default App;
