"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Customer = require("../../controllers/v1/Customer.controller.js");

// List Customers
router.get("/", Customer.listCustomer);

// Create Customer
router.post("/", Customer.createCustomer);

// Find one Customer by ID
router.get("/:id", Customer.getOneCustomer);

// Update Customer by ID
router.put("/:id", Customer.updateCustomer);

// Delete Customer by ID
router.delete("/:id", Customer.removeCustomer);

module.exports = router;
