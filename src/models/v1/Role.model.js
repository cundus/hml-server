"use strict";

const crypto = require("crypto");
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

// LIST ROLE
exports.list = async ({ Page, RowsPerPage }) => {
    try {
        const db = dbConn();

        let offset = 0;
        if (Page && Page != 0) {
            offset = (Page - 1) * RowsPerPage;
        }

        const resQry = await db.execRaw(`
            SELECT *
            FROM role WITH(NOLOCK)
            ORDER BY created_at DESC
            ${Page != 0 ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY` : ""}
        `);

        const total = await db.execRaw(`
            SELECT COUNT(1) AS Total
            FROM role WITH(NOLOCK)
        `);

        return {
            results: resQry,
            pagination: {
                TotalData: total["Total"],
                TotalPage: Math.ceil(parseInt(total["Total"]) / RowsPerPage),
                TotalPerPage: RowsPerPage,
            },
        };
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// CREATE ROLE
exports.create = async (name, description, device_id) => {
    try {
        const db = dbConn();
        const id = crypto.randomUUID();

        const checkId = await db.execRaw(`
            SELECT *
            FROM role WITH(NOLOCK)
            WHERE id = '${id}'
        `);

        if (checkId.length > 0) {
            return { results: [] };
        }

        const resQry = await db.execRaw(`
            INSERT INTO role(id, name, description, device_id, created_at)
            OUTPUT inserted.*
            VALUES(
                '${id}',
                '${name}',
                '${description}',
                ${device_id ? `'${device_id}'` : "NULL"},
            )
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// FIND BY ID
exports.findById = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
            SELECT *
            FROM role WITH(NOLOCK)
            WHERE id = '${id}'
        `);

        return resQry[0] || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// UPDATE ROLE
exports.update = async (id, name, description, device_id) => {
    try {
        const db = dbConn();

        let setClause = "";

        if (name) setClause += `name = '${name}',`;
        if (description) setClause += `description = '${description}',`;
        if (device_id) setClause += `device_id = '${device_id}',`;

        const resQry = await db.execRaw(`
            UPDATE role
            SET ${setClause} updated_at = '${getDateNow()}'
            OUTPUT inserted.*
            WHERE id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// DELETE ROLE
exports.remove = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
            DELETE FROM role
            WHERE id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
