// import clientPromise from "../lib/mongodb";

import useSWR from 'swr';

import { useState } from "react";
import { useRouter } from "next/router";
import { Card, Table, Pagination } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
// import queryString from "query-string";

const fetcher = (url) => fetch(url).then((res) => res.json());

  export default function Restaurants() {
    const [page, setPage] = useState(1);

    function previousPage() {
      setPage(page - 1);      
    }
  
    function nextPage() {
      setPage(page + 1);
    }
  
    const { data:restaurants, error, isLoading } = useSWR(`/api/restaurants?page=${page}`, fetcher);

    if (error) {
      console.error(error);
      return <div>FAILED TO LOAD</div>;
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Card bg="light" text="dark">
          <Card.Body>
            <Card.Title>Restaurant List</Card.Title>
            <Card.Text>
              Full list of restaurants. Optionally sorted by borough.
            </Card.Text>
          </Card.Body>
        </Card>
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
              <tr key={restaurant._id}>
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
      </div>
    );
  }
