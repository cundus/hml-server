"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const TransferItem = require("../../controllers/v1/TransferItem.controller.js");

// List TransferItems
router.get("/", TransferItem.listTransferItem);

// Create TransferItem
router.post("/", TransferItem.createTransferItem);

// Find one TransferItem by ID
router.get("/:id", TransferItem.getOneTransferItem);

// Update TransferItem by ID
router.put("/:id", TransferItem.updateTransferItem);

// Delete TransferItem by ID
router.delete("/:id", TransferItem.removeTransferItem);

module.exports = router;
