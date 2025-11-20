"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const PurchaseOrderItem = require("../../controllers/v1/PurchaseOrderItem.controller.js");

// List Purchase Order Items
router.get("/", PurchaseOrderItem.listPurchaseOrderItem);

// Create Purchase Order Item
router.post("/", PurchaseOrderItem.createPurchaseOrderItem);

// Find one Purchase Order Item by ID
router.get("/:id", PurchaseOrderItem.getOnePurchaseOrderItem);

// Update Purchase Order Item by ID
router.put("/:id", PurchaseOrderItem.updatePurchaseOrderItem);

// Delete Purchase Order Item by ID
router.delete("/:id", PurchaseOrderItem.removePurchaseOrderItem);

module.exports = router;
