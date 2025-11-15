const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "staging", "production", "qa")
      .required(),
    PORT: Joi.number().default(6969),
    HOST: Joi.string().default("0.0.0.0"),
    FS_HOST: Joi.string().description("FS DB host"),
    FS_USER: Joi.string().description("FS DB username"),
    FS_PASSWORD: Joi.string().description("FS DB password"),
    FS_PORT: Joi.number().description("FS DB port"),
    FS_CLIENT: Joi.string().description("FS DB client"),
    FS_DATABASE: Joi.string().description("FS DB"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}


module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  host: envVars.HOST,
  db: {
    host: envVars.FE_HOST,
    user: envVars.FE_USER,
    password: envVars.FE_PASSWORD,
    port: envVars.FE_PORT,
    client: envVars.FE_CLIENT,
    database: envVars.FE_DATABASE,
  },
};

