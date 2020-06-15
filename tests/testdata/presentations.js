module.exports = {
  route: 'presentations',
  data: [
    {
      id: 'p1',
      data: {
        status: 'möchte Parkausweis für seinen DeLorean',
        lecturer_id: '{{lecturers.eb.lecturer_id}}',
        lecture_id: '{{moduleGroups.wise11rechnungslegung.Modules[0].Lectures[0].lecture_id}}',
        course_id: '{{courses.wwi17seb.course_id}}',
        academicRecord_id: '{{academicRecords.se.academicRecord_id}}',
        semester_id: '{{courses.wwi17seb.Semesters[0].semester_id}}',
      },
      token: '{{signup.jreichwald.token}}',
    },
    {
      id: 'p2',
      data: {
        status: 'hat als Notfalllösung, falls es mit Emmett nicht klappt, zugesagt',
        lecturer_id: '{{lecturers.tm.lecturer_id}}',
        lecture_id: '{{moduleGroups.wise11rechnungslegung.Modules[0].Lectures[0].lecture_id}}',
        course_id: '{{courses.wwi17seb.course_id}}',
        academicRecord_id: '{{academicRecords.k.academicRecord_id}}',
        semester_id: '{{courses.wwi17seb.Semesters[0].semester_id}}',
      },
      token: '{{signup.jreichwald.token}}',
    },
    {
      id: 'p3',
      data: {
        status: 'Zusage, jetzt Termine ausmachen',
        lecturer_id: '{{lecturers.ea.lecturer_id}}',
        lecture_id: '{{moduleGroups.wise11rechnungslegung.Modules[0].Lectures[1].lecture_id}}',
        course_id: '{{courses.wwi17seb.course_id}}',
        academicRecord_id: '{{academicRecords.k.academicRecord_id}}',
        semester_id: '{{courses.wwi17seb.Semesters[0].semester_id}}',
      },
      token: '{{signup.jreichwald.token}}',
    },
  ],
};
