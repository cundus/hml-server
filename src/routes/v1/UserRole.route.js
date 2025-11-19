"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const UserRole = require("../../controllers/v1/UserRole.controller.js");

// List UserRole
router.post("/", UserRole.listUserRole);

// Create UserRole
router.post("/create", UserRole.createUserRole);

// Find one UserRole
router.post("/findone", UserRole.getOneUserRole);

// Update UserRole
router.post("/update", UserRole.updateUserRole);

// Delete UserRole
router.post("/delete", UserRole.removeUserRole);

module.exports = router;
