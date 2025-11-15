"use strict";

const config = require("../../config/config");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");

// DB connection helper
function dbConn() {
    return new DatabaseHandler({
        host: config.db.host,
        client: config.db.client,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: "ReconciliationConfig",
    });
}

// ===============================
// FIND USER BY USERNAME
// ===============================
exports.findByUsername = async (username) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      SELECT TOP 1 *
      FROM Users WITH(NOLOCK)
      WHERE username = '${username}'
    `);

        return resQry[0] || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// ===============================
// CREATE USER
// ===============================
exports.createUser = async ({ username, hashedPassword, role, branchId }) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      INSERT INTO Users (username, password, role, branchId, createdAt, updatedAt)
      OUTPUT inserted.*
      VALUES (
        '${username}',
        '${hashedPassword}',
        '${role}',
        ${branchId ? `'${branchId}'` : "NULL"},
        GETDATE(),
        GETDATE()
      )
    `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
