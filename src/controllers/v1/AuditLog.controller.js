"use strict";

const AuditLog = require("../../models/v1/AuditLog.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST AUDIT LOG
 */
exports.listAuditLog = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await AuditLog.list({
            Page,
            RowsPerPage
        });

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry.results,
            pagination: resQry.pagination,
        });

    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * CREATE AUDIT LOG
 */
exports.createAuditLog = async (req, res) => {
    try {
        const {
            user_id,
            action,
            device_id,
        } = req.body;

        const resQry = await AuditLog.create(
            user_id,
            action,
            device_id,
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });

    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE AUDIT LOG
 */
exports.getOneAuditLog = async (req, res) => {
    try {
        const { id } = req.params; // <- diganti dari req.body

        const data = await AuditLog.findById(id);

        if (!data) {
            return sendResponse(req, res, "03", {
                message: "Audit log not found",
            });
        }

        return sendResponse(req, res, "00", {
            detaildata: data,
        });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE AUDIT LOG
 */
exports.updateAuditLog = async (req, res) => {
    try {
        const { id } = req.params; // <- diganti dari req.body
        const {
            user_id,
            action,
            device_id,
        } = req.body;

        const resQry = await AuditLog.update(
            id,
            user_id,
            action,
            device_id,
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE AUDIT LOG
 */
exports.removeAuditLog = async (req, res) => {
    try {
        const { id } = req.params; // <- diganti dari req.body

        const resQry = await AuditLog.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Audit log deleted successfully",
        });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
