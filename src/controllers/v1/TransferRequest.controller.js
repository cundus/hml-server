"use strict";

const TransferRequest = require("../../models/v1/TransferRequest.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST TRANSFER REQUEST
 */
exports.listTransferRequest = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await TransferRequest.list(Page, RowsPerPage);

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
 * CREATE TRANSFER REQUEST
 */
exports.createTransferRequest = async (req, res) => {
    try {
        const { product_id, store_from, store_to, qty, request_date, note } = req.body;

        const resQry = await TransferRequest.create(product_id, store_from, store_to, qty, request_date, note);

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry?.results || resQry.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: resQry });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE TRANSFER REQUEST
 */
exports.getOneTransferRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await TransferRequest.findById(id);

        if (!data) return sendResponse(req, res, "03", { message: "Transfer request not found" });

        return sendResponse(req, res, "00", { detaildata: data });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE TRANSFER REQUEST
 */
exports.updateTransferRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_id, store_from, store_to, qty, request_date, note, status } = req.body;

        const resQry = await TransferRequest.update(id, product_id, store_from, store_to, qty, request_date, note, status);

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);

        return sendResponse(req, res, "00", { detaildata: resQry });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE TRANSFER REQUEST
 */
exports.removeTransferRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const resQry = await TransferRequest.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Transfer request deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
