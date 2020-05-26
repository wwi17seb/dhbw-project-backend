const express = require('express');
const authorize = require('../helpers/authorize');

const modulesController = require('../controllers/modulesController');

const router = express.Router();

router.post('/modules/', authorize(), modulesController.postModules);
router.put('/modules/', authorize(), modulesController.putModules);
router.delete('/modules/', authorize(), modulesController.deleteModules);

module.exports = router;
