"use strict";

const Transactions = require("../../models/v1/Transactions.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST TRANSACTIONS
 */
exports.listTransactions = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Transactions.list(Page, RowsPerPage);

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
 * CREATE TRANSACTION
 */
exports.createTransaction = async (req, res) => {
    try {
        const { store_id, transaction_type, amount, description, reference_id } = req.body;

        const resQry = await Transactions.create(
            store_id,
            transaction_type,
            amount,
            description,
            reference_id
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry?.results?.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: resQry });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE TRANSACTION
 */
exports.getOneTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Transactions.findById(id);

        if (!data) return sendResponse(req, res, "03", { message: "Transaction not found" });

        return sendResponse(req, res, "00", { detaildata: data });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE TRANSACTION
 */
exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { store_id, transaction_type, amount, description, reference_id } = req.body;

        const resQry = await Transactions.update(
            id,
            store_id,
            transaction_type,
            amount,
            description,
            reference_id
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);

        return sendResponse(req, res, "00", { detaildata: resQry });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE TRANSACTION
 */
exports.removeTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const resQry = await Transactions.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Transaction deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
