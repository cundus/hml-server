"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const PurchaseOrder = require("../../controllers/v1/PurchaseOrder.controller.js");

// List Purchase Orders
router.get("/", PurchaseOrder.listPurchaseOrder);

// Create Purchase Order
router.post("/", PurchaseOrder.createPurchaseOrder);

// Find one Purchase Order by ID
router.get("/:id", PurchaseOrder.getOnePurchaseOrder);

// Update Purchase Order by ID
router.put("/:id", PurchaseOrder.updatePurchaseOrder);

// Delete Purchase Order by ID
router.delete("/:id", PurchaseOrder.removePurchaseOrder);

module.exports = router;
