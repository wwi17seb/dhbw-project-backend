const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {Object} options.body Pet object that needs to be added to the store
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addPet = async (options) => {
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
    data: 'addPet ok!'
  };
};

/**
 * @param {Object} options
 * @param {Object} options.body Pet object that needs to be added to the store
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updatePet = async (options) => {
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
    data: 'updatePet ok!'
  };
};

/**
 * @param {Object} options
 * @param {Array} options.status Status values that need to be considered for filter
 * @throws {Error}
 * @return {Promise}
 */
module.exports.findPetsByStatus = async (options) => {
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
    data: 'findPetsByStatus ok!'
  };
};

/**
 * @param {Object} options
 * @param {Array} options.tags Tags to filter by
 * @throws {Error}
 * @return {Promise}
 */
module.exports.findPetsByTags = async (options) => {
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
    data: 'findPetsByTags ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.petId ID of pet to return
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getPetById = async (options) => {
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
    data: 'getPetById ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.petId ID of pet that needs to be updated
 * @param {String} options.name Updated name of the pet
 * @param {String} options.status Updated status of the pet
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updatePetWithForm = async (options) => {
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
    data: 'updatePetWithForm ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.api_key 
 * @param {Integer} options.petId Pet id to delete
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deletePet = async (options) => {
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
    data: 'deletePet ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.petId ID of pet to update
 * @param {String} options.additionalMetadata Additional data to pass to server
 * @param {File} options.file file to upload
 * @throws {Error}
 * @return {Promise}
 */
module.exports.uploadFile = async (options) => {
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
    data: 'uploadFile ok!'
  };
};

