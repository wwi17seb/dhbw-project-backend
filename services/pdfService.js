const fs = require('fs');

const PATH_PDFS = './pdfs/';
const PATH_CVS = PATH_PDFS + 'cv/';

module.exports.PDF_ROOT_PATH = PATH_PDFS;
module.exports.PDF_SUBFOLDER_PATHS = {
  PATH_CVS,
};

function getFilepath(lecturerId) {
  return `${PATH_CVS}${lecturerId}.pdf`;
}

module.exports.deleteLecturerCV = async function (lecturerId) {
  return new Promise((resolve, reject) => {
    fs.unlink(getFilepath(lecturerId), (err) => {
      if (err) resolve(false);
      resolve(true);
    });
  });
};
