"use strict";

const crypto = require("crypto");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");
const config = require("../../config/config");



/**
 * LIST TRANSACTIONS
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
             FROM  transactions  
            ORDER BY created_at DESC
            ${Page != 0 ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY` : ""}
        `);

        const [total] = await db.execRaw(`
            SELECT COUNT(1) AS Total
             FROM  transactions  
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
 * CREATE TRANSACTION
 */
exports.create = async (transaction_date, customer_id, total_amount, description, created_by) => {
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
             FROM  transactions  
            WHERE id = '${id}'
        `);

        if (checkId.length > 0) {
            return { results: [] };
        }

        let columns = ['id'];
        let values = [`'${id}'`];

        if (transaction_date) { columns.push('transaction_date'); values.push(`'${transaction_date}'`); }
        if (customer_id) { columns.push('customer_id'); values.push(`'${customer_id}'`); }
        if (total_amount !== undefined) { columns.push('total_amount'); values.push(`${total_amount}`); }
        if (description) { columns.push('description'); values.push(`'${description}'`); }
        if (created_by) { columns.push('created_by'); values.push(`'${created_by}'`); }

        columns.push('created_at');
        values.push(`'${getDateNow()}'`);

        columns.push('updated_at');
        values.push(`'${getDateNow()}'`);

        const resQry = await db.execRaw(`
            INSERT INTO transactions (${columns.join(', ')})
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
 * FIND TRANSACTION BY ID
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
             FROM  transactions  
            WHERE id = '${id}'
        `);

        return resQry || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * UPDATE TRANSACTION
 */
exports.update = async (id, transaction_date, customer_id, total_amount, description) => {
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
        if (transaction_date) setClause += `transaction_date = '${transaction_date}',`;
        if (customer_id) setClause += `customer_id = '${customer_id}',`;
        if (total_amount !== undefined) setClause += `total_amount = ${total_amount},`;
        if (description) setClause += `description = '${description}',`;

        const resQry = await db.execRaw(`
            UPDATE transactions
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
 * DELETE TRANSACTION
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
            DELETE  FROM  transactions
            WHERE id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
