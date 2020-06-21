function queryToStringWithoutToken (query) {
  return Object.keys(query).reduce((str, key) => {
      if (key === "token") return str;
      return str + (str.length === 0 ? "?" : "&") + key + "=" + query[key];
  }, "");
}

module.exports = function (req, res, next) {
  console.log(`${req.method} ${req._parsedUrl.pathname}${queryToStringWithoutToken(req.query)}`);
  next();
};