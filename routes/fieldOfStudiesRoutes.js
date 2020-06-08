const express = require('express');
const authorize = require('../helpers/authorize');

const fieldOfStudiesController = require('../controllers/fieldOfStudiesController');

const router = express.Router();

router.get('/fieldOfStudies/', authorize(), fieldOfStudiesController.getFieldOfStudies);
router.post('/fieldOfStudies/', authorize(), fieldOfStudiesController.postFieldOfStudies);
router.put('/fieldOfStudies/', authorize(), fieldOfStudiesController.putFieldOfStudies);
router.delete('/fieldOfStudies/', authorize(), fieldOfStudiesController.deleteFieldOfStudies);

module.exports = router;
