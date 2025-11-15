"use strict";

const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const routes = require("./routes/v1/index");
const createHttpError = require("http-errors");
// const logger = require("./middlewares/Logger");
const sendResponse = require("./utils/Response");
const loggerContext = require("./middlewares/LoggerContext");

const app = express();


// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// // parse request to DB
// app.use(logger());

// Init context per request
app.use(loggerContext());

// v1 api routes
app.use("/v1", routes);
app.get("/", (req, res) => {
    return sendResponse(req, res, "00", {
        message: "welcome to Finance-System ",
    });
});

//* Catch HTTP 404
app.use((req, res, next) => {
    next(createHttpError(404));
});

//* Error Handler
app.use((err, req, res, next) => {
    if (err.status == 500) {
        return sendResponse(req, res, 99, err.message);
    } else {
        if (err.status == 422)
            return sendResponse(req, res, "02", {
                message: err.message,
            });
    }
});

module.exports = app;
