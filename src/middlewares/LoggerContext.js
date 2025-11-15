const { asyncLocalStorage } = require("./Context");

module.exports = function () {
  return (req, res, next) => {
    asyncLocalStorage.run(new Map(), () => {
      next();
    });
  };
};
