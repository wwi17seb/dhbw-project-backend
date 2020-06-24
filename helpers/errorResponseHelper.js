const responseHelper = require('./responseHelper');
const CONSOLE_LOG_COLOR_FG_CYAN = '\x1b[36m';
const CONSOLE_LOG_COLOR_RESET = '\x1b[0m';

module.exports = (res, next, error) => {
  console.error(`${CONSOLE_LOG_COLOR_FG_CYAN}[MESSAGE]: ${error.message}${CONSOLE_LOG_COLOR_RESET}`);

  if (error.message.startsWith('notNull Violation: ') && error.message.endsWith(' cannot be null')) {
    return responseHelper(res, 400, error.message);
  }
  if (error.message.startsWith('invalid input syntax for type')) {
    return responseHelper(res, 400, error.message);
  }
  if (error.message.startsWith('No ') && error.message.endsWith(' found to update')) {
    return responseHelper(res, 400, error.message);
  }
  if (error.message.startsWith('No ') && error.message.endsWith(' found to delete')) {
    return responseHelper(res, 400, error.message);
  }
  if (error.message.startsWith('No ') && error.message.endsWith(' given')) {
    return responseHelper(res, 400, error.message);
  }
  if (error.message.endsWith(' could not be found')) {
    return responseHelper(res, 404, error.message);
  }
  if (error.message.endsWith(' can not be empty')) {
    return responseHelper(res, 400, error.message);
  }
  if (error.message.startsWith('You are not authorized to ')) {
    return responseHelper(res, 403, error.message);
  }
  if (error.message.includes(' no such file or directory')) {
    return responseHelper(res, 404, 'File not found');
  }

  if (error.parent) {
    const parent = error.parent;

    if (parent.detail) {
      const detail = parent.detail;
      console.error(`${CONSOLE_LOG_COLOR_FG_CYAN}[PARENT]: ${parent}${CONSOLE_LOG_COLOR_RESET}`);

      if (detail.startsWith('Key ') && detail.includes(' is not present in table ')) {
        return responseHelper(res, 400, detail);
      }
      if (detail.startsWith('Key ') && detail.includes(' already exists.')) {
        return responseHelper(res, 400, detail);
      }
    }
  }
  return next(error);
};
