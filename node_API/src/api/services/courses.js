const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.directorOfStudies ID of the course director
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getCourses = async (options) => {
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
    data: 'getCourses ok!'
  };
};

/**
 * @param {Object} options
 * @param {Object} options.body Course object that is added to the database. Object defined under definitions/coursesPost
 * @throws {Error}
 * @return {Promise}
 */
module.exports.postCourse = async (options) => {
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
    data: 'postCourse ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.courseID ID of the course
 * @param {Object} options.body 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updateCourse = async (options) => {
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
    data: 'updateCourse ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.courseID ID of the course
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteCourse = async (options) => {
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
    data: 'deleteCourse ok!'
  };
};

