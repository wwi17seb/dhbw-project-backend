const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.name The name of the person to whom to say hello
 * @throws {Error}
 * @return {Promise}
 */
module.exports.hello = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'hello ok!'
  };
};

