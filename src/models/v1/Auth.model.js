"use strict";

const config = require("../../config/config");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");

console.log("config.db", config.db.host);
console.log("config.db", config.db.client);
console.log("config.db", config.db.port);
console.log("config.db", config.db.password);

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
        let db = new DatabaseHandler({
            host: config.db.host,
            client: config.db.client,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: process.env.FE_DATABASE,
        });
        const resQry = await db.execRaw(`
      SELECT TOP 1 *
       FROM  user  
      WHERE email = '${email}'
    `);

        return resQry || null;
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
        let db = new DatabaseHandler({
            host: config.db.host,
            client: config.db.client,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: process.env.FE_DATABASE,
        });
        const id = crypto.randomUUID();

        const checkuuid = await db.execRaw(`
      SELECT *
       FROM  user  
      WHERE id = '${id}'
    `);

        if (checkuuid.length > 0) {
            return {
                results: [],
            }
        }

        const check = await db.execRaw(`
      SELECT *
       FROM  user  
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