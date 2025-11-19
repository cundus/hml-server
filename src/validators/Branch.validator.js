const Joi = require("joi");

exports.storeSchema = Joi.object({
  // ProductId: Joi.string().required(),
  // ReconcileStatus: Joi.string().required(),
  // ReconciliationType: Joi.string().allow(""),
  // FeatureId: Joi.string().allow(""),
  // TransactionDate: Joi.array().required(),
  // UniqueTransactionID: Joi.string().allow(""),
  // RelatedReference: Joi.string().allow(""),
  // AccountID: Joi.string().allow(""),
  // CurrencyCode: Joi.string().allow(""),
  // TransactionAmount: Joi.string().allow(""),
  // Batch: Joi.string().allow(""),
  // Role: Joi.string().valid("maker", "checker", "signer").required(),
  // FlagSuspectStatus: Joi.string().allow(""),
  // Page: Joi.number().integer().positive().required(),
  // RowsPerPage: Joi.number().integer().positive().required(),
  // SourceOfFund: Joi.string().allow(""),
  // Channel: Joi.string().allow(""),
  // ReportDate: Joi.array().allow(""),
});

