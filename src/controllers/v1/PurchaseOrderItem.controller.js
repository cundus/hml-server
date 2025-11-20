"use strict";

const PurchaseOrderItem = require("../../models/v1/PurchaseOrderItem.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST PURCHASE ORDER ITEMS
 */
exports.listPurchaseOrderItem = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const data = await PurchaseOrderItem.list(Page, RowsPerPage);

        if (data?.hasOwnProperty("err")) throw new Error(data.err);
        if (!data || data.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: data.results,
            pagination: data.pagination,
        });
    } catch (error) {
        console.error("Error list purchase order items:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * CREATE PURCHASE ORDER ITEM
 */
exports.createPurchaseOrderItem = async (req, res) => {
    try {
        const {
            purchase_order_id,
            product_id,
            qty,
            unit_price,
            total_price,
        } = req.body;

        const created = await PurchaseOrderItem.create(
            purchase_order_id,
            product_id,
            qty,
            unit_price,
            total_price
        );

        if (created?.hasOwnProperty("err")) throw new Error(created.err);
        if (!created || created.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: created });
    } catch (error) {
        console.error("Error create purchase order item:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE PURCHASE ORDER ITEM
 */
exports.getOnePurchaseOrderItem = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params

        const data = await PurchaseOrderItem.findOne(id);

        if (!data) return sendResponse(req, res, "03", { message: "Purchase order item not found" });

        return sendResponse(req, res, "00", { detaildata: data });
    } catch (error) {
        console.error("Error get one purchase order item:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE PURCHASE ORDER ITEM
 */
exports.updatePurchaseOrderItem = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params
        const {
            purchase_order_id,
            product_id,
            qty,
            unit_price,
            total_price,
        } = req.body;

        const updated = await PurchaseOrderItem.update(
            id,
            purchase_order_id,
            product_id,
            qty,
            unit_price,
            total_price
        );

        if (updated?.hasOwnProperty("err")) throw new Error(updated.err);

        return sendResponse(req, res, "00", { detaildata: updated });
    } catch (error) {
        console.error("Error update purchase order item:", error);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE PURCHASE ORDER ITEM
 */
exports.removePurchaseOrderItem = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params

        const removed = await PurchaseOrderItem.remove(id);

        if (removed?.hasOwnProperty("err")) throw new Error(removed.err);

        return sendResponse(req, res, "00", {
            detaildata: removed,
            message: "Purchase order item deleted successfully",
        });
    } catch (error) {
        console.error("Error delete purchase order item:", error);
        return sendResponse(req, res, "99");
    }
};
