"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Permission = require("../../controllers/v1/Permission.controller.js");

// List Permission
router.get("/", Permission.listPermission);

// Create Permission
router.post("/create", Permission.createPermission);

// Find One Permission
router.get("/:id", Permission.getOnePermission);

// Update Permission
router.put("/:id", Permission.updatePermission);

// Delete Permission
router.delete("/:id", Permission.removePermission);

module.exports = router;
