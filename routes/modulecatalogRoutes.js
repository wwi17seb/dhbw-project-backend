const express = require('express');
const authorize = require('../helpers/authorize');

const modulcatalogController = require('../controllers/modulcatalogController');

const router = express.Router();

router.get('/modulcatalog/', authorize(), modulcatalogController.getModulcatalog);

module.exports = router;
