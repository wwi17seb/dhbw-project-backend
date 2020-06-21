function queryToStringWithoutToken(query) {
  return Object.keys(query).reduce((str, key) => {
    if (key === 'token') return str;
    return str + (str.length === 0 ? '?' : '&') + key + '=' + query[key];
  }, '');
}

const CONSOLE_LOG_COLOR_FG_CYAN = '\x1b[36m';
const CONSOLE_LOG_COLOR_RESET = '\x1b[0m';

module.exports = function (req, res, next) {
  console.log(
    `${CONSOLE_LOG_COLOR_FG_CYAN}${req.method} ${req._parsedUrl.pathname}${queryToStringWithoutToken(
      req.query
    )}${CONSOLE_LOG_COLOR_RESET}`
  );
  next();
};
