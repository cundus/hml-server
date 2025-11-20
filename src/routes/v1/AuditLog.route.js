"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const AuditLog = require("../../controllers/v1/AuditLog.controller.js");

// List AuditLogs
router.get("/", AuditLog.listAuditLog);

// Create AuditLog
router.post("/", AuditLog.createAuditLog);

// Find one AuditLog by ID
router.get("/:id", AuditLog.getOneAuditLog);

// Update AuditLog by ID
router.put("/:id", AuditLog.updateAuditLog);

// Delete AuditLog by ID
router.delete("/:id", AuditLog.removeAuditLog);

module.exports = router;
