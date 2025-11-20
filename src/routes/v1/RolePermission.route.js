"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const RolePermission = require("../../controllers/v1/RolePermission.controller.js");

// List RolePermission
router.get("/", RolePermission.listRolePermission);

// Create RolePermission
router.post("/create", RolePermission.createRolePermission);

// Find One
router.get("/:id", RolePermission.getOneRolePermission);

// Update
router.put("/:id", RolePermission.updateRolePermission);

// Delete
router.delete("/:id", RolePermission.removeRolePermission);

module.exports = router;
