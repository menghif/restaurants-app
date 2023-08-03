import { Card } from "react-bootstrap";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loading from "../components/loading";

const MapWithNoSSR = dynamic(() => import("../components/map"), {
  ssr: false,
});

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Restaurant() {
  const router = useRouter();
  const { query } = router;

  const {
    data: restaurant,
    error,
    isLoading,
  } = useSWR(`/api/restaurant?id=${query.id}`, fetcher);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Card bg="light" text="dark">
        <Card.Body>
          <Card.Title>Unable to find restaurant with ID: {id}</Card.Title>
          <Card.Text>Please try again</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const coord0 = restaurant.address.coord[0];
  const coord1 = restaurant.address.coord[1];
  const grades = restaurant.grades;

  const geoData = { lat: coord1, lng: coord0 };

  return (
    <div>
      <Card bg="light" text="dark">
        <Card.Body>
          <Card.Title className="title-card">{restaurant.name}</Card.Title>
          <Card.Text>
            {`${restaurant.address.building} ${restaurant.address.street}`}
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
      <MapWithNoSSR coords={geoData} />
      <br />
      <div display="block" className="grade-cards">
        {grades.slice(0, 4).map((gr, index) => (
          <Card key={index} bg="light" text="dark" className="grade-card">
            <Card.Body>
              <Card.Title>Grade: {gr.grade}</Card.Title>
              <Card.Text>Completed: {gr.date.slice(0, 10)}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
