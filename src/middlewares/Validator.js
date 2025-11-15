//* middlewares/Validator.js
const createHttpError = require("http-errors");
//* Include joi to check error type
const Joi = require("joi");
//* Include all validators
const Validators = require("../validators");
const sendResponse = require("../utils/Response");

module.exports = function (validator) {
    return async function (req, res, next) {
        try {
            //! If validator is not exist, throw GE
            if (!Validators.hasOwnProperty(validator))
                // throw new Error(`'${validator}' validator is not exist`);
                return sendResponse(req, res, "99", {
                    message: `'${validator}' validator is not exist`,
                });
            const validated = await Validators[validator].validateAsync(req.body, {
                abortEarly: false,
            });
            req.body = validated;
            next();
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if (err.isJoi) {
                let detailsLength = err.details.length;
                let messageArr = [];
                for (let i = 0; i < detailsLength; i++) {
                    messageArr.push({
                        key: err.details[i]["path"][0],
                        message: err.details[i]["message"]
                            .replace(`"`, "")
                            .replace(`"`, ""),
                    });
                }
                return next(sendResponse(req, res, "02", messageArr));
            }
            next(createHttpError(500));
        }
    };
};
