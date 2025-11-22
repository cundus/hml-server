"use strict";

const PurchaseOrder = require("../../models/v1/PurchaseOrder.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST PURCHASE ORDER
 */
exports.listPurchaseOrder = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await PurchaseOrder.list({
            Page,
            RowsPerPage,
        });

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

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
 * CREATE PURCHASE ORDER
 */
exports.createPurchaseOrder = async (req, res) => {
    try {
        const {
            code,
            supplier_id,
            store_id,
            status,
            total
        } = req.body;

        const resQry = await PurchaseOrder.create(
            code,
            supplier_id,
            store_id,
            status,
            total
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (resQry?.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE PURCHASE ORDER
 */
exports.getOnePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params

        const data = await PurchaseOrder.findById(id);

        if (!data) {
            return sendResponse(req, res, "03", {
                message: "Purchase order not found",
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
 * UPDATE PURCHASE ORDER
 */
exports.updatePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params
        const {
            code,
            supplier_id,
            store_id,
            status,
            total
        } = req.body;

        const resQry = await PurchaseOrder.update(
            id,
            code,
            supplier_id,
            store_id,
            status,
            total
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
 * DELETE PURCHASE ORDER
 */
exports.removePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params

        const resQry = await PurchaseOrder.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Purchase order deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
