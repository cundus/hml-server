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
      },
      pool: {
        min: 0,
        max: 20,  // or more, depending on your load
        acquireTimeoutMillis: 60000,
        idleTimeoutMillis: 30000,
        propagateCreateError: false, // optional but helps in some failure cases
      },
      postProcessResponse: (result) => {
        // If it's a raw query result from Postgres, it will be an object
        if (result && result.rows) {
          return result.rows;
        }
        return result;
      }
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
