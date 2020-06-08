const express = require('express');
const authorize = require('../helpers/authorize');

const lecturesController = require('../controllers/lecturesController');

const router = express.Router();

router.post('/lectures', authorize(), lecturesController.postLectures);
router.put('/lectures', authorize(), lecturesController.putLectures); 
router.delete('/lectures', authorize(), lecturesController.deleteLectures);

module.exports = router;
