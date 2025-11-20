"use strict";

const Customer = require("../../models/v1/Customer.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST CUSTOMER
 */
exports.listCustomer = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Customer.list({
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
 * CREATE CUSTOMER
 */
exports.createCustomer = async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            address,
            customer_category_id,
        } = req.body;

        const resQry = await Customer.create(
            name,
            phone,
            email,
            address,
            customer_category_id
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry?.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });

    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE CUSTOMER
 */
exports.getOneCustomer = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params

        const data = await Customer.findById(id);

        if (!data) {
            return sendResponse(req, res, "03", {
                message: "Customer not found",
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
 * UPDATE CUSTOMER
 */
exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params
        const {
            name,
            phone,
            email,
            address,
            customer_category_id,
        } = req.body;

        const resQry = await Customer.update(
            id,
            name,
            phone,
            email,
            address,
            customer_category_id
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
 * DELETE CUSTOMER
 */
exports.removeCustomer = async (req, res) => {
    try {
        const { id } = req.params; // <-- pakai params

        const resQry = await Customer.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Customer deleted successfully",
        });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
