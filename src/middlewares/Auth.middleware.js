"use strict";

const jwt = require("jsonwebtoken");
const DatabaseHandler = require("../../src/models/plugins/dbHandler.plugin");

const JWT_SECRET = process.env.JWT_SECRET;

async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        // No header at all
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        // Must be: Bearer <token>
        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ message: "Invalid authorization format" });
        }

        // Validate token
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;

        // Check user existence + status (fresh from DB)
        const dbUser = await DatabaseHandler("users")
            .where({ userId: payload.userId })
            .first();

        if (!dbUser) {
            return res.status(401).json({ message: "User not found" });
        }

        if (dbUser.deletedAt) {
            return res.status(401).json({ message: "User deleted" });
        }

        if (!dbUser.isActive) {
            return res.status(401).json({ message: "User inactive" });
        }

        // Attach fully-loaded user
        req.userDetails = dbUser;

        return next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: err.name === "TokenExpiredError" ? "Token expired" : err.message
        });
    }
}

module.exports = { authenticate };
