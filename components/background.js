import Image from "next/image";
import background from "../public/images/florian-wehde-J6mySj3wntg-unsplash.jpg";
import styles from "../styles.module.css";

export default function Background() {
  return (
    <div className={styles.bgWrap}>
      <Image
        src={background}
        placeholder="blur"
        alt="New York City"
        sizes="100vh"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
