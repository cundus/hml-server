"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Price = require("../../controllers/v1/Price.controller.js");



router.post("/", Price.listPrice);
router.post("/create", Price.createPrice);
router.post("/findone", Price.getOnePrice);
router.post("/update", Price.updatePrice);
router.post("/delete", Price.removePrice);

module.exports = router;


