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

/**
 * LIST PRODUCT PRICE
 */
exports.list = async ({ Page, RowsPerPage }) => {
    try {
        const db = dbConn();
        let offset = 0;

        if (Page != 0) offset = (Page - 1) * RowsPerPage;

        const data = await db.execRaw(`
            SELECT *
            FROM product_price WITH(NOLOCK)
            ORDER BY createdAt DESC
            ${Page != 0 ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY` : ""}
        `);

        const total = await db.execRaw(`
            SELECT COUNT(1) AS Total
            FROM product_price WITH(NOLOCK)
        `);

        return {
            results: data,
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


/**
 * CREATE PRODUCT PRICE
 */
exports.create = async (product_id, store_id, price, start_date, end_date) => {
    try {
        const db = dbConn();
        const id = crypto.randomUUID();

        // Pastikan ID unik
        const exists = await db.execRaw(`
            SELECT id FROM product_price WHERE id = '${id}'
        `);

        if (exists.length > 0) {
            return { results: [] };
        }

        let columns = ["id"];
        let values = [`'${id}'`];

        if (product_id) { columns.push("product_id"); values.push(`'${product_id}'`); }
        if (store_id) { columns.push("store_id"); values.push(`'${store_id}'`); }
        if (price !== undefined) { columns.push("price"); values.push(`${price}`); }
        if (start_date) { columns.push("start_date"); values.push(`'${start_date}'`); }
        if (end_date) { columns.push("end_date"); values.push(`'${end_date}'`); }

        columns.push("createdAt");
        values.push("GETDATE()");

        columns.push("updatedAt");
        values.push("GETDATE()");

        const resQry = await db.execRaw(`
            INSERT INTO product_price (${columns.join(", ")})
            OUTPUT inserted.*
            VALUES (${values.join(", ")})
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};


/**
 * FIND PRODUCT PRICE BY ID
 */
exports.findById = async (id) => {
    try {
        const db = dbConn();

        const result = await db.execRaw(`
            SELECT *
            FROM product_price WITH(NOLOCK)
            WHERE id = '${id}'
        `);

        return result[0] || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};


/**
 * UPDATE PRODUCT PRICE
 */
exports.update = async (id, product_id, store_id, price, start_date, end_date) => {
    try {
        const db = dbConn();

        let sets = [];

        if (product_id) { sets.push(`product_id = '${product_id}'`); }
        if (store_id) { sets.push(`store_id = '${store_id}'`); }
        if (price !== undefined) { sets.push(`price = ${price}`); }
        if (start_date) { sets.push(`start_date = '${start_date}'`); }
        if (end_date) { sets.push(`end_date = '${end_date}'`); }

        sets.push(`updatedAt = GETDATE()`);

        const resQry = await db.execRaw(`
            UPDATE product_price
            SET ${sets.join(", ")}
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
 * DELETE PRODUCT PRICE
 */
exports.remove = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
            DELETE FROM product_price
            WHERE id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
