const express = require('express');
const authorize = require('../helpers/authorize');

const modulcatalogController = require('../controllers/modulecatalogController');

const router = express.Router();

router.get('/modulecatalog/', authorize(), modulcatalogController.getModulcatalog);

module.exports = router;
