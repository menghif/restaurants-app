import { Button, Container } from "react-bootstrap";
import Link from "next/link";
import styles from "../styles.module.css";
import Background from "../components/background";

function App() {
  return (
    <div className={styles.bgWrap}>
      <h1>Find your next favorite restaurant</h1>
      <Link href="/restaurants">
        <Button variant="outline-secondary">Full List</Button>
      </Link>
      <Background />
    </div>
  );
}

export default App;
