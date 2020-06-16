const express = require('express');
const authorize = require('../helpers/authorize');

const fieldsOfStudyController = require('../controllers/fieldsOfStudyController');

const router = express.Router();

router.get('/fieldsOfStudy/', authorize(), fieldsOfStudyController.getFieldsOfStudy);
router.post('/fieldsOfStudy/', authorize(), fieldsOfStudyController.postFieldsOfStudy);
router.put('/fieldsOfStudy/', authorize(), fieldsOfStudyController.putFieldsOfStudy);
router.delete('/fieldsOfStudy/', authorize(), fieldsOfStudyController.deleteFieldsOfStudy);

module.exports = router;
