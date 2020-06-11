module.exports = (res, status, message, payload = null) => {
  return res.status(status).send({ message, payload });
};
