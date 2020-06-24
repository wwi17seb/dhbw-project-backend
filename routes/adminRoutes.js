const express = require('express');
const authorize = require('../helpers/authorize');

const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/createUser', authorize(), adminController.postCreateUser);
router.put('/resetPassword', authorize(), adminController.putResetPassword);
router.put('/upgradeToAdmin', authorize(), adminController.putUpgradeToAdmin);
router.get('/registerKey', authorize(), adminController.getRegisterKey);
router.put('/registerKey', authorize(), adminController.putRegisterKey);

module.exports = router;
