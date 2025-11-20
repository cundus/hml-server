"use strict";

const Batch = require("../../models/v1/Batch.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST BATCH
 */
exports.listBatch = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Batch.list({
            Page,
            RowsPerPage
        });

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry.results,
            pagination: resQry.pagination
        });

    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * CREATE BATCH
 */
exports.createBatch = async (req, res) => {
    try {
        const {
            product_id,
            batch_code,
            expiry_date,
            manufacture_date,
            notes
        } = req.body;

        const resQry = await Batch.create(
            product_id,
            batch_code,
            expiry_date,
            manufacture_date,
            notes
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry
        });

    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE BATCH
 */
exports.getOneBatch = async (req, res) => {
    try {
        const { id } = req.params; // <- menggunakan req.params

        const data = await Batch.findById(id);

        if (!data) {
            return sendResponse(req, res, "03", {
                message: "Batch not found"
            });
        }

        return sendResponse(req, res, "00", {
            detaildata: data
        });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE BATCH
 */
exports.updateBatch = async (req, res) => {
    try {
        const { id } = req.params; // <- menggunakan req.params
        const {
            product_id,
            batch_code,
            expiry_date,
            manufacture_date,
            notes
        } = req.body;

        const resQry = await Batch.update(
            id,
            product_id,
            batch_code,
            expiry_date,
            manufacture_date,
            notes
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);

        return sendResponse(req, res, "00", {
            detaildata: resQry
        });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE BATCH
 */
exports.removeBatch = async (req, res) => {
    try {
        const { id } = req.params; // <- menggunakan req.params

        const resQry = await Batch.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Batch deleted successfully"
        });

    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
