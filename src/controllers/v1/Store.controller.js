"use strict";

const Store = require("../../models/v1/Store.model");
const sendResponse = require("../../utils/Response");

exports.listStore = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Store.list({
            Page, RowsPerPage
        });

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry.results,
            pagination: resQry?.pagination,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

exports.createStore = async (req, res) => {
    try {
        const {
            code, name, address, type,
        } = req.body;

        const resQry = await Store.create(
            code, name, address, type,
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry?.err);
        if (resQry?.results.length == 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};
exports.getOneStore = async (req, res) => {
    try {
        const { id } = req.body

        const store = await Store.findById(id);

        if (!store) {
            return sendResponse(req, res, "03", {
                message: "store not found",
            });
        }

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.updateStore = async (req, res) => {
    try {
        const { id, name, address, type } = req.body

        const resQry = await Store.update(id, name, address, type
        );

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.removeStore = async (req, res) => {
    try {
        const { id } = req.body

        await Store.remove(id);

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            message: "store deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
