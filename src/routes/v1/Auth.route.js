"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator");
const AuthCtrl = require("../../controllers/v1/Auth.controller");

router.post(
    "/login",
    // Validator("getInquiryStatusReconSchema"),
    AuthCtrl.login
);
router.post(
    "/register",
    // Validator("getInquiryStatusReconSchema"),
    AuthCtrl.register
);

module.exports = router;


