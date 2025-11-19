"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Permission = require("../../controllers/v1/Permission.controller.js");

// List Permission
router.post("/", Permission.listPermission);

// Create Permission
router.post("/create", Permission.createPermission);

// Find One Permission
router.post("/findone", Permission.getOnePermission);

// Update Permission
router.post("/update", Permission.updatePermission);

// Delete Permission
router.post("/delete", Permission.removePermission);

module.exports = router;
