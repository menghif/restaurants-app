import { useEffect, useState } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import axios from "axios";

import Loading from "./Loading";
import "./Restaurant.css";

function Restaurant() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    const data = JSON.stringify({
      collection: "restaurants",
      database: "sample_restaurants",
      dataSource: "Sandbox",
      filter: {
        _id: { $oid: "5eb3d668b31de5d588f4296c" },
      },
      projection: {
        _id: 1,
        borough: 2,
      },
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
    fetchData();
  }, []);

  useEffect(() => {
    fetch(`https://web422-a1-francesco.herokuapp.com/api/restaurants/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!restaurant) {
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
      <MapContainer
        className="leaflet-map"
        style={{ height: "400px" }}
        center={[coord1, coord0]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[coord1, coord0]}></Marker>{" "}
      </MapContainer>
      <br />
      <CardDeck display="block" className="grade-cards">
        {grades.slice(0, 4).map((gr, index) => (
          <Card key={index} bg="light" text="dark" className="grade-card">
            <Card.Body>
              <Card.Title>Grade: {gr.grade}</Card.Title>
              <Card.Text>Completed: {gr.date.slice(0, 10)}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
}

export default Restaurant;
