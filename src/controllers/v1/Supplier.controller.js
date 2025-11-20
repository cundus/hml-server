"use strict";

const Supplier = require("../../models/v1/Supplier.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST SUPPLIER
 */
exports.listSupplier = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Supplier.list(Page, RowsPerPage);

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
 * CREATE SUPPLIER
 */
exports.createSupplier = async (req, res) => {
    try {
        const { name, phone, address, email } = req.body;

        const resQry = await Supplier.create(name, phone, address, email);

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry?.results?.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: resQry });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE SUPPLIER
 */
exports.getOneSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Supplier.findById(id);

        if (!data) return sendResponse(req, res, "03", { message: "Supplier not found" });

        return sendResponse(req, res, "00", { detaildata: data });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE SUPPLIER
 */
exports.updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, address, email } = req.body;

        const resQry = await Supplier.update(id, name, phone, address, email);

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);

        return sendResponse(req, res, "00", { detaildata: resQry });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE SUPPLIER
 */
exports.removeSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const resQry = await Supplier.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "Supplier deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
