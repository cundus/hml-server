"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Transactions = require("../../controllers/v1/Transactions.controller.js");

// List Transactions
router.get("/", Transactions.listTransaction);

// Create Transaction
router.post("/", Transactions.createTransaction);

// Find one Transaction by ID
router.get("/:id", Transactions.getOneTransaction);

// Update Transaction by ID
router.put("/:id", Transactions.updateTransaction);

// Delete Transaction by ID
router.delete("/:id", Transactions.removeTransaction);

module.exports = router;
