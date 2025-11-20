"use strict";

const ProductPrice = require("../../models/v1/ProductPrice.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST PRODUCT PRICES
 */
exports.listProductPrice = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await ProductPrice.list(Page, RowsPerPage);
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
 * CREATE PRODUCT PRICE
 */
exports.createProductPrice = async (req, res) => {
    try {
        const { product_id, store_id, price, start_date, end_date } = req.body;

        const resQry = await ProductPrice.create(
            product_id,
            store_id,
            price,
            start_date,
            end_date
        );
        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry?.results || resQry.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: resQry.results });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE PRODUCT PRICE
 */
exports.getOneProductPrice = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ProductPrice.findById(id);

        if (!data) return sendResponse(req, res, "03", { message: "Product price not found" });

        return sendResponse(req, res, "00", { detaildata: data });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE PRODUCT PRICE
 */
exports.updateProductPrice = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_id, store_id, price, start_date, end_date } = req.body;

        const resQry = await ProductPrice.update(
            id,
            product_id,
            store_id,
            price,
            start_date,
            end_date
        );
        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);

        return sendResponse(req, res, "00", { detaildata: resQry });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE PRODUCT PRICE
 */
exports.removeProductPrice = async (req, res) => {
    try {
        const { id } = req.params;

        await ProductPrice.remove(id);

        return sendResponse(req, res, "00", { message: "Product price deleted successfully" });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
