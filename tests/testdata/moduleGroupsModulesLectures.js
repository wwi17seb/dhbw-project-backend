module.exports = {
  route: 'moduleGroups',
  data: [
    {
      id: 'wise11rechnungslegung',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Grundlagen der Rechnungslegung',
        number_of_modules_to_attend: 2,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Grundlagen der Rechnungslegung',
            description: '',
            ects: 6,
            catalog_id: 'WWISE_303',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Keine',
            Lectures: [
              {
                name: 'Finanzbuchhaltung',
                workload_home: '36h',
                workload_dhbw: '54h',
                catalog_id: 'WWISE_303.1',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
              {
                name: 'Kosten- und Leistungsrechnung',
                workload_home: '36h',
                workload_dhbw: '54h',
                catalog_id: 'WWISE_303.2',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
  ],
};
