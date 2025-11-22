"use strict";

const crypto = require("crypto");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");
const config = require("../../config/config");



/**
 * LIST PURCHASE ORDERS
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
             FROM  purchase_order  
            ORDER BY created_at DESC
            ${Page != 0 ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY` : ""}
        `);

        const [total] = await db.execRaw(`
            SELECT COUNT(1) AS Total
             FROM  purchase_order  
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
 * CREATE PURCHASE ORDER
 */
exports.create = async (
    code,
    supplier_id,
    store_id,
    status,
    total
) => {
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

        const columns = [
            'id', 'supplier_id', 'code', 'status', 'store_id', 'total', 'created_at', 'updated_at'
        ];
        const values = [
            `'${id}'`,
            supplier_id ? `'${supplier_id}'` : 'NULL',
            code ? `'${code}'` : 'NULL',
            status ? `'${status}'` : 'NULL',
            store_id ? `'${store_id}'` : 'NULL',
            total ? `'${total}'` : 'NULL',
            `'${getDateNow()}'`,
            `'${getDateNow()}'`
        ];

        const resQry = await db.execRaw(`
            INSERT INTO purchase_order (${columns.join(', ')})
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
 * FIND PURCHASE ORDER BY ID
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
             FROM  purchase_order  
            WHERE id = '${id}'
        `);

        return resQry || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * UPDATE PURCHASE ORDER
 */
exports.update = async (
    id,
    code,
    supplier_id,
    store_id,
    status,
    total
) => {
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
        if (code) setClause += `code = '${code}',`;
        if (supplier_id) setClause += `supplier_id = '${supplier_id}',`;
        if (store_id) setClause += `store_id = '${store_id}',`;
        if (status) setClause += `status = '${status}',`;
        if (total !== undefined) setClause += `total = ${total},`;

        const resQry = await db.execRaw(`
            UPDATE purchase_order
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
 * DELETE PURCHASE ORDER
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
            DELETE  FROM  purchase_order
            WHERE id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
