const { getStoreSchema } = require("./Store.validator");

module.exports = {
  /*
   *    Store
   */
  getStoreSchema: require("./Store.validator")[
    "getStoreSchema"
  ],

};
