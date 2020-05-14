const lecturerService = require('../services/lecturerService');
const authService = require('../services/authService');

exports.postLecturer = async (req, res, next) => {
    const {
        firstname,
        lastname,
        academic_title,
        email,
        salutation,
        phonenumber,
        experience,
        comment,
        is_extern,
        token
    } = req.body;

    let givenLecturer = {
        firstname: firstname,
        lastname: lastname,
        academic_title: academic_title,
        email: email,
        salutation: salutation,
        phonenumber: phonenumber,
        experience: experience,
        comment: comment,
        is_extern: is_extern
    };

    try {
        let curStudiesDirectorId = authService.decodeToken(token).userId;

        const createdLecturer = await lecturerService.createLecturer(givenLecturer, curStudiesDirectorId);
        
        res.status(201).json(createdLecturer);
    } catch (error) {
        res.status(400).json({
            message: 'Could not create lecturer.'
        });
    }
};
