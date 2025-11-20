"use strict";

const Permission = require("../../models/v1/Permission.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST PERMISSIONS
 */
exports.listPermission = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Permission.list(Page, RowsPerPage);
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
 * CREATE PERMISSION
 */
exports.createPermission = async (req, res) => {
    try {
        const { name, description, device_id } = req.body;

        const resQry = await Permission.create(name, description, device_id);
        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry?.results || resQry.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: resQry.results });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE PERMISSION
 */
exports.getOnePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const permission = await Permission.findById(id);

        if (!permission) return sendResponse(req, res, "03", { message: "Permission not found" });

        return sendResponse(req, res, "00", { detaildata: permission });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE PERMISSION
 */
exports.updatePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, device_id } = req.body;

        const updated = await Permission.update(id, name, description, device_id);
        if (updated?.hasOwnProperty("err")) throw new Error(updated.err);

        return sendResponse(req, res, "00", { detaildata: updated });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE PERMISSION
 */
exports.removePermission = async (req, res) => {
    try {
        const { id } = req.params;

        await Permission.remove(id);

        return sendResponse(req, res, "00", { message: "Permission deleted successfully" });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
