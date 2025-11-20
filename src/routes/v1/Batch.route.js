"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Batch = require("../../controllers/v1/Batch.controller.js");

// List Batches
router.get("/", Batch.listBatch);

// Create Batch
router.post("/", Batch.createBatch);

// Find one Batch by ID
router.get("/:id", Batch.getOneBatch);

// Update Batch by ID
router.put("/:id", Batch.updateBatch);

// Delete Batch by ID
router.delete("/:id", Batch.removeBatch);

module.exports = router;
