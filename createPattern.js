var argument = process.argv;
const fs = require("node:fs");

try {
  // model
  const contentModel = `
    "use strict"

    const config = require("../../config/config");
    const { DatabaseHandler } = require("../plugins/dbHandler.plugin");
    const { getDateNow } = require("../../utils/Helpers");
    `;

  fs.writeFileSync(`./src/models/v1/${argument[2]}.model.js`, contentModel);

  // controller
  const contentController = `
    "use strict"

    const { ${argument[2]}Model } = require("../../models");
    const sendResponse = require("../../utils/Response");
    `;

  fs.writeFileSync(
    `./src/controllers/v1/${argument[2]}.controller.js`,
    contentController
  );

  // route
  const contentRoute = `
    "use strict"

    const express = require("express");
    const router = express.Router();
    const Validator = require("../../middlewares/Validator");
    const ${argument[2]} = require("../../controllers/v1/${argument[2]}.controller");

    router.post("/", ${argument[2]}.someMethod)

    module.exports = router
  `;

  fs.writeFileSync(`./src/routes/v1/${argument[2]}.route.js`, contentRoute);

  // validator
  const contentValidator = `
    const Joi = require("joi")

    exports.someMethodSchema = Joi.object({
        PN: Joi.string().required(),
        Username: Joi.string().required(),
        ProductName: Joi.string().allow(""),
        Page: Joi.number().integer().required(),
    });
  `;

  fs.writeFileSync(
    `./src/validators/${argument[2]}.validator.js`,
    contentValidator
  );
} catch (err) {
  console.log(err);
}
