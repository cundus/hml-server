const moment = require("moment");

const getDateNow = (type) => {
  switch (type) {
    case "full":
      return moment().format("YYYY-MM-DD HH:mm:ss");
    case "y-m-d":
      return moment().format("YYYY-MM-DD");
    case "ymd":
      return moment().format("YYYYMMDD");
    case "-1D":
      return moment().subtract(1, "days").format("YYYY-MM-DD");
    case "+1D":
      return moment().add(1, "days").format("YYYY-MM-DD");
    case "+1M":
      return moment().add(1, "M").format("YYYYMMDD");
    case "yymmdd":
      return moment().format("YYMMDD");
    case "ddmmyy":
      return moment().format("DDMMYY");
    default:
      return moment().format("YYYY-MM-DD HH:mm:ss");
  }
};

const getTimeNow = (type) => {
  switch (type) {
    case "full":
      return moment().format("HH:mm:ss");
    case "h:m":
      return moment().format("HH:mm");
    default:
      return moment().format("HH:mm:ss");
  }
};

const formatTime = (data) => {
  const d = new Date(data);
  const getHour = d.getUTCHours();
  const getMinute = d.getUTCMinutes();
  const getSecond = d.getUTCSeconds();

  const time =
    ("0" + getHour).slice(-2) +
    ":" +
    ("0" + getMinute).slice(-2) +
    ":" +
    ("0" + getSecond).slice(-2);
  return time;
};

const formatDate = (data, type) => {
  switch (type) {
    case "full":
      return moment(data).utc().format("YYYY-MM-DD HH:mm:ss");
    case "y-m-d":
      return moment(data).format("YYYY-MM-DD");
    case "ymd":
      return moment(data).format("YYYYMMDD");
    case "dmy":
      return moment(data).format("DDMMYYYY");
    case "yymmdd":
      return moment(data).format("YYMMDD");
    case "ddmmyy":
      return moment(data).format("DDMMYY");
    default:
      return moment(data).utc().format("YYYY-MM-DD HH:mm:ss");
  }
};

const pagination = (Page = 1, TotalData, RowsPerPage = 100) => {
  let result = {
    Page: Page,
    TotalData: parseInt(TotalData),
    TotalPage: Math.ceil(TotalData / RowsPerPage),
    TotalPerPage: parseInt(RowsPerPage),
  };

  return result;
};

/**
 * Adds a condition to a SQL WHERE clause safely.
 *
 * @param {string} query - The existing WHERE clause string.
 * @param {string} field - The database field name.
 * @param {*} value - A string or number to compare to (or null/empty).
 * @param {boolean} isString - Whether the value should be quoted as a string.
 * @returns {string} Updated WHERE clause.
 */
function addCondition(query, field, value, isString = true) {
  if (value === null || value === undefined || value === "") return query;
  const formattedValue = isString ? `'${value}'` : value;
  return query + ` and ${field} = ${formattedValue}`;
}

/**
 * Adds a BETWEEN date condition to a SQL WHERE clause safely.
 *
 * @param {string} query - The existing WHERE clause string.
 * @param {string} field - The date field name.
 * @param {string|null} startDate - Start of date range.
 * @param {string|null} endDate - End of date range.
 * @returns {string} Updated WHERE clause.
 */
function addDateRangeCondition(query, field, startDate, endDate) {
  const hasStart = startDate && startDate.trim() !== "";
  const hasEnd = endDate && endDate.trim() !== "";

  if (hasStart && hasEnd) {
    return query + ` and ${field} BETWEEN '${startDate}' AND '${endDate}'`;
  } else if (hasStart) {
    return query + ` and ${field} >= '${startDate}'`;
  } else if (hasEnd) {
    return query + ` and ${field} <= '${endDate}'`;
  }
  return query;
}

module.exports = {
  getDateNow,
  getTimeNow,
  formatTime,
  formatDate,
  pagination,
  addCondition,
  addDateRangeCondition,
};
