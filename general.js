const express = require("express");
const axios = require("axios");

const router = express.Router();

const DESTINATIONS = [
  {
    id: 1,
    city: "Goa",
    country: "India",
    category: "Beach",
    rating: 4.8
  },
  {
    id: 2,
    city: "Manali",
    country: "India",
    category: "Mountain",
    rating: 4.7
  },
  {
    id: 3,
    city: "Tokyo",
    country: "Japan",
    category: "City",
    rating: 4.9
  }
];

/*
------------------------------------
Retrieve all destinations
------------------------------------
*/

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/api/destinations");

    if (response.status === 200) {
      return res.status(200).json(response.data);
    }

    return res.status(404).json({
      message: "No destinations found"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});

/*
------------------------------------
Retrieve destination by ID
------------------------------------
*/

router.get("/id/:id", async (req, res) => {

  try {

    const id = req.params.id;

    const response = await axios.get(
      `http://localhost:5000/api/destinations/id/${id}`
    );

    if (response.status === 200) {
      return res.status(200).json(response.data);
    }

    return res.status(404).json({
      message: "Destination not found"
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });

  }

});

/*
------------------------------------
Retrieve destinations by country
------------------------------------
*/

router.get("/country/:country", async (req, res) => {

  try {

    const country = req.params.country;

    const response = await axios.get(
      `http://localhost:5000/api/destinations/country/${country}`
    );

    if (response.status === 200) {
      return res.status(200).json(response.data);
    }

    return res.status(404).json({
      message: "Country not found"
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });

  }

});

/*
------------------------------------
Retrieve destinations by category
------------------------------------
*/

router.get("/category/:category", async (req, res) => {

  try {

    const category = req.params.category;

    const response = await axios.get(
      `http://localhost:5000/api/destinations/category/${category}`
    );

    if (response.status === 200) {
      return res.status(200).json(response.data);
    }

    return res.status(404).json({
      message: "Category not found"
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });

  }

});

/*
------------------------------------
Top Rated Destinations
------------------------------------
*/

router.get("/top-rated", async (req, res) => {

  try {

    const response = await axios.get(
      "http://localhost:5000/api/destinations/top-rated"
    );

    if (response.status === 200) {
      return res.status(200).json(response.data);
    }

    return res.status(404).json({
      message: "No destinations available"
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });

  }

});

module.exports = router;
