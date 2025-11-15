"use strict";

const Prices = require("../../models/v1/Price.model");
const sendResponse = require("../../utils/Response");

exports.listPrice = async (req, res) => {
    try {
        const { page, rowPerPage } = req.body;

        const resQry = await Prices.list({
            page, rowPerPage
        });

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            pagination: { limit, offset }
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

exports.createPrice = async (req, res) => {
    try {
        const {
            ProductId,
            ReconStatus,
        } = req.body;

        const resQry = await Prices.create(
            ProductId,
            ReconStatus,
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry?.err);
        if (resQry?.results.length == 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry?.results,
            pagination: resQry?.pagination,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};
exports.getOnePrice = async (req, res) => {
    try {
        const { PriceId } = req.body

        const Price = await Prices.findById(PriceId);

        if (!Price) {
            return sendResponse(req, res, "03", {
                message: "Price not found",
            });
        }

        return sendResponse(req, res, "00", { data: Price });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.updatePrice = async (req, res) => {
    try {
        const { PriceId } = req.body

        const updated = await Prices.update(PriceId
        );

        return sendResponse(req, res, "00", { data: updated });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.removePrice = async (req, res) => {
    try {
        const { PriceId } = req.body

        await Prices.remove(PriceId);

        return sendResponse(req, res, "00", {
            message: "Price deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
