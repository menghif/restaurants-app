import { useEffect, useState } from "react";
import { Card, Table, Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

import "./Restaurants.css";
import Loading from "./Loading";

function Restaurants(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const perPage = 10;
  const apiKey = process.env.REACT_APP_MONGODB_CONN_STRING;

  let history = useHistory();
  let query = queryString.parse(props.query);
  let borough = query.borough;

  if (borough) {
    // change text to lowercase with first letter of each word uppercase
    // to be able to match the borough from the MongoDB Restaurants database.
    function capitalizeWords(str) {
      const strArr = str.toLowerCase().split(" ");
      const newArr = strArr.map((word) => {
        return word[0].toUpperCase() + word.substr(1, word.length);
      });
      return newArr.join(" ");
    }
    borough = capitalizeWords(borough);
  }

  // reset page to 0 when searching for borough
  useEffect(() => {
    setPage(0);
  }, [borough]);

  const fetchData = async (page, borough, apiKey) => {
    const data = JSON.stringify({
      collection: "restaurants",
      database: "sample_restaurants",
      dataSource: "Sandbox",
      projection: {
        _id: 1,
        name: 2,
        borough: 3,
        cuisine: 4,
        address: 5,
        grades: 6,
      },
      filter: {
        borough: borough,
      },
      limit: perPage,
      skip: page, // skip number of objects for pagination
    });

    const config = {
      method: "post",
      url: "https://data.mongodb-api.com/app/data-bnuag/endpoint/data/v1/action/find",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      data: data,
    };

    try {
      const res = await axios(config);
      setRestaurants(res.data.documents);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(page * perPage, borough, apiKey);
  }, [page, borough, apiKey]);

  if (loading) {
    return <Loading />;
  }

  if (!restaurants) {
    return null;
  }

  if (restaurants.length === 0) {
    return (
      <Card bg="light" text="dark">
        <Card.Body>
          <Card.Title>No Restaurants Found</Card.Title>
          <Card.Text>Please try again</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  function previousPage() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    setPage(page + 1);
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
            <tr
              key={restaurant._id}
              onClick={() => {
                history.push(`/restaurant/${restaurant._id}`);
              }}
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
        {page > 0 && <Pagination.Prev onClick={previousPage} />}
        <Pagination.Item>{page + 1}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </div>
  );
}

export default Restaurants;
