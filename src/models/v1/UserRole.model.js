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
        database: "public",
    });
}

exports.list = async (Page, RowsPerPage) => {
    try {
        const db = dbConn();

        if (Page != 0) {
            var offset = (Page - 1) * RowsPerPage;
        }

        const resQry = await db.execRaw(`
      SELECT *
      FROM user_role WITH(NOLOCK)
      ORDER BY created_at DESC
      ${Page != 0
                ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY`
                : ""
            }
        `);

        const total = await db.execRaw(`
      SELECT COUNT(1) AS Total
      FROM user_role WITH(NOLOCK)
        `);

        return {
            results: resQry,
            pagination: {
                TotalData: total["Total"],
                TotalPage: Math.ceil(parseInt(total["Total"]) / limit),
                TotalPerPage: limit,
            },
        }
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.create = async (user_id, role_id, device_id) => {
    try {
        const db = dbConn();
        const id = crypto.randomUUID();

        const checkId = await db.execRaw(`
      SELECT *
      FROM user_role WITH(NOLOCK)
      WHERE id = '${id}'
        `);

        if (checkId.length > 0) {
            return {
                results: [],
            }
        }

        let columns = "id";
        let values = `'${id}'`;

        if (user_id) {
            columns += ", user_id";
            values += `, '${user_id}'`;
        }

        if (role_id) {
            columns += ", role_id";
            values += `, '${role_id}'`;
        }

        if (device_id) {
            columns += ", device_id";
            values += `, '${device_id}'`;
        }
        const resQry = await db.execRaw(`
      INSERT INTO user_role(${columns})
    OUTPUT inserted.*
    VALUES (${values})
      )
    `);

        return resQry
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.findById = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
    SELECT *
        FROM user_role WITH(NOLOCK)
      WHERE id = '${id}'
        `);

        return resQry[0] || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.update = async (id, user_id, role_id, device_id) => {
    try {
        const db = dbConn();

        let setClause = ""
        if (user_id) setClause += `user_id = '${user_id}',`
        if (role_id) setClause += `role_id = '${role_id}',`
        if (device_id) setClause += `device_id = '${device_id}',`

        const resQry = await db.execRaw(`
      UPDATE user_role
      SET ${setClause}, updated_at = '${getDateNow()}'
      OUTPUT inserted.*
        WHERE id = '${id}'
            `);

        return resQry
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.remove = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      DELETE FROM user_role
      WHERE id = '${id}'
        `);

        return resQry
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
