const express = require('express');

const router = express.Router();

function sendNotImplementedError (req, res) {
    res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
}

router.get('*', sendNotImplementedError);
router.post('*', sendNotImplementedError);
router.put('*', sendNotImplementedError);
router.delete('*', sendNotImplementedError);

module.exports = router;