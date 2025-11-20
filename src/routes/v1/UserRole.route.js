"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const UserRole = require("../../controllers/v1/UserRole.controller.js");

// List UserRole
router.get("/", UserRole.listUserRole);

// Create UserRole
router.get("/", UserRole.createUserRole);

// Find one UserRole by ID
router.get("/:id", UserRole.getOneUserRole);

// Update UserRole by ID
router.put("/:id", UserRole.updateUserRole);

// Delete UserRole by ID
router.delete("/:id", UserRole.removeUserRole);

module.exports = router;
