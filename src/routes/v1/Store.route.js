"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator.js");
const Store = require("../../controllers/v1/Store.controller.js");



router.get("/", Store.listStore);
router.post("/create", Store.createStore);
router.get("/:id", Store.getOneStore);
router.put("/:id", Store.updateStore);
router.delete("/:id", Store.removeStore);

module.exports = router;


