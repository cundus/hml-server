"use strict";

const crypto = require("crypto");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");
const config = require("../../config/config");



/**
 * LIST TRANSACTION ITEMS
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
             FROM  transaction_items  
            ORDER BY created_at DESC
            ${Page != 0 ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY` : ""}
        `);

        const [total] = await db.execRaw(`
            SELECT COUNT(1) AS Total
             FROM  transaction_items  
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
 * CREATE TRANSACTION ITEM
 */
exports.create = async (
    transaction_id,
    product_id,
    quantity,
    customer_id
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

        const checkId = await db.execRaw(`
            SELECT *
             FROM  transaction_items  
            WHERE id = '${id}'
        `);

        if (checkId.length > 0) {
            return { results: [] };
        }

        let columns = ['id'];
        let values = [`'${id}'`];

        if (transaction_id) { columns.push('transaction_id'); values.push(`'${transaction_id}'`); }
        if (product_id) { columns.push('product_id'); values.push(`'${product_id}'`); }
        if (quantity !== undefined) { columns.push('quantity'); values.push(`${quantity}`); }
        if (customer_id !== undefined) { columns.push('customer_id'); values.push(`${customer_id}`); }

        columns.push('created_at');
        values.push(`'${getDateNow()}'`);

        columns.push('updated_at');
        values.push(`'${getDateNow()}'`);

        const resQry = await db.execRaw(`
            INSERT INTO transaction_items (${columns.join(', ')})
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
 * FIND TRANSACTION ITEM BY ID
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
             FROM  transaction_items  
            WHERE id = '${id}'
        `);

        return resQry || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * UPDATE TRANSACTION ITEM
 */
exports.update = async (
    id,
    transaction_id,
    product_id,
    quantity,
    customer_id
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
        if (transaction_id) setClause += `transaction_id = '${transaction_id}',`;
        if (product_id) setClause += `product_id = '${product_id}',`;
        if (quantity !== undefined) setClause += `quantity = ${quantity},`;
        if (customer_id !== undefined) setClause += `customer_id = ${customer_id},`;

        const resQry = await db.execRaw(`
            UPDATE transaction_items
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
 * DELETE TRANSACTION ITEM
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
            DELETE  FROM  transaction_items
            WHERE id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
