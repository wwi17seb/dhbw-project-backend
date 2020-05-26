const express = require('express');
const authorize = require('../helpers/authorize');

const majorSubjectsController = require('../controllers/majorSubjectsController');

const router = express.Router();

router.get('/majorSubjects/', authorize(), majorSubjectsController.getMajorSubjects);
router.post('/majorSubjects/', authorize(), majorSubjectsController.postMajorSubjects);
router.put('/majorSubjects/', authorize(), majorSubjectsController.putMajorSubjects);
router.delete('/majorSubjects/', authorize(), majorSubjectsController.deleteMajorSubjects);

module.exports = router;
