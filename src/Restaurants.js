import { useEffect, useState } from "react";
import { Card, Table, Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

import "./Restaurants.css";
import Loading from "./Loading";

function Restaurants(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 10;
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

  const apiUrl = "https://restaurants-api.onrender.com/api";
  const url = `${apiUrl}/restaurants?page=${page}&perPage=${perPage}`;

  // reset page to 1 when searching for borough
  useEffect(() => {
    setPage(1);
  }, [borough]);

  useEffect(() => {
    fetch(!borough ? url : `${url}&borough=${borough}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to get Restaurants from the API");
        }
        return res.json();
      })
      .then((result) => {
        setRestaurant(result);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [borough, page, url]);

  const fetchData = async (skip) => {
    const data = JSON.stringify({
      collection: "restaurants",
      database: "sample_restaurants",
      dataSource: "Sandbox",
      projection: {
        _id: 1,
        name: 2,
      },
      limit: 10,
      skip: skip, // skip number of objects for pagination
    });

    const config = {
      method: "post",
      url: "https://data.mongodb-api.com/app/data-bnuag/endpoint/data/v1/action/find",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key":
          "UilfcgvaDKIn04CCbmTpqHaTHNwAXfFJFbH01HAklc75D5Lp7T4G4Qa0IiO1TKnw",
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(20);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!restaurant) {
    return null;
  }

  if (restaurant.length === 0) {
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
    if (page > 1) {
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
          {restaurant.map((restaurant) => (
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
        <Pagination.Prev onClick={previousPage} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </div>
  );
}

export default Restaurants;
