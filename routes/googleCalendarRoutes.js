const express = require('express');
const authorize = require('../helpers/authorize');

const googleCalendarController = require('../controllers/googleCalendarController');

const router = express.Router();

router.get('/googleCalendar', authorize(), googleCalendarController.getGoogleCalendarStuff);
router.put('/googleCalendar', authorize(), googleCalendarController.putGoogleCalendarStuff);

module.exports = router;
