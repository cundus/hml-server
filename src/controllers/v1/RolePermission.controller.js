"use strict";

const RolePermission = require("../../models/v1/RolePermission.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST ROLE-PERMISSIONS
 */
exports.listRolePermission = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await RolePermission.list(Page, RowsPerPage);
        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || !resQry.results || resQry.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry.results,
            pagination: resQry.pagination,
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * CREATE ROLE-PERMISSION
 */
exports.createRolePermission = async (req, res) => {
    try {
        const { role_id, permission_id, device_id } = req.body;

        const resQry = await RolePermission.create(role_id, permission_id, device_id);
        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry?.results || resQry.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: resQry.results });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE ROLE-PERMISSION
 */
exports.getOneRolePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await RolePermission.findById(id);

        if (!data) return sendResponse(req, res, "03", { message: "RolePermission not found" });

        return sendResponse(req, res, "00", { detaildata: data });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE ROLE-PERMISSION
 */
exports.updateRolePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { role_id, permission_id, device_id } = req.body;

        const updated = await RolePermission.update(id, role_id, permission_id, device_id);
        if (updated?.hasOwnProperty("err")) throw new Error(updated.err);

        return sendResponse(req, res, "00", { detaildata: updated });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE ROLE-PERMISSION
 */
exports.removeRolePermission = async (req, res) => {
    try {
        const { id } = req.params;

        await RolePermission.remove(id);

        return sendResponse(req, res, "00", { message: "RolePermission deleted successfully" });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
