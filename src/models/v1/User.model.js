"use strict";

const config = require("../../config/config");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");

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

// ==============================
// LIST USERS
// ==============================
exports.list = async ({ limit, offset }) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      SELECT *
      FROM Users WITH(NOLOCK)
      ORDER BY createdAt DESC
      OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY
    `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// ==============================
// CREATE USER
// ==============================
exports.create = async ({ username, password, role, branchId }) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      INSERT INTO Users (username, password, role, branchId, createdAt, updatedAt)
      OUTPUT inserted.*
      VALUES (
        '${username}', 
        '${password}', 
        '${role}', 
        ${branchId ? `'${branchId}'` : "NULL"},
        '${getDateNow()}',
        '${getDateNow()}'
      )
    `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// ==============================
// GET ONE USER
// ==============================
exports.findById = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      SELECT *
      FROM Users WITH(NOLOCK)
      WHERE id = '${id}'
    `);

        return resQry[0] || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// ==============================
// UPDATE USER
// ==============================
exports.update = async (id, payload) => {
    try {
        const db = dbConn();

        const setClause = Object.keys(payload)
            .map((key) => `${key} = '${payload[key]}'`)
            .join(", ");

        const resQry = await db.execRaw(`
      UPDATE Users
      SET ${setClause}, updatedAt = '${getDateNow()}'
      OUTPUT inserted.*
      WHERE id = '${id}'
    `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// ==============================
// DELETE USER
// ==============================
exports.remove = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      DELETE FROM Users WHERE id = '${id}'
    `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// ==============================
// FIND BY USERNAME (for login)
// ==============================
exports.findByUsername = async (username) => {
    try {
        const db = dbConn();
        const resQry = await db.execRaw(`
      SELECT * FROM Users WITH(NOLOCK)
      WHERE username = '${username}'
    `);

        return resQry[0] || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
