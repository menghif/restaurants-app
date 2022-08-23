/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Francesco Menghi Student ID: 141758193 Date: January 13th 2021
 * Heroku Link: https://web422-a1-francesco.herokuapp.com/
 * ********************************************************************************/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// Load the dotenv module and have it read your .env file
require("dotenv").config();
// Obtain the value of the MONGODB_CONN_STRING from the environment
const { MONGODB_CONN_STRING } = process.env;

const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB(MONGODB_CONN_STRING);

app.get("/", (req, res) => {
  res.json({ message: "API Listening" });
});

app.post("/api/restaurants", (req, res) => {
  db.addNewRestaurant(req.body)
    .then((data) => {
      res.status(201).json({ message: data });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

app.get("/api/restaurants/", (req, res) => {
  const page = req.query.page;
  const perPage = req.query.perPage;
  const borough = req.query.borough;
  db.getAllRestaurants(page, perPage, borough)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(400).json({ message: "No restaurants found" });
    });
});

app.get("/api/restaurants/:id", (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((data) => {
      if (data !== null) {
        res.json(data);
      } else {
        res.status(404).json({ message: "No restaurant found" });
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

app.put("/api/restaurants/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  db.updateRestaurantById(body, id)
    .then((data) => {
      res.json({ message: data });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

app.delete("/api/restaurants/:id", (req, res) => {
  // check if restaurant exists with getRestaurantById before calling deleteRestaurantById
  db.getRestaurantById(req.params.id).then((data) => {
    if (data !== null) {
      db.deleteRestaurantById(req.params.id).then((data) => {
        res.json({ message: data });
      });
    } else {
      res.status(404).json({ message: "No restaurant found" });
    }
  });
});

db.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
