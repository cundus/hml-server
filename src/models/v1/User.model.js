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
        database: "public",
    });
}

// ==============================
// LIST user
// ==============================
exports.list = async (Page, RowsPerPage) => {
    try {
        const db = dbConn();

        if (Page != 0) {
            var offset = (Page - 1) * RowsPerPage;
        }

        const resQry = await db.execRaw(`
      SELECT *
      FROM user WITH(NOLOCK)
      ORDER BY created_at DESC
      ${Page != 0
                ? `OFFSET ${offset} ROWS FETCH NEXT ${RowsPerPage} ROWS ONLY`
                : ""
            }
    `);

        const total = await db.execRaw(`
      SELECT COUNT(1) AS Total
      FROM user WITH(NOLOCK)
        `);

        return {
            results: resQry,
            pagination: {
                TotalData: total["Total"],
                TotalPage: Math.ceil(parseInt(total["Total"]) / limit),
                TotalPerPage: limit,
            },
        }
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// // ==============================
// // GET ONE USER
// // ==============================
// exports.findById = async (id) => {
//     try {
//         const db = dbConn();

//         const resQry = await db.execRaw(`
//       SELECT *
//       FROM user WITH(NOLOCK)
//       WHERE id = '${id}'
//     `);

//         return resQry[0] || null;
//     } catch (err) {
//         console.log(err.message);
//         return { err };
//     }
// };

// ==============================
// UPDATE USER
// ==============================
exports.update = async (name, email, password, store_id, deviceId) => {
    try {
        const db = dbConn();

        let setClause = ""
        if (name) setClause += `name = '${name}',`
        if (email) setClause += `email = '${email}',`
        if (password) setClause += `password = '${password}',`
        if (store_id) setClause += `store_id = '${store_id}',`
        if (deviceId) setClause += `deviceId = '${deviceId}',`

        const resQry = await db.execRaw(`
      UPDATE user
      SET ${setClause}, updated_at = '${getDateNow()}'
      OUTPUT inserted.*
      WHERE email = '${email}'
    `);

        return {
            results: resQry
        };
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// ==============================
// DELETE USER
// ==============================
exports.remove = async (email) => {
    try {
        const db = dbConn();

        const resQry = await db.execRaw(`
      DELETE FROM user WHERE email = '${email}'
    `);

        return {
            results: resQry
        };
    } catch (err) {
        console.log(err.message);
        return { err };
    }
};

// // ==============================
// // FIND BY USERNAME (for login)
// // ==============================
// exports.findByUsername = async (username) => {
//     try {
//         const db = dbConn();

//         const request = db.request();
//         request.input("username", username);

//         const resQry = await request.query(`
//             SELECT * FROM user WITH(NOLOCK)
//             WHERE username = @username
//         `);

//         return { results: resQry };
//     } catch (err) {
//         return { err };
//     }
// }