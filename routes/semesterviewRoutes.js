const express = require('express');
const authorize = require('../helpers/authorize');

const semesterviewController = require('../controllers/semesterviewController');

const router = express.Router();

router.get('/semesterview/', authorize(), semesterviewController.getSemesterview);

module.exports = router;
