"use strict";

const StockTransaction = require("../../models/v1/StockTransaction.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST STOCK TRANSACTIONS
 */
exports.listStockTransaction = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const data = await StockTransaction.list(Page, RowsPerPage);

        if (data?.hasOwnProperty("err")) throw new Error(data.err);
        if (!data || data.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: data.results,
            pagination: data.pagination,
        });
    } catch (error) {
        console.error("Error list stock transactions:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * CREATE STOCK TRANSACTION
 */
exports.createStockTransaction = async (req, res) => {
    try {
        const {
            product_id,
            store_id,
            type,
            quantity,
            reference,
            batch_id,
            supplier_id,
            customer_id,
            performed_by,
            device_id
        } = req.body;

        const created = await StockTransaction.create(
            product_id,
            store_id,
            type,
            quantity,
            reference,
            batch_id,
            supplier_id,
            customer_id,
            performed_by,
            device_id
        );

        if (created?.hasOwnProperty("err")) throw new Error(created.err);
        if (!created || created.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: created });
    } catch (error) {
        console.error("Error create stock transaction:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE STOCK TRANSACTION
 */
exports.getOneStockTransaction = async (req, res) => {
    try {
        const { id } = req.params; // pakai params

        const data = await StockTransaction.findOne(id);

        if (!data) return sendResponse(req, res, "03", { message: "Stock transaction not found" });

        return sendResponse(req, res, "00", { detaildata: data });
    } catch (error) {
        console.error("Error get one stock transaction:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE STOCK TRANSACTION
 */
exports.updateStockTransaction = async (req, res) => {
    try {
        const { id } = req.params; // pakai params
        const {
            product_id,
            store_id,
            type,
            quantity,
            reference,
            batch_id,
            supplier_id,
            customer_id,
            performed_by,
            device_id
        } = req.body;

        const updated = await StockTransaction.update(
            id,
            product_id,
            store_id,
            type,
            quantity,
            reference,
            batch_id,
            supplier_id,
            customer_id,
            performed_by,
            device_id
        );

        if (updated?.hasOwnProperty("err")) throw new Error(updated.err);

        return sendResponse(req, res, "00", { detaildata: updated });
    } catch (error) {
        console.error("Error update stock transaction:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE STOCK TRANSACTION
 */
exports.removeStockTransaction = async (req, res) => {
    try {
        const { id } = req.params; // pakai params

        const removed = await StockTransaction.remove(id);

        if (removed?.hasOwnProperty("err")) throw new Error(removed.err);

        return sendResponse(req, res, "00", {
            detaildata: removed,
            message: "Stock transaction deleted successfully",
        });
    } catch (error) {
        console.error("Error delete stock transaction:", error);
        return sendResponse(req, res, "99");
    }
};
