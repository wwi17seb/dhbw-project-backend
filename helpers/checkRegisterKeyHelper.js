const { getLocalKey, LOCAL_KEYS } = require('./localKeysFileHelper');

module.exports = checkRegisterKey;

function checkRegisterKey(key) {
  const registerKey = getLocalKey(LOCAL_KEYS.REGISTER_KEY);
  return registerKey && registerKey === key;
}
