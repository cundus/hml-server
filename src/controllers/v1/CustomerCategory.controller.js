"use strict";

const CustomerCategory = require("../../models/v1/CustomerCategory.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST CUSTOMER CATEGORY
 */
exports.listCustomerCategory = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await CustomerCategory.list({
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
 * CREATE CUSTOMER CATEGORY
 */
exports.createCustomerCategory = async (req, res) => {
    try {
        const {
            name,
            description,
        } = req.body;

        const resQry = await CustomerCategory.create(
            name,
            description
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
 * GET ONE CUSTOMER CATEGORY
 */
exports.getOneCustomerCategory = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params

        const data = await CustomerCategory.findById(id);

        if (!data) {
            return sendResponse(req, res, "03", {
                message: "Customer category not found",
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
 * UPDATE CUSTOMER CATEGORY
 */
exports.updateCustomerCategory = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params
        const {
            name,
            description,
        } = req.body;

        const resQry = await CustomerCategory.update(
            id,
            name,
            description
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
 * DELETE CUSTOMER CATEGORY
 */
exports.removeCustomerCategory = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params

        const resQry = await CustomerCategory.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Customer category deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
