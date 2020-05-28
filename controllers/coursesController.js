const responseHelper = require("../helpers/responseHelper");

const testReturnValue = {
    "courses": [
        {
            "course_id": 1,
            "name": "WWI 17 SE B",
            "directorOfStudies": {
                // Inhalt folgt...
            },
            "majorSubject": "Wirtschaftsinformatik",
            "fieldOfStudy": "Software Engineering (ab 2011)",
        }
    ]
};


exports.getCourses = async (req, res) => {
    responseHelper(res, 501, testReturnValue);
};
exports.postCourses = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};
exports.putCourses = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};
exports.deleteCourses = async (req, res) => {
    responseHelper(res, 501, "Not yet implemented.");
};
