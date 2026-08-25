import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import { formatAddress } from "../utils/formatters";

const MapWithNoSSR = dynamic(() => import("../components/map"), {
  ssr: false,
});

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Restaurant() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: restaurant,
    error,
    isLoading,
  } = useSWR(id ? `/api/restaurant?id=${id}` : null, fetcher);

  if (error) {
    return (
      <Container className="my-3">
        <Card bg="danger" text="white">
          <Card.Body>
            <Card.Title>Error Loading Restaurant</Card.Title>
            <Card.Text>
              Unable to find restaurant with ID: {id}. Please try again.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (isLoading || !restaurant) {
    return <Loading />;
  }

  const { address, borough, cuisine, grades, name } = restaurant;
  const geoData = {
    lat: address.coord[1],
    lng: address.coord[0],
  };

  const gradeClass = (grade) => {
    switch (grade) {
      case "A":
        return "grade-card-a";
      case "B":
        return "grade-card-b";
      case "C":
        return "grade-card-c";
      default:
        return "grade-card-default";
    }
  };

  return (
    <Container>
      <div className="my-4">
        <Card>
          <Card.Body>
            <Card.Title className="fs-2">{name}</Card.Title>
            <Card.Text>{formatAddress(address)}</Card.Text>
            <div className="d-flex gap-2">
              {borough && (
                <Badge bg="light" text="dark" className="border">
                  {borough}
                </Badge>
              )}
              {cuisine && (
                <Badge bg="orange" text="dark">
                  {cuisine}
                </Badge>
              )}
            </div>
          </Card.Body>
        </Card>
        <div className="map-container">
          <MapWithNoSSR coords={geoData} />
        </div>
        <div className="grade-cards">
          {grades.length > 0 ? (
            <>
              <h2 className="fs-5 my-3">Recent Inspections</h2>
              <Row>
                {grades.slice(0, 4).map((grade, index) => (
                  <Col key={index} className="mb-2" md={3}>
                    <Card className={`h-100 grade-card ${gradeClass(grade.grade)}`}>
                      <Card.Body>
                        <div className="grade-letter">{grade.grade || "?"}</div>
                        <Card.Text className="grade-date mb-0">
                          {new Date(grade.date).toLocaleDateString()}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <p>No inspection grades available</p>
          )}
        </div>
      </div>
    </Container>
  );
}
