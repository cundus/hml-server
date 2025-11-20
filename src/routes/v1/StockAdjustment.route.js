"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const StockAdjustment = require("../../controllers/v1/StockAdjustment.controller.js");

// List Stock Adjustments
router.get("/", StockAdjustment.listStockAdjustment);

// Create Stock Adjustment
router.post("/", StockAdjustment.createStockAdjustment);

// Find one Stock Adjustment by ID
router.get("/:id", StockAdjustment.getOneStockAdjustment);

// Update Stock Adjustment by ID
router.put("/:id", StockAdjustment.updateStockAdjustment);

// Delete Stock Adjustment by ID
router.delete("/:id", StockAdjustment.removeStockAdjustment);

module.exports = router;
