"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Store = require("../../controllers/v1/Store.controller.js");



router.post("/", Store.listStore);
router.post("/create", Store.createStore);
router.post("/findone", Store.getOneStore);
router.post("/update", Store.updateStore);
router.post("/delete", Store.removeStore);

module.exports = router;


