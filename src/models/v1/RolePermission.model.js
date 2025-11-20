"use strict";

const crypto = require("crypto");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");
const config = require("../../config/config");



// LIST
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
        let offset = 0;
        if (Page && Page != 0) offset = (Page - 1) * RowsPerPage;

        const resQry = await db.execRaw(`
            SELECT *
             FROM  role_permission  
            ORDER BY created_at DESC
            ${Page != 0
                ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY`
                : ""}
        `);

        const [total] = await db.execRaw(`
            SELECT COUNT(1) AS Total
             FROM  role_permission  
        `);

        return {
            results: resQry,
            pagination: {
                TotalData: total[0]?.Total ?? 0,
                TotalPage: Math.ceil(
                    Number(total[0]?.Total ?? 0) / (RowsPerPage || 1)
                ),
                TotalPerPage: RowsPerPage,
            }
        };

    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// CREATE
exports.create = async (role_id, permission_id, device_id) => {
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

        // CEK DUPLICATE ID
        const checkId = await db.execRaw(`
            SELECT id
             FROM  role_permission  
            WHERE id = '${id}'
        `);

        if (checkId.length > 0) {
            return { results: [] };
        }

        // DYNAMIC INSERT
        let columns = "id";
        let values = `'${id}'`;

        if (role_id) {
            columns += ", role_id";
            values += `, '${role_id}'`;
        }

        if (permission_id) {
            columns += ", permission_id";
            values += `, '${permission_id}'`;
        }

        if (device_id) {
            columns += ", device_id";
            values += `, '${device_id}'`;
        }

        const resQry = await db.execRaw(`
            INSERT INTO role_permission (${columns})
            OUTPUT inserted.*
            VALUES (${values})
        `);

        return { results: resQry };

    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// FIND BY ID
exports.findById = async (id) => {
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
            SELECT *
             FROM  role_permission  
            WHERE id = '${id}'
        `);

        return resQry || null;

    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// UPDATE
exports.update = async (id, role_id, permission_id, device_id) => {
    try {
        let db = new DatabaseHandler({
            host: config.db.host,
            client: config.db.client,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: process.env.FE_DATABASE,
        });
        let setClause = "";

        if (role_id) setClause += `role_id = '${role_id}',`;
        if (permission_id) setClause += `permission_id = '${permission_id}',`;
        if (device_id) setClause += `device_id = '${device_id}',`;

        setClause += `updated_at = '${getDateNow()}'`;

        const resQry = await db.execRaw(`
            UPDATE role_permission
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

// DELETE
exports.remove = async (id) => {
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
            DELETE  FROM  role_permission
            WHERE id = '${id}'
        `);

        return resQry;

    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
