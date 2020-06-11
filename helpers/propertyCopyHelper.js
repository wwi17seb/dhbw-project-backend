module.exports = (obj, properties) => {
  let newObject = {};
  for (let property of properties) {
    newObject[property] = obj[property] || null;
  }
  return newObject;
};
