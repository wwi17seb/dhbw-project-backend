module.exports = (obj, properties) => {
  let newObject = {};
  for (let property of properties) {
    newObject[property] = property in obj ? obj[property] : null;
  }
  return newObject;
};
