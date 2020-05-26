const lecturersService = require('../services/lecturersService');

const responseHelper = require("../helpers/responseHelper");
const copyObjectHelper = require("../helpers/propertyCopyHelper");

exports.getLecturers = async (req, res) => {
    return responseHelper(res, 501, "Not yet implemented", {
        "lecturers": [
            {
                "lecturer_id": 1,
                "firstname": "Peter",
                "lastname": "Programmier",
                "academic_title": "Prof.",
                "email": "prof.p@programmier.er",
                "salutation": "Herr",
                "phonenumber": "+1 555 1234",
                "experience": "kann gut programmieren",
                "main_focus": [
                    "Software-Entwicklung",
                    "Programmierung"
                ],
                "profile": "",
                "research": "",
                "cv": "",
                "comment": "sehr guter Programmierer",
                "is_extern": "0",
            }
        ]
    });
    try {
        const curStudiesDirectorId = req.token.userId;
        const lecturers = await lecturersService.findByDirectorOfStudiesId(curStudiesDirectorId);
        responseHelper(res, 200, "", { lecturers });
    } catch (error) {
        responseHelper(res, 400, "Could not create lecturer");
    }
};

exports.postLecturers = async (req, res) => {
    const givenLecturer = copyObjectHelper(req.body, "firstname", "lastname",
        "academic_title", "email", "salutation", "phonenumber", "experience",
        "main_focus", "profile", "research", "cv", "comment", "is_extern"
    );

    try {
        const curStudiesDirectorId = req.token.userId;
        const createdLecturer = await lecturersService.createLecturers(givenLecturer, curStudiesDirectorId);
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
