const express = require('express');
const authorize = require('../helpers/authorize');

const moduleGroupsController = require('../controllers/moduleGroupsController');

const router = express.Router();

router.post('/moduleGroups/', authorize(), moduleGroupsController.postModuleGroups);
router.put('/moduleGroups/', authorize(), moduleGroupsController.putModuleGroups);
router.delete('/moduleGroups/', authorize(), moduleGroupsController.deleteModuleGroups);

module.exports = router;
