const responseHelper = require('../helpers/responseHelper');
const errorResponseHelper = require('../helpers/errorResponseHelper');
const lecturerService = require('../services/lecturerService');
const db = require('../database/database');
const { checkLecturerEditAuthorization } = require('../helpers/checkAuthorizationHelper');
const pdfService = require('../services/pdfService');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const PDF_CV_REL_PATH = pdfService.PDF_SUBFOLDER_PATHS.PATH_CVS;

exports.getLecturerCV = async (req, res, next) => {
  const { lecturerId } = req.query;
  try {
    const lecturer = await lecturerService.findLecturerById(lecturerId);
    if (!lecturer || !lecturer.cv) {
      return responseHelper(res, 404, 'No Lecturer no Curriculum Vitae found for given id');
    }
    const cv = lecturer.cv;
    res.setHeader('Content-disposition', 'inline; filename="' + cv + '"');
    res.setHeader('Content-type', 'application/pdf');
    res.sendFile(path.join(__dirname, `/.${PDF_CV_REL_PATH}${lecturerId}.pdf`));
  } catch (error) {
    return errorResponseHelper(res, next, error);
  }
};

exports.putLecturerCV = async (req, res, next) => {
  const { lecturerId } = req.query;
  const { directorOfStudies_id } = req.token;
  const transaction = await db.sequelize.transaction();
  try {
    if (!(await checkLecturerEditAuthorization(directorOfStudies_id, lecturerId))) {
      throw new Error('You are not authorized to update this lecturer');
    }

    const form = formidable({ uploadDir: './pdfs/cv' });
    form.parse(req, function (err, fields, files) {
      if (err) throw err;

      var oldpath = files.cv.path;
      var newpath = PDF_CV_REL_PATH + lecturerId + '.pdf';
      fs.rename(oldpath, newpath, async function (err) {
        if (err) throw err;
        await lecturerService.updateLecturerCV(transaction, files.cv.name, lecturerId);
        transaction.commit();
        responseHelper(res, 200, 'Successfully added new Curriculum Vitae', { lecturerId, cv: files.cv.name });
      });
    });
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};

exports.deleteLecturerCV = async (req, res, next) => {
  const { lecturerId } = req.query;
  const { directorOfStudies_id } = req.token;
  const transaction = await db.sequelize.transaction();
  try {
    if (!(await checkLecturerEditAuthorization(directorOfStudies_id, lecturerId))) {
      throw new Error('You are not authorized to update this lecturer');
    }

    await lecturerService.updateLecturerCV(transaction, null, lecturerId);
    await pdfService.deleteLecturerCV(lecturerId);
    transaction.commit();
    responseHelper(res, 200, 'Successfully deleted Curriculum Vitae', true);
  } catch (error) {
    transaction.rollback();
    return errorResponseHelper(res, next, error);
  }
};
