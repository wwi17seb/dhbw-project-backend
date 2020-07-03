const responseHelper = require('./responseHelper');
const CONSOLE_LOG_COLOR_FG_RED = '\x1b[31m';
const CONSOLE_LOG_COLOR_FG_CYAN = '\x1b[36m';
const CONSOLE_LOG_COLOR_RESET = '\x1b[0m';

const MODE = 'dev';

module.exports = (res, error) => {
  const returnErrorMessageConditions = [
    { startsWith: 'notNull Violation: ', endsWith: ' cannot be null' },
    { startsWith: 'invalid input syntax for type' },
    { startsWith: 'invalid input syntax for integer: ' },
    { startsWith: 'No ', endsWith: ' found to update' },
    { startsWith: 'No ', endsWith: ' found to delete' },
    { startsWith: 'No ', endsWith: ' given' },
    { endsWith: ' could not be found', code: 404 },
    { endsWith: ' can not be empty' },
    { startsWith: 'You are not authorized to ', code: 403 },
    { includes: ' no such file or directory', code: 404, message: 'File not found' },
    { endsWith: ' can not be empty' },
    { matches: ['Register key is invalid', 'Old password is wrong', 'The username is already taken'] },
    { startsWith: 'Unexpected token ', includes: ' in JSON at position ' },
    { includes: 'No required filter given' },
    { includes: 'Can not filter by course and lecturer at the same time' },
  ];
  for (const condition of returnErrorMessageConditions) {
    if (
      (condition.startsWith === undefined || error.message.startsWith(condition.startsWith)) &&
      (condition.endsWith === undefined || error.message.endsWith(condition.endsWith)) &&
      (condition.includes === undefined || error.message.includes(condition.includes)) &&
      (condition.matches === undefined || condition.matches.includes(error.message))
    ) {
      return responseHelper(res, condition.code || 400, condition.message || error.message);
    }
  }

  if (error.parent) {
    const parent = error.parent;

    if (parent.detail) {
      const detail = parent.detail;
      if (MODE === 'dev') {
        console.error(`${CONSOLE_LOG_COLOR_FG_CYAN}[PARENT]: ${parent}${CONSOLE_LOG_COLOR_RESET}`);
      }

      if (detail.startsWith('Key ') && detail.includes(' is not present in table ')) {
        return responseHelper(res, 400, detail);
      }
      if (detail.startsWith('Key ') && detail.includes(' already exists.')) {
        return responseHelper(res, 400, detail);
      }
    }
  }

  console.error(`${CONSOLE_LOG_COLOR_FG_RED}[ERROR]: ${error.message}${CONSOLE_LOG_COLOR_RESET}`);
  if (MODE === 'dev') {
    console.error(error);
  }
  return responseHelper(res, 500, 'Internal Server Error');
};
