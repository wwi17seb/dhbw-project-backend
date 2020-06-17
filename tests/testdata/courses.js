module.exports = {
  route: 'courses',
  data: [
    {
      id: 'wwi17seb',
      data: {
        name: 'WWI 17 SE B',
        google_calendar_id: '[GOOGLE_KALENDER_ID]',
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        directorOfStudies_ids: ['{{signup.ritterbusch.directorOfStudies_id}}'],
        Semesters: [
          {
            name: 'WS 17/18',
            number: 1,
            start_date: '2017-10-23',
            end_date: '2018-01-19',
          },
          {
            name: 'SS 18',
            number: 2,
            start_date: '2018-05-14',
            end_date: '2018-08-03',
          },
          {
            name: 'WS 18/19',
            number: 3,
            start_date: '2018-11-19',
            end_date: '2019-02-05',
          },
          {
            name: 'SS 19',
            number: 4,
            start_date: '2019-05-06',
            end_date: '2019-08-02',
          },
          {
            name: 'WS 19/20',
            number: 5,
            start_date: '2019-11-18',
            end_date: '2020-02-14',
          },
          {
            name: 'WS 20',
            number: 6,
            start_date: '2020-05-11',
            end_date: '2020-07-31',
          },
        ],
      },
      token: '{{signup.jreichwald.token}}',
    },
    {
      id: 'wwi18seb',
      data: {
        name: 'WWI 18 SE B',
        google_calendar_id: '[GOOGLE_KALENDER_ID]',
        majorSubject_id: '{{majorSubjects.wise18.majorSubject_id}}',
        directorOfStudies_ids: [],
        Semesters: [
          {
            name: 'WS 18/19',
            number: 1,
            start_date: '2018-11-19',
            end_date: '2019-02-05',
          },
          {
            name: 'SS 19',
            number: 2,
            start_date: '2019-05-06',
            end_date: '2019-08-02',
          },
          {
            name: 'WS 19/20',
            number: 3,
            start_date: '2019-11-18',
            end_date: '2020-02-14',
          },
          {
            name: 'WS 20',
            number: 4,
            start_date: '2020-05-11',
            end_date: '2020-07-31',
          },
          {
            name: 'WS 20/21',
            number: 5,
            start_date: '2020-10-23',
            end_date: '2021-01-19',
          },
          {
            name: 'SS 21',
            number: 6,
            start_date: '2021-05-14',
            end_date: '2021-08-03',
          },
        ],
      },
      token: '{{signup.ritterbusch.token}}',
    },
  ],
};