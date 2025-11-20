"use strict";

const crypto = require("crypto");
const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
const { getDateNow } = require("../../utils/Helpers");
const config = require("../../config/config");



exports.list = async (Page, RowsPerPage) => {
    try {

        let db = new DatabaseHandler({
            host: config.db.host,
            client: config.db.client,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: process.env.FE_DATABASE,
        });

        if (Page != 0) {
            var offset = (Page - 1) * RowsPerPage;
        }


        const resQry = await db.execRaw(`
      SELECT *
       FROM  store  
      ORDER BY created_at DESC
      ${Page != 0
                ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY`
                : ""
            }
        `);

        const [total] = await db.execRaw(`
        SELECT COUNT(1) AS Total FROM store
        `);

        return {
            results: resQry,
            pagination: {
                TotalData: parseInt(total.total),
                TotalPage: Math.ceil(parseInt(total.total) / RowsPerPage),
                TotalPerPage: RowsPerPage,
            },
        }
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.create = async (code, name, address, type) => {
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
       FROM  store  
      WHERE id = '${id}'
        `);

        if (checkId.length > 0) {
            return {
                results: [],
            }
        }

        let columns = ['id'];
        let values = [`'${id}'`];

        if (name) {
            columns.push('name');
            values.push(`'${name}'`);
        }

        if (code) {
            columns.push('code');
            values.push(`'${code}'`);
        }

        if (address) {
            columns.push('address');
            values.push(`'${address}'`);
        }

        if (type) {
            columns.push('type');
            values.push(`'${type}'`);
        }

        const resQry = await db.execRaw(`
  INSERT INTO store (${columns.join(', ')})
  OUTPUT inserted.*
  VALUES (${values.join(', ')})
`);


        return resQry
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

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
         FROM  store  
      WHERE id = '${id}'
        `);

        return resQry || null;
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

exports.update = async (id, name, address, type) => {
    try {
        let db = new DatabaseHandler({
            host: config.db.host,
            client: config.db.client,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: process.env.FE_DATABASE,
        });

        let setClause = ""
        if (name) setClause += `name = '${name}',`
        if (address) setClause += `address = '${address}',`
        if (type) setClause += `type = '${type}',`

        const resQry = await db.execRaw(`
      UPDATE store
      SET ${setClause}, updated_at = '${getDateNow()}'
      OUTPUT inserted.*
        WHERE id = '${id}'
            `);

        return resQry
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

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
      DELETE  FROM  store
      WHERE id = '${id}'
        `);

        return resQry
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};
