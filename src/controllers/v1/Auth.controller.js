"use strict";

const AuthModel = require("../../models/v1/Auth.model");
const sendResponse = require("../../utils/Response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// LOGIN
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await AuthModel.findByUsername(username);
        if (!user) return sendResponse(req, res, "03", { message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return sendResponse(req, res, "03", { message: "Invalid credentials" });

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role,
                branchId: user.branchId,
            },
            JWT_SECRET,
            { expiresIn: "2d" }
        );

        return sendResponse(req, res, "00", {
            message: "Login success",
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                branchId: user.branchId,
            },
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};

// REGISTER
exports.register = async (req, res) => {
    try {
        const { username, password, role, branchId } = req.body;

        const exist = await AuthModel.findByUsername(username);
        if (exist) return sendResponse(req, res, "03", { message: "Username already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await AuthModel.createUser({
            username,
            hashedPassword,
            role,
            branchId,
        });

        if (newUser?.err) throw new Error(newUser.err);

        return sendResponse(req, res, "00", {
            message: "User created",
            data: newUser,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(req, res, "99");
    }
};
