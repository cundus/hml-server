"use strict";

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
        database: "ReconciliationConfig",
    });
}

/**
 * LIST PRICES
 */
exports.list = async ({ limit, offset }) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
            SELECT *
            FROM Prices WITH(NOLOCK)
            WHERE deletedAt IS NULL
            ORDER BY createdAt DESC
            OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * CREATE PRICE
 */
exports.create = async ({
    productId,
    amount,
    category,
    createdAt,
    deletedAt,
}) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
            INSERT INTO Prices (
                productId,
                amount,
                category,
                createdAt,
                deletedAt
            )
            OUTPUT inserted.*
            VALUES (
                '${productId}',
                ${amount},
                '${category}',
                '${createdAt}',
                ${deletedAt ? `'${deletedAt}'` : "NULL"}
            )
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

        const resQry = await db.execRaw(`
            SELECT *
            FROM Prices WITH(NOLOCK)
            WHERE Id = '${id}'
        `);

        return resQry[0] || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * UPDATE PRICE
 */
exports.update = async (id, payload) => {
    try {
        const db = dbConn();

        const setClause = Object.keys(payload)
            .map((key) => `${key} = '${payload[key]}'`)
            .join(", ");

        const resQry = await db.execRaw(`
            UPDATE Prices
            SET ${setClause},
                updatedAt = '${getDateNow()}'
            OUTPUT inserted.*
            WHERE Id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

/**
 * SOFT DELETE PRICE
 */
exports.remove = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
            UPDATE Prices
            SET deletedAt = '${getDateNow()}'
            WHERE Id = '${id}'
        `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
