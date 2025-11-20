"use strict";

const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");
const config = require("../../config/config");



// ==============================
// LIST user
// ==============================
exports.list = async (Page, RowsPerPage) => {
    try {
        let db = new DatabaseHandler({
            host: config.db.host,
            client: config.db.client,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: process.env.FE_DATABASE,
        });
        if (Page != 0) {
            var offset = (Page - 1) * RowsPerPage;
        }

        const resQry = await db.execRaw(`
      SELECT *
       FROM  user  
      ORDER BY created_at DESC
      ${Page != 0
                ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY`
                : ""
            }
    `);

        const [total] = await db.execRaw(`
      SELECT COUNT(1) AS Total
       FROM  user  
        `);

        return {
            results: resQry,
            pagination: {
                TotalData: parseInt(total.total),
                TotalPage: Math.ceil(parseInt(total.total) / RowsPerPage),
                TotalPerPage: RowsPerPage,
            },
        }
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.update = async (name, email, password, store_id, deviceId) => {
    try {
        let db = new DatabaseHandler({
            host: config.db.host,
            client: config.db.client,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: process.env.FE_DATABASE,
        });
        let setClause = ""
        if (name) setClause += `name = '${name}',`
        if (email) setClause += `email = '${email}',`
        if (password) setClause += `password = '${password}',`
        if (store_id) setClause += `store_id = '${store_id}',`
        if (deviceId) setClause += `deviceId = '${deviceId}',`

        const resQry = await db.execRaw(`
      UPDATE user
      SET ${setClause}, updated_at = '${getDateNow()}'
      OUTPUT inserted.*
      WHERE email = '${email}'
    `);

        return {
            results: resQry
        };
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// ==============================
// DELETE USER
// ==============================
exports.remove = async (email) => {
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
      DELETE  FROM  user WHERE email = '${email}'
    `);

        return {
            results: resQry
        };
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
