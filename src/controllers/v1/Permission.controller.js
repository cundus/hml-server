"use strict";

const Permission = require("../../models/v1/Permission.model");
const sendResponse = require("../../utils/Response");

exports.listPermission = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.body;

        const resQry = await Permission.list({
            Page,
            RowsPerPage
        });

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (!resQry || resQry.length === 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
            pagination: resQry?.pagination,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

exports.createPermission = async (req, res) => {
    try {
        const {
            name,
            description,
            device_id
        } = req.body;

        const resQry = await Permission.create(
            name,
            description,
            device_id
        );

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry?.err);
        if (resQry?.results.length == 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry?.results,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

exports.getOnePermission = async (req, res) => {
    try {
        const { id } = req.body;

        const permission = await Permission.findById(id);

        if (!permission) {
            return sendResponse(req, res, "03", {
                message: "Permission not found",
            });
        }

        return sendResponse(req, res, "00", { data: permission });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.updatePermission = async (req, res) => {
    try {
        const {
            id,
            name,
            description,
            device_id } = req.body;

        const updated = await Permission.update(
            id,
            name,
            description,
            device_id
        );

        return sendResponse(req, res, "00", { data: updated });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};

exports.removePermission = async (req, res) => {
    try {
        const { id } = req.body;

        await Permission.remove(id);

        return sendResponse(req, res, "00", {
            message: "Permission deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return sendResponse(req, res, "99");
    }
};
