"use strict";

const AuthModel = require("../../models/v1/Auth.model");
const sendResponse = require("../../utils/Response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await AuthModel.findByEmail(email);
        if (!user) return sendResponse(req, res, "03", { message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return sendResponse(req, res, "03", { message: "Invalid credentials" });

        const token = jwt.sign(
            {
                user_id: user.id,
                email: user.email,
                role: user.role,
                store_id: user.store_id,
            },
            JWT_SECRET,
            { expiresIn: "2d" }
        );

        return sendResponse(req, res, "00", {
            message: "Login success",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                store_id: user.store_id,
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
        const { email, name, password, role, store_id, deviceId } = req.body;

        const exist = await AuthModel.findByEmail(email);
        if (exist) return sendResponse(req, res, "03", { message: "email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await AuthModel.createUser(
            email,
            name,
            hashedPassword,
            store_id,
            deviceId
        );

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
