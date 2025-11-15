const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

let server;
require("knex")({
    client: config.db.client,
    connection: {
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database,
        port: config.db.port,
        ssl: { rejectUnauthorized: false },
    },
    pool: {
        min: 0,
        max: 10,
    },
})
    .raw("select 1")
    .then(() => {
        logger.info("Connected to New RE DB");
        server = app.listen(config.port, config.host, () => {
            logger.info(`Listening to port ${config.port}`);
        });
    })
    .catch((err) => {
        logger.info("Not Connected to New RE DB");
        logger.error(err);
    });

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
