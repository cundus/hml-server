"use strict";

const Users = require("../../models/v1/User.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST USERS
 */
exports.listUsers = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Users.list(Page, RowsPerPage);
        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry.results,
            pagination: resQry?.pagination,
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE USER
 */
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; // bisa pakai email juga jika id tidak ada
        const { name, email, password, store_id, deviceId } = req.body;

        const resQry = await Users.update(id, name, email, password, store_id, deviceId);

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry?.results || resQry.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: resQry });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE USER
 */
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // gunakan path param agar RESTful
        const removed = await Users.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: removed,
            message: "User deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
