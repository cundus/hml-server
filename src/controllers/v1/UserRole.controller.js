"use strict";

const UserRole = require("../../models/v1/UserRole.model");
const sendResponse = require("../../utils/Response");

exports.listUserRole = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await UserRole.list({
            Page, RowsPerPage
        });

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            pagination: resQry?.pagination,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

exports.createUserRole = async (req, res) => {
    try {
        const {
            user_id, role_id, device_id,
        } = req.body;

        const resQry = await UserRole.create(
            user_id, role_id, device_id,
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry?.err);
        if (resQry?.results.length == 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry?.results,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};
exports.getOneUserRole = async (req, res) => {
    try {
        const { id } = req.body

        const UserRole = await UserRole.findById(id);

        if (!UserRole) {
            return sendResponse(req, res, "03", {
                message: "UserRole not found",
            });
        }

        return sendResponse(req, res, "00", { data: UserRole });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { id, user_id, role_id, device_id } = req.body

        const updated = await UserRole.update(id, user_id, role_id, device_id
        );

        return sendResponse(req, res, "00", { data: updated });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.removeUserRole = async (req, res) => {
    try {
        const { id } = req.body

        await UserRole.remove(id);

        return sendResponse(req, res, "00", {
            message: "UserRole deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
