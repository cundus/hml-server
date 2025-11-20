"use strict";

const crypto = require("crypto");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");
const config = require("../../config/config");



/**
 * LIST TRANSFER REQUEST
 */
exports.list = async (Page, RowsPerPage) => {
    try {
        let db = new DatabaseHandler({
            host: config.db.host,
            client: config.db.client,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: process.env.FE_DATABASE,
        }); let offset = 0;

        if (Page != 0) offset = (Page - 1) * RowsPerPage;

        const resQry = await db.execRaw(`
            SELECT *
             FROM  transfer_request  
            ORDER BY created_at DESC
            ${Page != 0 ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY` : ""}
        `);

        const [total] = await db.execRaw(`
            SELECT COUNT(1) AS Total
             FROM  transfer_request  
        `);

        return {
            results: resQry,
            pagination: {
                TotalData: parseInt(total.total),
                TotalPage: Math.ceil(parseInt(total.total) / RowsPerPage),
                TotalPerPage: RowsPerPage,
            },
        };
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * CREATE TRANSFER REQUEST
 */
exports.create = async (source_store_id, destination_store_id, requested_by, status) => {
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

        // Cek ID random jika bentrok
        const checkId = await db.execRaw(`
            SELECT *
             FROM  transfer_request  
            WHERE id = '${id}'
        `);

        if (checkId.length > 0) {
            return { results: [] };
        }

        let columns = ['id'];
        let values = [`'${id}'`];

        if (source_store_id) { columns.push('source_store_id'); values.push(`'${source_store_id}'`); }
        if (destination_store_id) { columns.push('destination_store_id'); values.push(`'${destination_store_id}'`); }
        if (requested_by) { columns.push('requested_by'); values.push(`'${requested_by}'`); }
        if (status) { columns.push('status'); values.push(`'${status}'`); }

        columns.push('created_at');
        values.push(`'${getDateNow()}'`);

        columns.push('updated_at');
        values.push(`'${getDateNow()}'`);

        const resQry = await db.execRaw(`
            INSERT INTO transfer_request (${columns.join(', ')})
            OUTPUT inserted.*
            VALUES (${values.join(', ')})
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * FIND TRANSFER REQUEST BY ID
 */
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
             FROM  transfer_request  
            WHERE id = '${id}'
        `);

        return resQry || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * UPDATE TRANSFER REQUEST
 */
exports.update = async (id, source_store_id, destination_store_id, requested_by, status) => {
    try {
        let db = new DatabaseHandler({
            host: config.db.host,
            client: config.db.client,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: process.env.FE_DATABASE,
        });
        let setClause = '';
        if (source_store_id) setClause += `source_store_id = '${source_store_id}',`;
        if (destination_store_id) setClause += `destination_store_id = '${destination_store_id}',`;
        if (requested_by) setClause += `requested_by = '${requested_by}',`;
        if (status) setClause += `status = '${status}',`;

        const resQry = await db.execRaw(`
            UPDATE transfer_request
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

/**
 * DELETE TRANSFER REQUEST
 */
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
            DELETE  FROM  transfer_request
            WHERE id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
