const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const checkPrivilegesHelper = require('../helpers/checkPrivilegesHelper');
const { getLocalKey, setLocalKey, LOCAL_KEYS } = require('../helpers/localKeysFileHelper');

exports.getGoogleCalendarStuff = async (req, res) => {
  const GoogleCalendar = await getLocalKey(LOCAL_KEYS.GOOGLE_CALENDAR);
  return responseHelper(res, 200, 'Successful', { GoogleCalendar });
};

exports.putGoogleCalendarStuff = async (req, res) => {
  const directorOfStudiesToCheck_id = req.token.directorOfStudies_id;
  const GoogleCalendar = req.body;

  if (!(await checkPrivilegesHelper(directorOfStudiesToCheck_id))) {
    return responseHelper(res, 403, 'You do not have the privileges to perform this task!');
  }

  try {
    setLocalKey(LOCAL_KEYS.GOOGLE_CALENDAR, GoogleCalendar);
    return responseHelper(res, 200, 'Successfully updated', true);
  } catch (error) {
    return errorResponseHelper(res, error);
  }
};
