"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const RolePermission = require("../../controllers/v1/RolePermission.controller.js");

// List RolePermission
router.post("/", RolePermission.listRolePermission);

// Create RolePermission
router.post("/create", RolePermission.createRolePermission);

// Find One
router.post("/findone", RolePermission.getOneRolePermission);

// Update
router.post("/update", RolePermission.updateRolePermission);

// Delete
router.post("/delete", RolePermission.removeRolePermission);

module.exports = router;
