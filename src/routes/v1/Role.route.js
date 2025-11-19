"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Role = require("../../controllers/v1/Role.controller.js");

// List Role
router.post("/", Role.listRole);

// Create Role
router.post("/create", Role.createRole);

// Find one Role
router.post("/findone", Role.getOneRole);

// Update Role
router.post("/update", Role.updateRole);

// Delete Role
router.post("/delete", Role.removeRole);

module.exports = router;
