import { Button, Card } from "react-bootstrap";
import Background from "../components/background";

function App() {
  return (
    <div className="d-flex justify-content-around">
      <div
        className="position-absolute d-flex align-self-center px-3"
        style={{ zIndex: 1 }}
      >
        <Card className="hero-card p-4">
          <h1 className="hero-title">Find your next favorite restaurant</h1>
          <p className="hero-subtitle">
            Browse NYC restaurants by borough and cuisine, with health
            inspection grades at a glance.
          </p>
          <Button
            className="btn btn-lg align-self-start"
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
