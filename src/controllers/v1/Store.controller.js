"use strict";

const Store = require("../../models/v1/Store.model");
const sendResponse = require("../../utils/Response");

/**
 * LIST STORES
 */
exports.listStore = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Store.list(Page, RowsPerPage);
        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || !resQry.results || resQry.results.length === 0) return sendResponse(req, res, "03");

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
 * CREATE STORE
 */
exports.createStore = async (req, res) => {
    try {
        const { code, name, address, type } = req.body;

        const resQry = await Store.create(code, name, address, type);
        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry?.results || resQry.results.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", { detaildata: resQry.results });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * GET ONE STORE
 */
exports.getOneStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findById(id);

        if (!store) return sendResponse(req, res, "03", { message: "Store not found" });

        return sendResponse(req, res, "00", { detaildata: store });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * UPDATE STORE
 */
exports.updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, name, address, type } = req.body;

        const updated = await Store.update(id, code, name, address, type);
        if (updated?.hasOwnProperty("err")) throw new Error(updated.err);

        return sendResponse(req, res, "00", { detaildata: updated });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

/**
 * DELETE STORE
 */
exports.removeStore = async (req, res) => {
    try {
        const { id } = req.params;

        await Store.remove(id);

        return sendResponse(req, res, "00", { message: "Store deleted successfully" });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
