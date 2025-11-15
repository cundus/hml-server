"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Product = require("../../controllers/v1/Product.controller.js");



router.post("/", Product.listProduct);
router.post("/create", Product.createProduct);
router.post("/findone", Product.getOneProduct);
router.post("/update", Product.updateProduct);
router.post("/delete", Product.removeProduct);

module.exports = router;


