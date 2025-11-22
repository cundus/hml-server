"use strict";

const TransactionItems = require("../../models/v1/TransactionItems.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST TRANSACTION ITEMS
 */
exports.listTransactionItems = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await TransactionItems.list({
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
 * CREATE TRANSACTION ITEM
 * fields:
 * - transaction_id
 * - product_id
 * - qty
 * - customer_id
 * - 
 */
exports.createTransactionItem = async (req, res) => {
    try {
        const {
            transaction_id,
            product_id,
            qty,
            customer_id,

        } = req.body;

        const resQry = await TransactionItems.create(
            transaction_id,
            product_id,
            qty,
            customer_id,

        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry?.results?.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};


/**
 * GET ONE TRANSACTION ITEM
 */
exports.getOneTransactionItem = async (req, res) => {
    try {
        const { id } = req.body;

        const data = await TransactionItems.findById(id);

        if (!data) {
            return sendResponse(req, res, "03", {
                message: "transaction item not found",
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
 * UPDATE TRANSACTION ITEM
 */
exports.updateTransactionItem = async (req, res) => {
    try {
        const {
            id,
            transaction_id,
            product_id,
            qty,
            customer_id,

        } = req.body;

        const resQry = await TransactionItems.update(
            id,
            transaction_id,
            product_id,
            qty,
            customer_id,

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
 * DELETE TRANSACTION ITEM
 */
exports.removeTransactionItem = async (req, res) => {
    try {
        const { id } = req.body;

        const resQry = await TransactionItems.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "transaction item deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
