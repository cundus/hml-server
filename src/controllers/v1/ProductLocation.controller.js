"use strict";

const ProductLocation = require("../../models/v1/ProductLocation.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST PRODUCT LOCATION
 */
exports.listProductLocation = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await ProductLocation.list({
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
 * CREATE PRODUCT LOCATION
 */
exports.createProductLocation = async (req, res) => {
    try {
        const {
            product_id,
            store_id,
            shelf,
            row,
            bin,
        } = req.body;

        const resQry = await ProductLocation.create(
            product_id,
            store_id,
            shelf,
            row,
            bin
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (resQry?.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE PRODUCT LOCATION
 */
exports.getOneProductLocation = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params

        const data = await ProductLocation.findById(id);

        if (!data) {
            return sendResponse(req, res, "03", {
                message: "Product location not found",
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
 * UPDATE PRODUCT LOCATION
 */
exports.updateProductLocation = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params
        const {
            product_id,
            store_id,
            shelf,
            row,
            bin
        } = req.body;

        const resQry = await ProductLocation.update(
            id,
            product_id,
            store_id,
            shelf,
            row,
            bin
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
 * DELETE PRODUCT LOCATION
 */
exports.removeProductLocation = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params

        const resQry = await ProductLocation.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Product location deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
