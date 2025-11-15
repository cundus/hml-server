"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator");
const Branch = require("../../controllers/v1/Branch.controller.js");



router.post("/", Branch.listBranch);
router.post("/create", Branch.createBranch);
router.post("/findone", Branch.getOneBranch);
router.post("/update", Branch.updateBranch);
router.post("/delete", Branch.removeBranch);

module.exports = router;


