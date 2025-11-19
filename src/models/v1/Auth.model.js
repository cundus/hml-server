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
        database: "public",
    });
}

// ===============================
// FIND USER BY Email
// ===============================
exports.findByEmail = async (email) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      SELECT TOP 1 *
      FROM user WITH(NOLOCK)
      WHERE email = '${email}'
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

exports.createUser = async (name, email, password, store_id, deviceId) => {
    try {
        const db = dbConn();
        const id = crypto.randomUUID();

        const checkuuid = await db.execRaw(`
      SELECT *
      FROM user WITH(NOLOCK)
      WHERE id = '${id}'
    `);

        if (checkuuid.length > 0) {
            return {
                results: [],
            }
        }

        const check = await db.execRaw(`
      SELECT *
      FROM user WITH(NOLOCK)
      WHERE email = '${email}'
    `);

        if (check.length > 0) {
            return {
                results: [],
            }
        }

        const resQry = await db.execRaw(`
      INSERT INTO user (id, name, email, password, store_id, deviceId)
      OUTPUT inserted.*
      VALUES (
        '${id}',
        '${name}', 
        '${email}', 
        '${password}', 
        ${store_id ? `'${store_id}'` : "NULL"},
        ${deviceId ? `'${deviceId}'` : "NULL"}
      )
    `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};