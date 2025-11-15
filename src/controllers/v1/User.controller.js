"use strict";

const Users = require("../../models/v1/User.model");
const sendResponse = require("../../utils/Response");

exports.listUsers = async (req, res) => {
    try {
        const { page, rowPerPage } = req.query;

        const rows = await Users.list(page, rowPerPage);
        if (rows?.err) throw new Error(rows.err);

        return sendResponse(req, res, "00", { data: rows });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

// CREATE USER
exports.createUser = async (req, res) => {
    try {
        const { username, password, role, branchId } = req.body;

        const newUser = await Users.create({ username, password, role, branchId });
        if (newUser?.err) throw new Error(newUser.err);

        return sendResponse(req, res, "00", { data: newUser });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

// GET ONE USER
exports.getUser = async (req, res) => {
    try {
        const { id } = req.body
        const user = await Users.findById(id);
        if (!user) return sendResponse(req, res, "03", { message: "User not found" });

        return sendResponse(req, res, "00", { data: user });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const { username, password, role, branchId } = req.body;
        const updated = await Users.update(username, password, role, branchId);
        if (updated?.err) throw new Error(updated.err);

        return sendResponse(req, res, "00", { data: updated });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.body
        await Users.remove(userId);

        return sendResponse(req, res, "00", { message: "Deleted success" });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};
