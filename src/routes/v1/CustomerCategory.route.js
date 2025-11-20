"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const CustomerCategory = require("../../controllers/v1/CustomerCategory.controller.js");

// List Customer Categories
router.get("/", CustomerCategory.listCustomerCategory);

// Create Customer Category
router.post("/", CustomerCategory.createCustomerCategory);

// Find one Customer Category by ID
router.get("/:id", CustomerCategory.getOneCustomerCategory);

// Update Customer Category by ID
router.put("/:id", CustomerCategory.updateCustomerCategory);

// Delete Customer Category by ID
router.delete("/:id", CustomerCategory.removeCustomerCategory);

module.exports = router;
