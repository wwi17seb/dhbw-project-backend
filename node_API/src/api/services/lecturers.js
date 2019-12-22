const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.experience 
 * @param {String} options.comment 
 * @param {String} options.firstname 
 * @param {String} options.lastname 
 * @param {Integer} options.extern 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getLecturers = async (options) => {
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
    data: 'getLecturers ok!'
  };
};

/**
 * @param {Object} options
 * @param {Object} options.lecturersPost 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.postLecturers = async (options) => {
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
    data: 'postLecturers ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.id 
 * @param {Object} options.body 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.putLecturer = async (options) => {
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
    data: 'putLecturer ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.id 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteLecturer = async (options) => {
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
    data: 'deleteLecturer ok!'
  };
};

