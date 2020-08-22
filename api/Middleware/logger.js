const moment = require("moment");

const logger = (req, res, next) => {
  console.log(`[${moment().format()}]: ${req.originalUrl}`);
  next();
};

module.exports = logger;
