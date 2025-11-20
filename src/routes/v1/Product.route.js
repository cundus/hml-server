"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Product = require("../../controllers/v1/Product.controller.js");



router.get("/", Product.listProduct);
router.post("/create", Product.createProduct);
router.get("/:id", Product.getOneProduct);
router.put("/:id", Product.updateProduct);
router.delete("/:id", Product.removeProduct);

module.exports = router;


