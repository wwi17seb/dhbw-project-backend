const express = require('express');
const router = express.Router();

router.get('/testpdfupload.html', function (req, res) {
  res.sendFile(__dirname + '\\testPdfUpload.html');
});
router.get('/testpdfupload.js', function (req, res) {
  res.sendFile(__dirname + '\\testPdfUpload.js');
});

module.exports = router;
