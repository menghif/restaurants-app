import Image from "next/image";
import background from "../public/images/florian-wehde-J6mySj3wntg-unsplash.jpg";

export default function Background() {
  return (
    <div className="h-100 position-relative">
      <Image
        src={background}
        placeholder="blur"
        alt="New York City"
        fill
        quality={50}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
