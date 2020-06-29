const express = require('express');
const authorize = require('../helpers/authorize');

const transferOwnershipController = require('../controllers/transferOwnershipController');

const router = express.Router();

router.post('/transferOwnership/', authorize(), transferOwnershipController.transferOwnership);

module.exports = router;
