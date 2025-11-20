"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const ProductLocation = require("../../controllers/v1/ProductLocation.controller.js");

// List Product Locations
router.get("/", ProductLocation.listProductLocation);

// Create Product Location
router.post("/", ProductLocation.createProductLocation);

// Find one Product Location by ID
router.get("/:id", ProductLocation.getOneProductLocation);

// Update Product Location by ID
router.put("/:id", ProductLocation.updateProductLocation);

// Delete Product Location by ID
router.delete("/:id", ProductLocation.removeProductLocation);

module.exports = router;
