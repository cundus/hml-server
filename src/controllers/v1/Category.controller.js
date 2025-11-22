"use strict";

const Category = require("../../models/v1/Category.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST CATEGORY
 */
exports.listCategory = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Category.list({
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
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * CREATE CATEGORY
 */
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const resQry = await Category.create(
            name
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });

    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE CATEGORY
 */
exports.getOneCategory = async (req, res) => {
    try {
        const { id } = req.params; // <- menggunakan req.params

        const data = await Category.findById(id);

        if (!data) {
            return sendResponse(req, res, "03", {
                message: "Category not found",
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
 * UPDATE CATEGORY
 */
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params; // <- menggunakan req.params
        const { name } = req.body;

        const resQry = await Category.update(
            id,
            name
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
 * DELETE CATEGORY
 */
exports.removeCategory = async (req, res) => {
    try {
        const { id } = req.params; // <- menggunakan req.params

        const resQry = await Category.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Category deleted successfully",
        });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
