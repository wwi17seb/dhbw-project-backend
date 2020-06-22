const fs = require('fs');

const PATH_PDFS = './pdfs/';
const PATH_CVS = PATH_PDFS + 'vita/';

const FILE_ENCODING = 'utf8';

module.exports.PDF_ROOT_PATH = PATH_PDFS;
module.exports.PDF_SUBFOLDER_PATHS = [PATH_CVS];

function getFilepath(lecturerId) {
  return `${PATH_CVS}${lecturerId}.pdf`;
}

module.exports.getLecturerCV = async (lecturerId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(getFilepath(lecturerId), FILE_ENCODING, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports.updateLecturerCV = async (lecturerId, fileContent) => {
  if (!fileContent) return deleteLecturerCV(lecturerId);
  if (fileContent === true) return; // as defined in API true leads to no-update
  return new Promise((resolve, reject) => {
    fs.writeFile(getFilepath(lecturerId), fileContent, FILE_ENCODING, (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
};

const deleteLecturerCV = async (lecturerId) => {
  return new Promise((resolve, reject) => {
    fs.unlink(getFilepath(lecturerId), (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports.deleteLecturerCV = deleteLecturerCV;
