const express = require('express');
const formidable = require('formidable');
const authorize = require('../helpers/authorize');

const router = express.Router();

router.post('/test2', (req, res) => {
  console.log(req.body);
  res.json({ status: 200, message: 'Successful', payload: true });
});

router.post('/upload', (req, res) => {
  const form = formidable({ uploadDir: './pdfs/cv' });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({err});
      return;
    }
    res.json({ fields, files });
  });
});


router.get('/testpdfupload.html', function (req, res) {
  res.sendFile(__dirname + '\\testPdfUpload.html');
});
router.get('/testpdfupload.js', function (req, res) {
  res.sendFile(__dirname + '\\testPdfUpload.js');
});

module.exports = router;
