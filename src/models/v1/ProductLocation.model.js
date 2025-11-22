"use strict";

const crypto = require("crypto");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");
const config = require("../../config/config");



/**
 * LIST PRODUCT LOCATIONS
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
             FROM  product_location  
            ORDER BY created_at DESC
            ${Page != 0 ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY` : ""}
        `);

        const [total] = await db.execRaw(`
            SELECT COUNT(1) AS Total
             FROM  product_location  
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
 * CREATE PRODUCT LOCATION
 */
exports.create = async (
    product_id,
    store_id,
    location,
    quantity,
    reserved_quantity,
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

        const columns = [
            'id', 'product_id', 'store_id', 'location', 'reserved_quantity', 'device_id', 'created_at', 'updated_at'
        ];
        const values = [
            `'${id}'`,
            product_id ? `'${product_id}'` : 'NULL',
            store_id ? `'${store_id}'` : 'NULL',
            store_id ? `'${store_id}'` : 'NULL',
            location ? `'${location}'` : 'NULL',
            reserved_quantity !== undefined ? reserved_quantity : 0,
            device_id ? `'${device_id}'` : 'NULL',
            `'${getDateNow()}'`,
            `'${getDateNow()}'`
        ];

        const resQry = await db.execRaw(`
            INSERT INTO product_location (${columns.join(', ')})
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
 * FIND PRODUCT LOCATION BY ID
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
             FROM  product_location  
            WHERE id = '${id}'
        `);

        return resQry || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * UPDATE PRODUCT LOCATION
 */
exports.update = async (
    id,
    product_id,
    store_id,
    location,
    quantity,
    reserved_quantity,
    device_id,
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
        if (product_id) setClause += `product_id = '${product_id}',`;
        if (store_id) setClause += `store_id = '${store_id}',`;
        if (location) setClause += `location = '${location}',`;
        if (quantity) setClause += `quantity = '${quantity}',`;
        if (reserved_quantity) setClause += `reserved_quantity = '${reserved_quantity}',`;
        if (device_id) setClause += `device_id = '${device_id}',`;

        const resQry = await db.execRaw(`
            UPDATE product_location
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
 * DELETE PRODUCT LOCATION
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
            DELETE  FROM  product_location
            WHERE id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
