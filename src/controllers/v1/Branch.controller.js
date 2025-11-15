"use strict";

const Branches = require("../../models/v1/Branch.model");
const sendResponse = require("../../utils/Response");

exports.listBranch = async (req, res) => {
    try {
        const { page, rowPerPage } = req.body;

        const resQry = await Branches.list({
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

exports.createBranch = async (req, res) => {
    try {
        const {
            ProductId,
            ReconStatus,
        } = req.body;

        const resQry = await Branches.create(
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
exports.getOneBranch = async (req, res) => {
    try {
        const { branchId } = req.body

        const branch = await Branches.findById(branchId);

        if (!branch) {
            return sendResponse(req, res, "03", {
                message: "Branch not found",
            });
        }

        return sendResponse(req, res, "00", { data: branch });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.updateBranch = async (req, res) => {
    try {
        const { branchId } = req.body

        const updated = await Branches.update(branchId
        );

        return sendResponse(req, res, "00", { data: updated });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.removeBranch = async (req, res) => {
    try {
        const { branchId } = req.body

        await Branches.remove(branchId);

        return sendResponse(req, res, "00", {
            message: "Branch deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
