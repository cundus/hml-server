"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Role = require("../../controllers/v1/Role.controller.js");

// List Role
router.get("/", Role.listRole);

// Create Role
router.post("/create", Role.createRole);

// Find one Role
router.get("/:id", Role.getOneRole);

// Update Role
router.put("/:id", Role.updateRole);

// Delete Role
router.delete("/:id", Role.removeRole);

module.exports = router;
