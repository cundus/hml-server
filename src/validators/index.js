const { getBranchSchema } = require("./Branch.validator");

module.exports = {
  /*
   *    Branch
   */
  getBranchSchema: require("./Branch.validator")[
    "getBranchSchema"
  ],

};
