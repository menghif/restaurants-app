import useSWR from "swr";
import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Pagination,
  Container,
  Alert,
  Badge,
} from "react-bootstrap";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import { formatAddress, capitalizeWords, truncate } from "../utils/formatters";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Restaurants() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { borough: rawBorough } = router.query;

  const borough = rawBorough ? capitalizeWords(rawBorough) : "";

  useEffect(() => {
    setPage(1);
  }, [borough]);

  const { data, error, isLoading } = useSWR(
    `/api/restaurants?page=${page}&borough=${borough}`,
    fetcher
  );

  const restaurants = data?.restaurants || [];
  const totalPages = data?.totalPages || 1;

  const RestaurantRow = ({ restaurant }) => {
    if (!restaurant) return null;

    return (
      <tr
        onClick={() =>
          router.push(`/restaurant?id=${restaurant.restaurant_id}`)
        }
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
      >
        <td>{restaurant?.name || "N/A"}</td>
        <td>
          {restaurant?.address ? formatAddress(restaurant.address) : "N/A"}
        </td>
        <td>
          {restaurant?.borough ? (
            <Badge bg="light" text="dark" className="border">
              {restaurant.borough}
            </Badge>
          ) : (
            "N/A"
          )}
        </td>
        <td>
          {restaurant?.cuisine ? (
            <Badge bg="orange" text="dark">
              {truncate(restaurant.cuisine, 20)}
            </Badge>
          ) : (
            "N/A"
          )}
        </td>
      </tr>
    );
  };

  return (
    <Container className="container">
      <div className="my-4">
        <Card bg="light" text="dark">
          <Card.Body>
            <Card.Title className="fs-3">Restaurant List</Card.Title>
            <Card.Text>
              Full list of restaurants. Optionally sorted by borough.
              {borough && ` Currently showing: ${borough}`}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      {error && (
        <Alert variant="danger">
          Failed to load restaurants: {error.message}
        </Alert>
      )}

      {isLoading ? (
        <Loading />
      ) : restaurants.length === 0 ? (
        <Alert variant="info">
          No restaurants found. {borough && "Try changing the borough filter."}
        </Alert>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive="sm"
            className="restaurant-table"
          >
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
                <RestaurantRow
                  key={restaurant?._id || Math.random()}
                  restaurant={restaurant}
                />
              ))}
            </tbody>
          </Table>

          <div className="d-flex flex-column align-items-center gap-2">
            <Pagination className="justify-content-center mb-0">
              <Pagination.Prev
                onClick={() => setPage((p) => p - 1)}
                disabled={page <= 1}
              />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages}
              />
            </Pagination>
            <span className="pagination-summary">
              Page {page} of {totalPages}
            </span>
          </div>
        </>
      )}
    </Container>
  );
}
