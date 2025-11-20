"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Supplier = require("../../controllers/v1/Supplier.controller.js");

// List Suppliers
router.get("/", Supplier.listSupplier);

// Create Supplier
router.post("/", Supplier.createSupplier);

// Find one Supplier by ID
router.get("/:id", Supplier.getOneSupplier);

// Update Supplier by ID
router.put("/:id", Supplier.updateSupplier);

// Delete Supplier by ID
router.delete("/:id", Supplier.removeSupplier);

module.exports = router;
