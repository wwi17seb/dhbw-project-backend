const courseService = require('../services/courseService');
const authService = require('../services/authService');

const responseHelper = require("../helpers/responseHelper");

const testReturnValue = {
    "data": [
        {"course_id": 42,
        "name": "WWI17SEB",
        "directorOfStudies": "Ritterbusch",
        "majorSubject": "Wirtschaftsinformatik",
        "fieldOfStudy": "SE"}
    ],
    "links": {
        "first": "https://exoplan.it/courses?page=1",
        "last": "https://exoplan.it/courses?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "type": "courses",
        "current_page": 42,
        "from": 42,
        "last_page": 42,
        "path": "https://exoplan.it/courses",
        "per_page": 42,
        "to": 42,
        "total": 42,
        "tags": {
            "directorOfStudies": "Ritterbusch",
        }
    }
}


exports.getCourses = async (req, res, next) => {
    responseHelper(res, 501, testReturnValue);
};
exports.postCourses = async (req, res, next) => {
    responseHelper(res, 501, "Not yet implemented.");
};
exports.putCourses = async (req, res, next) => {
    responseHelper(res, 501, "Not yet implemented.");
};
exports.deleteCourses = async (req, res, next) => {
    responseHelper(res, 501, "Not yet implemented.");
};
