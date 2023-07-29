// import clientPromise from "../lib/mongodb";

import useSWR from 'swr';

import { useState } from "react";
import { useRouter } from "next/router";
import { Card, Table, Pagination } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
// import queryString from "query-string";
// import axios from "axios";
// import Loading from "./Loading";


const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// export async function getServerSideProps(context) {
//   try {
//     const page = context.query.page;
//     const client = await clientPromise;
//     const db = client.db("sample_restaurants");

//     const restaurants = await db
//       .collection("restaurants")
//       .find({})
//       .limit(20)
//       .skip(parseInt(page, 10))
//       .toArray();

//       return {
//         props: { restaurants: JSON.parse(JSON.stringify(restaurants)) },
//       };
//     } catch (e) {
//       console.error(e);
//       return {
//         props: { restaurants: [] }
//       };
//     }
//   }

  export default function Restaurants() {
    const [page, setPage] = useState(0);
    const router = useRouter();

    // const [loading, setLoading] = useState(true);
    const perPage = 20;

    const refreshData = () => {
      router.replace(router.asPath);
    }

    function previousPage() {
      if (page > 0) {
        setPage(page - 1);
        refreshData();
      }
    }
  
    function nextPage() {
      setPage(page + 1);
      refreshData();
    }
  
    const { data: restaurants, error } = useSWR(`/api/restaurants`, fetcher);

    if (error) {
      console.error(error);
    }
    if (!restaurants) {
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
          {page > 0 && <Pagination.Prev onClick={previousPage} />}
          <Pagination.Item>{page + 1}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      </div>
    );
  }
