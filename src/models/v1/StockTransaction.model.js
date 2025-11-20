"use strict";

const crypto = require("crypto");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");
const config = require("../../config/config");



/**
 * LIST STOCK TRANSACTIONS
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
             FROM  stock_transaction  
            ORDER BY created_at DESC
            ${Page != 0 ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY` : ""}
        `);

        const [total] = await db.execRaw(`
            SELECT COUNT(1) AS Total
             FROM  stock_transaction  
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
 * CREATE STOCK TRANSACTION
 */
exports.create = async (product_id, qty, type, description, created_by) => {
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

        const columns = ['id', 'product_id', 'qty', 'type', 'description', 'created_by', 'created_at', 'updated_at'];
        const values = [
            `'${id}'`,
            product_id ? `'${product_id}'` : 'NULL',
            qty !== undefined ? qty : 'NULL',
            type ? `'${type}'` : 'NULL',
            description ? `'${description}'` : 'NULL',
            created_by ? `'${created_by}'` : 'NULL',
            `'${getDateNow()}'`,
            `'${getDateNow()}'`
        ];

        const resQry = await db.execRaw(`
            INSERT INTO stock_transaction (${columns.join(', ')})
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
 * FIND STOCK TRANSACTION BY ID
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
             FROM  stock_transaction  
            WHERE id = '${id}'
        `);

        return resQry || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * UPDATE STOCK TRANSACTION
 */
exports.update = async (id, product_id, qty, type, description) => {
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
        if (product_id) setClause += `product_id = '${product_id}',`;
        if (qty !== undefined) setClause += `qty = ${qty},`;
        if (type) setClause += `type = '${type}',`;
        if (description) setClause += `description = '${description}',`;

        const resQry = await db.execRaw(`
            UPDATE stock_transaction
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
 * DELETE STOCK TRANSACTION
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
            DELETE  FROM  stock_transaction
            WHERE id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
