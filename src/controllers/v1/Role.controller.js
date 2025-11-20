"use strict";

const Role = require("../../models/v1/Role.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST ROLES
 */
exports.listRole = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Role.list(Page, RowsPerPage);
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
 * CREATE ROLE
 */
exports.createRole = async (req, res) => {
    try {
        const { name, description, device_id } = req.body;

        const resQry = await Role.create(name, description, device_id);
        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry?.results || resQry.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: resQry.results });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE ROLE
 */
exports.getOneRole = async (req, res) => {
    try {
        const { id } = req.params;
        const roleData = await Role.findById(id);

        if (!roleData) return sendResponse(req, res, "03", { message: "Role not found" });

        return sendResponse(req, res, "00", { detaildata: roleData });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE ROLE
 */
exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, device_id } = req.body;

        const updated = await Role.update(id, name, description, device_id);
        if (updated?.hasOwnProperty("err")) throw new Error(updated.err);

        return sendResponse(req, res, "00", { detaildata: updated });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE ROLE
 */
exports.removeRole = async (req, res) => {
    try {
        const { id } = req.params;

        await Role.remove(id);

        return sendResponse(req, res, "00", { message: "Role deleted successfully" });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
