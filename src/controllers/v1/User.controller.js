"use strict";

const Users = require("../../models/v1/User.model");
const sendResponse = require("../../utils/Response");

exports.listUsers = async (req, res) => {
    try {
        const { Page, RowsPerPage } = req.query;

        const resQry = await Users.list(Page, RowsPerPage);
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

// // CREATE USER
// exports.createUser = async (req, res) => {
//     try {
//         const { name, email, password, store_id, deviceId } = req.body;

//         const newUser = await Users.create(name, email, password, store_id, deviceId);
//         if (newUser?.err) throw new Error(newUser.err);

//         return sendResponse(req, res, "00", { data: newUser });
//     } catch (err) {
//         console.log(err);
//         return sendResponse(req, res, "99");
//     }
// };


// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const { name, email, password, store_id, deviceId } = req.body;
        const resQry = await Users.update(name, email, password, store_id, deviceId);

        if (resQry?.hasOwnProperty("err")) throw new Error(resQry.err);
        if (resQry?.results.length == 0) return sendResponse(req, res, "03");

        return sendResponse(req, res, "00", {
            detaildata: resQry,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body
        await Users.remove(email);

        return sendResponse(req, res, "00", { message: "Deleted success" });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};
