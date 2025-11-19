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
 * LIST PRODUCT
 */
exports.list = async (Page, RowsPerPage) => {
    try {
        const db = dbConn();
        let offset = 0;

        if (Page != 0) offset = (Page - 1) * RowsPerPage;

        const data = await db.execRaw(`
            SELECT *
            FROM product WITH(NOLOCK)
            ORDER BY created_at DESC
            ${Page != 0 ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY` : ""}
        `);

        const total = await db.execRaw(`
            SELECT COUNT(1) AS Total
            FROM product WITH(NOLOCK)
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

exports.create = async (sku, name, description, unit, cost, category_id) => {
    try {
        const db = dbConn();
        const id = crypto.randomUUID();

        // Cek ID random jika bentrok
        const exists = await db.execRaw(`
            SELECT id FROM product WHERE id = '${id}'
        `);

        if (exists.length > 0) {
            return { results: [] };
        }

        let columns = ["id"];
        let values = [`'${id}'`];

        if (sku) { columns.push("sku"); values.push(`'${sku}'`); }
        if (name) { columns.push("name"); values.push(`'${name}'`); }
        if (description) { columns.push("description"); values.push(`'${description}'`); }
        if (unit) { columns.push("unit"); values.push(`'${unit}'`); }
        if (cost !== undefined) { columns.push("cost"); values.push(`${cost}`); }
        if (category_id) { columns.push("category_id"); values.push(`'${category_id}'`); }

        columns.push("createdAt");
        values.push("GETDATE()");

        columns.push("updatedAt");
        values.push("GETDATE()");

        const resQry = await db.execRaw(`
            INSERT INTO product (${columns.join(", ")})
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
 * FIND BY ID
 */
exports.findById = async (id) => {
    try {
        const db = dbConn();

        const result = await db.execRaw(`
            SELECT *
            FROM product WITH(NOLOCK)
            WHERE id = '${id}'
        `);

        return result[0] || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * UPDATE PRODUCT
 */


exports.update = async (id, sku, name, description, unit, cost, category_id) => {
    try {
        const db = dbConn();

        let sets = [];

        if (sku) { sets.push(`sku = '${sku}'`); }
        if (name) { sets.push(`name = '${name}'`); }
        if (description) { sets.push(`description = '${description}'`); }
        if (unit) { sets.push(`unit = '${unit}'`); }
        if (cost !== undefined) { sets.push(`cost = ${cost}`); }
        if (category_id) { sets.push(`category_id = '${category_id}'`); }

        sets.push("updatedAt = GETDATE()");

        const resQry = await db.execRaw(`
            UPDATE product
            SET ${sets.join(", ")}
            OUTPUT inserted.*
            WHERE id = '${id}' AND deletedAt IS NULL
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};


/**
 * DELETE PRODUCT (Hard Delete)
 */
exports.remove = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
            DELETE FROM product
            WHERE id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
