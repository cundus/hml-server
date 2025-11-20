"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const ProductPrice = require("../../controllers/v1/ProductPrice.controller.js");



router.get("/", ProductPrice.listProductPrice);
router.post("/create", ProductPrice.createProductPrice);
router.get("/:id", ProductPrice.getOneProductPrice);
router.put("/:id", ProductPrice.updateProductPrice);
router.delete("/:id", ProductPrice.removeProductPrice);

module.exports = router;


