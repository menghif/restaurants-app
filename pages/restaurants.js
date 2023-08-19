import useSWR from "swr";

import { useState } from "react";
import { Card, Table, Pagination, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import Loading from "../components/loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Restaurants() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { query } = router;

  function previousPage() {
    setPage(page - 1);
  }

  function nextPage() {
    setPage(page + 1);
  }

  const handleRedirect = (id) => () => {
    router.push(`/restaurant?id=${id}`);
  };

  function capitalizeWords(str) {
    const strArr = str.toLowerCase().split(" ");
    const newArr = strArr.map((word) => {
      return word[0].toUpperCase() + word.substr(1, word.length);
    });
    return newArr.join(" ");
  }

  let borough = query.borough || "";
  if (borough) {
    borough = capitalizeWords(borough);
  }

  const {
    data: restaurants,
    error,
    isLoading,
  } = useSWR(`/api/restaurants?page=${page}&borough=${borough}`, fetcher);

  if (error) {
    console.error(error);
    return <div>FAILED TO LOAD</div>;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="my-3">
        <Card bg="light" text="dark">
          <Card.Body>
            <Card.Title className="fs-3">Restaurant List</Card.Title>
            <Card.Text>
              Full list of restaurants. Optionally sorted by borough.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Borough</th>
            <th>Cuisine</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr
              key={restaurant._id}
              onClick={handleRedirect(restaurant.restaurant_id)}
            >
              <td>{restaurant.name}</td>
              <td>
                {restaurant.address.building} {restaurant.address.street}
              </td>
              <td>{restaurant.borough}</td>
              <td>{restaurant.cuisine}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {page > 1 && <Pagination.Prev onClick={previousPage} />}
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </Container>
  );
}
