const express = require('express');
const authorize = require('../helpers/authorize');

const semestersController = require('../controllers/semestersController');

const router = express.Router();

router.post('/semesters/', authorize(), semestersController.postSemesters);
router.put('/semesters/', authorize(), semestersController.putSemesters);
router.delete('/semesters/', authorize(), semestersController.deleteSemesters);

module.exports = router;
