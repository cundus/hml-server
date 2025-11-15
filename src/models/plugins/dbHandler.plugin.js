const { asyncLocalStorage } = require("../../middlewares/Context");
const { fillQueryWithBindings } = require("../../utils/QueryBindings");

class DatabaseHandler {
  constructor(config) {
    this.knex = require("knex")({
      client: config.client,
      connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port,
        options: {
          encrypt: false,
          enableArithAbort: true,
          trustServerCertificate: true,
        },
      },
      pool: { min: 0, max: 10 },
    });
  }

  async execRaw(qry, params = []) {
    const queryBuilder = this.knex.raw(qry, params);
    console.log("qry", qry);

    const store = asyncLocalStorage.getStore();
    if (store) {
      if (!store.has("queries")) {
        store.set("queries", []);
      }

      const { sql, bindings } = queryBuilder.toSQL();

      const filledSql = fillQueryWithBindings(sql, bindings);

      store.get("queries").push(filledSql);
    }

    return await queryBuilder;
  }

  destroyConnection() {
    this.knex.destroy();
  }
}

module.exports = {
  DatabaseHandler,
};
