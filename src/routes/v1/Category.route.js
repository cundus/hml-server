"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Category = require("../../controllers/v1/Category.controller.js");

// List Categories
router.get("/", Category.listCategory);

// Create Category
router.post("/", Category.createCategory);

// Find one Category by ID
router.get("/:id", Category.getOneCategory);

// Update Category by ID
router.put("/:id", Category.updateCategory);

// Delete Category by ID
router.delete("/:id", Category.removeCategory);

module.exports = router;
