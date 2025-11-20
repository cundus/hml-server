"use strict";

const TransferItem = require("../../models/v1/TransferItem.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST TRANSFER ITEM
 */
exports.listTransferItem = async (req, res) => {
    try {
        const { Page, RowsPerPage, transfer_request_id } = req.body;

        const resQry = await TransferItem.list({ Page, RowsPerPage, transfer_request_id });

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
 * CREATE TRANSFER ITEM
 */
exports.createTransferItem = async (req, res) => {
    try {
        const { transfer_request_id, product_id, qty, note } = req.body;

        const resQry = await TransferItem.create(transfer_request_id, product_id, qty, note);

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry?.results || resQry.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: resQry });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE TRANSFER ITEM
 */
exports.getOneTransferItem = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await TransferItem.findById(id);

        if (!data) return sendResponse(req, res, "03", { message: "Transfer item not found" });

        return sendResponse(req, res, "00", { detaildata: data });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE TRANSFER ITEM
 */
exports.updateTransferItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { transfer_request_id, product_id, qty, note } = req.body;

        const resQry = await TransferItem.update(id, transfer_request_id, product_id, qty, note);

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);

        return sendResponse(req, res, "00", { detaildata: resQry });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE TRANSFER ITEM
 */
exports.removeTransferItem = async (req, res) => {
    try {
        const { id } = req.params;

        const resQry = await TransferItem.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Transfer item deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
