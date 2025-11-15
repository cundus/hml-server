"use strict";

const Product = require("../../models/v1/Product.model");
const sendResponse = require("../../utils/Response");

exports.listProduct = async (req, res) => {
    try {
        const { page, rowPerPage } = req.body;

        const resQry = await Product.list({
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

exports.createProduct = async (req, res) => {
    try {
        const {
            ProductId,
            ReconStatus,
        } = req.body;

        const resQry = await Product.create(
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
exports.getOneProduct = async (req, res) => {
    try {
        const { ProductId } = req.body

        const Product = await Product.findById(ProductId);

        if (!Product) {
            return sendResponse(req, res, "03", {
                message: "Product not found",
            });
        }

        return sendResponse(req, res, "00", { data: Product });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { ProductId } = req.body

        const updated = await Product.update(ProductId
        );

        return sendResponse(req, res, "00", { data: updated });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.removeProduct = async (req, res) => {
    try {
        const { ProductId } = req.body

        await Product.remove(ProductId);

        return sendResponse(req, res, "00", {
            message: "Product deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
