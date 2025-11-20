"use strict";

const StockAdjustment = require("../../models/v1/StockAdjustment.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST STOCK ADJUSTMENTS
 */
exports.listStockAdjustment = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const data = await StockAdjustment.list(Page, RowsPerPage);

        if (data?.hasOwnProperty("err")) throw new Error(data.err);
        if (!data || data.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: data.results,
            pagination: data.pagination,
        });
    } catch (error) {
        console.error("Error list stock adjustments:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * CREATE STOCK ADJUSTMENT
 */
exports.createStockAdjustment = async (req, res) => {
    try {
        const { product_id, initial_qty, adjusted_qty, reason, created_by } = req.body;

        const created = await StockAdjustment.create(
            product_id,
            initial_qty,
            adjusted_qty,
            reason,
            created_by
        );

        if (created?.hasOwnProperty("err")) throw new Error(created.err);
        if (!created || created.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: created });
    } catch (error) {
        console.error("Error create stock adjustment:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE STOCK ADJUSTMENT
 */
exports.getOneStockAdjustment = async (req, res) => {
    try {
        const { id } = req.params; // pakai params

        const data = await StockAdjustment.findOne(id);

        if (!data) return sendResponse(req, res, "03", { message: "Stock adjustment not found" });

        return sendResponse(req, res, "00", { detaildata: data });
    } catch (error) {
        console.error("Error get one stock adjustment:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE STOCK ADJUSTMENT
 */
exports.updateStockAdjustment = async (req, res) => {
    try {
        const { id } = req.params; // pakai params
        const { product_id, initial_qty, adjusted_qty, reason } = req.body;

        const updated = await StockAdjustment.update(
            id,
            product_id,
            initial_qty,
            adjusted_qty,
            reason
        );

        if (updated?.hasOwnProperty("err")) throw new Error(updated.err);

        return sendResponse(req, res, "00", { detaildata: updated });
    } catch (error) {
        console.error("Error update stock adjustment:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE STOCK ADJUSTMENT
 */
exports.removeStockAdjustment = async (req, res) => {
    try {
        const { id } = req.params; // pakai params

        const removed = await StockAdjustment.remove(id);

        if (removed?.hasOwnProperty("err")) throw new Error(removed.err);

        return sendResponse(req, res, "00", {
            detaildata: removed,
            message: "Stock adjustment deleted successfully",
        });
    } catch (error) {
        console.error("Error delete stock adjustment:", error);
        return sendResponse(req, res, "99");
    }
};
