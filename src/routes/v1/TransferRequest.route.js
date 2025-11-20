"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const TransferRequest = require("../../controllers/v1/TransferRequest.controller.js");

// List TransferRequest
router.get("/", TransferRequest.listTransferRequest);

// Create TransferRequest
router.post("/", TransferRequest.createTransferRequest);

// Find one TransferRequest by ID
router.get("/:id", TransferRequest.getOneTransferRequest);

// Update TransferRequest by ID
router.put("/:id", TransferRequest.updateTransferRequest);

// Delete TransferRequest by ID
router.delete("/:id", TransferRequest.removeTransferRequest);

module.exports = router;
