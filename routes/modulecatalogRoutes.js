const express = require('express');
const authorize = require('../helpers/authorize');

const modulecatalogController = require('../controllers/modulecatalogController');

const router = express.Router();

router.get('/modulecatalog/', authorize(), modulecatalogController.getModulecatalog);

module.exports = router;
