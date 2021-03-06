const express = require('express');
const authorize = require('../helpers/authorize');

const academicRecordsController = require('../controllers/academicRecordsController');

const router = express.Router();

router.get('/academicRecords', authorize(), academicRecordsController.getAcademicRecords);
router.post('/academicRecords', authorize(), academicRecordsController.postAcademicRecords);
router.put('/academicRecords', authorize(), academicRecordsController.putAcademicRecords);
router.delete('/academicRecords', authorize(), academicRecordsController.deleteAcademicRecords);

module.exports = router;
