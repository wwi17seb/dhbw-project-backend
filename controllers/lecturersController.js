const lecturerService = require('../services/lecturerService');

const responseHelper = require("../helpers/responseHelper");
const copyObjectHelper = require("../helpers/propertyCopyHelper");

exports.getLecturers = async (req, res) => {
    try {
        const curStudiesDirectorId = req.token.userId;
        const lecturers = await lecturersService.findByDirectorOfStudiesId(curStudiesDirectorId);
        responseHelper(res, 200, "", { lecturers });
    } catch (error) {
        responseHelper(res, 400, "Could not create lecturer");
    }
};

exports.postLecturers = async (req, res) => {
    const givenLecturer = copyObjectHelper(req.body, ["firstname", "lastname",
        "academic_title", "email", "salutation", "phonenumber", "experience",
        "profile", "research", "cv", "comment", "is_extern" // TODO: add "mainFocus"
    ]);
    givenLecturer.is_extern = givenLecturer.is_extern !== 0;

    try {
        const curStudiesDirectorId = req.token.userId;
        // TODO: transaction?!
        const createdLecturer = await lecturerService.createLecturer(null, givenLecturer, curStudiesDirectorId);
        responseHelper(res, 201, "Successfully created lecturer", createdLecturer);
    } catch (error) {
        responseHelper(res, 400, "Could not create lecturer");
    }
};

exports.putLecturers = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};

exports.deleteLecturers = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};
