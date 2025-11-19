"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator");
const UserCtrl = require("../../controllers/v1/User.controller.js");

router.post(
    "/",
    // Validator("getInquiryStatusReconSchema"),
    UserCtrl.listUsers
);
router.post("/update", UserCtrl.updateUser);
router.post("/delete", UserCtrl.deleteUser);

module.exports = router;


