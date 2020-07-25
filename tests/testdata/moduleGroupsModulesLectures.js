module.exports = {
  route: 'moduleGroups',
  data: [
    {
      id: 'wise18rechnungslegung',
      data: {
        majorSubject_id: '{{majorSubjects.wise18.majorSubject_id}}',
        name: 'Grundlagen der Rechnungslegung',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Grundlagen der Rechnungslegung',
            description: '',
            ects: 6,
            catalog_id: 'W3WI_202',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Technik der Finanzbuchführung',
                workload_dhbw: 30,
                workload_home: 45,
                catalog_id: 'W3WI_202.1',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
              {
                name: 'Kosten- und Leistungsrechnung',
                workload_dhbw: 30,
                workload_home: 45,
                catalog_id: 'W3WI_202.2',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise18grundlagenwi',
      data: {
        majorSubject_id: '{{majorSubjects.wise18.majorSubject_id}}',
        name: 'Methoden der Wirtschaftsinformatik I',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Methoden der Wirtschaftsinformatik I',
            description: '',
            ects: 5,
            catalog_id: 'W3WI_101',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}', '{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Einführung in die Wirtschaftsinformatik',
                workload_dhbw: 24,
                workload_home: 36,
                catalog_id: 'W3WI_101.1',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
              {
                name: 'Systemanalyse und -entwurf',
                workload_dhbw: 36,
                workload_home: 54,
                catalog_id: 'W3WI_101.2',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wids18bigdata',
      data: {
        majorSubject_id: '{{majorSubjects.wids18.majorSubject_id}}',
        name: 'Big Data',
        number_of_modules_to_attend: 1,
        from_semester_number: 3,
        to_semester_number: 4,
        Modules: [
          {
            name: 'Big Data',
            description: '',
            ects: 5,
            catalog_id: 'W3WI_DS302',
            academicRecord_ids: [
              '{{academicRecords.k.academicRecord_id}}',
              '{{academicRecords.prf.academicRecord_id}}',
            ],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Big Data Programming',
                workload_dhbw: 28,
                workload_home: 48,
                catalog_id: 'W3WI_DS302.1',
                mainFocus_ids: ['{{mainFocuses.mlaids.mainFocus_id}}'],
              },
              {
                name: 'Big Data Storage',
                workload_dhbw: 27,
                workload_home: 47,
                catalog_id: 'W3WI_DS302.2',
                mainFocus_ids: ['{{mainFocuses.mlaids.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wiam18recht',
      data: {
        majorSubject_id: '{{majorSubjects.wiam18.majorSubject_id}}',
        name: 'Recht',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Recht',
            description: '',
            ects: 5,
            catalog_id: 'W3WI_506',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Vertrags- und Schuldrecht',
                workload_dhbw: 30,
                workload_home: 45,
                catalog_id: 'W3WI_506.1',
                mainFocus_ids: ['{{mainFocuses.recht.mainFocus_id}}'],
              },
              {
                name: 'Handels- und Gesellschaftsrecht',
                workload_dhbw: 30,
                workload_home: 45,
                catalog_id: 'W3WI_506.2',
                mainFocus_ids: ['{{mainFocuses.recht.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
  ],
};
