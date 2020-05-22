const express = require('express');
const authorize = require('../helpers/authorize');

const semesterviewController = require('../controllers/semesterviewController');

const router = express.Router();

router.get('/semesterview/', authorize(), semesterviewController.getSemesterview); // TODO: id?
router.put('/semesterview/:id', authorize(), semesterviewController.putSemesterview); // TODO: muss über ID geschehen! req.params.__name__


module.exports = router;