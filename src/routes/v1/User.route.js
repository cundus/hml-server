"use strict";

const express = require("express");
const router = express.Router();
const Validator = require("../../middlewares/Validator");
const UserCtrl = require("../../controllers/v1/User.controller.js");

router.get(
    "/",
    // Validator("getInquiryStatusReconSchema"),
    UserCtrl.listUsers
);
router.put("/:id", UserCtrl.updateUser);
router.delete("/:id", UserCtrl.deleteUser);

module.exports = router;


