"use strict";

const config = require("../../config/config");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");
const crypto = require("crypto");

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

exports.list = async ({ Page, RowsPerPage }) => {
    try {
        const db = dbConn();

        let offset = 0;
        if (Page && Page != 0) {
            offset = (Page - 1) * RowsPerPage;
        }

        const resQry = await db.execRaw(`
            SELECT *
            FROM permission WITH(NOLOCK)
            ORDER BY created_at DESC
            ${Page != 0
                ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY`
                : ""
            }
        `);

        const total = await db.execRaw(`
            SELECT COUNT(1) AS Total
            FROM permission WITH(NOLOCK)
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

exports.create = async (id, name, description, device_id) => {
    try {
        const db = dbConn();

        // Prevent duplicate ID (very rare but good practice)
        const checkId = await db.execRaw(`
            SELECT id FROM permission WITH(NOLOCK)
            WHERE id = '${id}'
        `);

        if (checkId.length > 0) {
            return { results: [] };
        }

        // dynamic columns + values
        let columns = "id";
        let values = `'${id}'`;

        if (name) {
            columns += ", name";
            values += `, '${name}'`;
        }

        if (description) {
            columns += ", description";
            values += `, '${description}'`;
        }

        if (device_id) {
            columns += ", device_id";
            values += `, '${device_id}'`;
        }

        const resQry = await db.execRaw(`
            INSERT INTO permission (${columns})
            OUTPUT inserted.*
            VALUES (${values})
        `);

        return { results: resQry };

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
            FROM permission WITH(NOLOCK)
            WHERE id = '${id}'
        `);

        return resQry[0] || null;

    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.update = async (id, name, description, device_id) => {
    try {
        const db = dbConn();

        let setClause = "";

        if (name) setClause += `name = '${name}',`;
        if (description) setClause += `description = '${description}',`;
        if (device_id) setClause += `device_id = '${device_id}',`;

        setClause += `updated_at = '${getDateNow()}'`;

        const resQry = await db.execRaw(`
            UPDATE permission
            SET ${setClause}
            OUTPUT inserted.*
            WHERE id = '${id}'
        `);

        return resQry;

    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.remove = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
            DELETE FROM permission
            WHERE id = '${id}'
        `);

        return resQry;

    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
