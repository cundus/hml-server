"use strict";

const RolePermission = require("../../models/v1/RolePermission.model");
const sendResponse = require("../../utils/Response");

// LIST ROLE-PERMISSION
exports.listRolePermission = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await RolePermission.list({
            Page,
            RowsPerPage
        });

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.results?.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry.results,
            pagination: resQry.pagination,
        });

    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

// CREATE ROLE-PERMISSION
exports.createRolePermission = async (req, res) => {
    try {
        const { role_id, permission_id, device_id } = req.body;

        const resQry = await RolePermission.create(
            role_id,
            permission_id,
            device_id
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (resQry?.results?.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry.results,
        });

    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

// GET ONE ROLE-PERMISSION
exports.getOneRolePermission = async (req, res) => {
    try {
        const { id } = req.body;

        const data = await RolePermission.findById(id);

        if (!data) {
            return sendResponse(req, res, "03", {
                message: "RolePermission not found",
            });
        }

        return sendResponse(req, res, "00", { data });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

// UPDATE ROLE-PERMISSION
exports.updateRolePermission = async (req, res) => {
    try {
        const { id, role_id, permission_id, device_id } = req.body;

        const updated = await RolePermission.update(
            id,
            role_id,
            permission_id,
            device_id
        );

        if (updated?.err) throw new Error(updated.err);

        return sendResponse(req, res, "00", { data: updated });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

// DELETE ROLE-PERMISSION
exports.removeRolePermission = async (req, res) => {
    try {
        const { id } = req.body;

        await RolePermission.remove(id);

        return sendResponse(req, res, "00", {
            message: "RolePermission deleted successfully",
        });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
