"use strict";

const UserRoleModel = require("../../models/v1/UserRole.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST USERROLE
 */
exports.listUserRole = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await UserRoleModel.list(Page, RowsPerPage);

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.results.length === 0) return sendResponse(req, res, "03");

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
 * CREATE USERROLE
 */
exports.createUserRole = async (req, res) => {
    try {
        const { user_id, role_id, device_id } = req.body;

        const resQry = await UserRoleModel.create(user_id, role_id, device_id);

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry?.results || resQry.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry.results,
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE USERROLE
 */
exports.getOneUserRole = async (req, res) => {
    try {
        const { id } = req.params; // gunakan params.id

        const data = await UserRoleModel.findById(id);

        if (!data) {
            return sendResponse(req, res, "03", {
                message: "UserRole not found",
            });
        }

        return sendResponse(req, res, "00", { detaildata: data });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE USERROLE
 */
exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params; // gunakan params.id
        const { user_id, role_id, device_id } = req.body;

        const updated = await UserRoleModel.update(id, user_id, role_id, device_id);

        if (updated?.hasOwnProperty("err")) throw new Error(updated.err);

        return sendResponse(req, res, "00", { detaildata: updated });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE USERROLE
 */
exports.removeUserRole = async (req, res) => {
    try {
        const { id } = req.params; // gunakan params.id

        await UserRoleModel.remove(id);

        return sendResponse(req, res, "00", {
            message: "UserRole deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
