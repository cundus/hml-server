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

exports.list = async ({ limit, offset }) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      SELECT *
      FROM Branches WITH(NOLOCK)
      ORDER BY createdAt DESC
      OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY
    `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.create = async ({ name, address, city, createdAt, updatedAt }) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      INSERT INTO Branches (name, address, city, createdAt, updatedAt)
      OUTPUT inserted.*
      VALUES (
        '${name}',
        ${address ? `'${address}'` : "NULL"},
        ${city ? `'${city}'` : "NULL"},
        '${createdAt}',
        '${updatedAt}'
      )
    `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.findById = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      SELECT *
      FROM Branches WITH(NOLOCK)
      WHERE id = '${id}'
    `);

        return resQry[0] || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.update = async (id, payload) => {
    try {
        const db = dbConn();

        const setClause = Object.keys(payload)
            .map((key) => `${key} = '${payload[key]}'`)
            .join(", ");

        const resQry = await db.execRaw(`
      UPDATE Branches
      SET ${setClause}, updatedAt = '${getDateNow()}'
      OUTPUT inserted.*
      WHERE id = '${id}'
    `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.remove = async (id) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      DELETE FROM Branches
      WHERE id = '${id}'
    `);

        return resQry;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
