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
exports.create = async (
    code,
    store_id,
    subtotal,
    discount,
    tax,
    total,
    customer_id,
    user_id,
    device_id
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

        // Prevent duplicate ID (rare but you already check it)
        const checkId = await db.execRaw(`
            SELECT id FROM transactions WHERE id = '${id}'
        `);

        if (checkId.length > 0) {
            return { results: [] };
        }

        let columns = ['id'];
        let values = [`'${id}'`];

        if (code) { columns.push('code'); values.push(`'${code}'`); }
        if (store_id) { columns.push('store_id'); values.push(`'${store_id}'`); }
        if (subtotal !== undefined) { columns.push('subtotal'); values.push(`${subtotal}`); }
        if (discount !== undefined) { columns.push('discount'); values.push(`${discount}`); }
        if (tax !== undefined) { columns.push('tax'); values.push(`${tax}`); }
        if (total !== undefined) { columns.push('total'); values.push(`${total}`); }
        if (customer_id) { columns.push('customer_id'); values.push(`'${customer_id}'`); }
        if (user_id) { columns.push('user_id'); values.push(`'${user_id}'`); }
        if (device_id) { columns.push('device_id'); values.push(`'${device_id}'`); }

        // If created_at was not provided, fallback to now
        columns.push("created_at");
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
exports.update = async (
    id,
    code,
    store_id,
    subtotal,
    discount,
    tax,
    total,
    customer_id,
    user_id,
    created_at,
    synced_at,
    deleted_at,
    device_id
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

        let fields = {
            code,
            store_id,
            subtotal,
            discount,
            tax,
            total,
            customer_id,
            user_id,
            created_at,
            synced_at,
            deleted_at,
            device_id
        };

        let setClause =
            Object.entries(fields)
                .filter(([_, v]) => v !== undefined)
                .map(([k, v]) =>
                    `${k} = ${v === null ? 'NULL' : `'${v}'`}`
                )
                .join(", ");

        // Always update updated_at
        setClause += `, updated_at = '${getDateNow()}'`;

        const resQry = await db.execRaw(`
            UPDATE transactions
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
