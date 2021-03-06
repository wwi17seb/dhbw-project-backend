module.exports = {
  route: 'moduleGroups',
  comment: `This file contains module catalog for WI SE (2011) with all modules and lectures.
    Source: https://www.mannheim.dhbw.de/fileadmin/user_upload/Studienangebot/Wirtschaft/Wirtschaftsinformatik/Software-Engineering/Modulbeschreibung-WI-Software-Engineering-FakW-DHBW-MA-201211.pdf
    Modules and lectures are sorted according to the order of the source.`,
  data: [
    // WI-SE: 1. Studienjahr (Semesters 1 & 2, pages 5-22/67)
    {
      id: 'wise11grundlagenderbwl',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Grundlagen in BWL',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Grundlagen in BWL',
            description: '',
            ects: 6,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}', '{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Einführung in die BWL',
                workload_dhbw: 48,
                workload_home: 72,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
              {
                name: 'Marketing',
                workload_dhbw: 24,
                workload_home: 36,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11rechnungslegung',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Grundlagen der Rechnungslegung',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Grundlagen der Rechnungslegung',
            description: '',
            ects: 6,
            catalog_id: 'WWISE_302',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Finanzbuchhaltung',
                workload_dhbw: 36,
                workload_home: 54,
                catalog_id: 'WWISE_302.1',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
              {
                name: 'Kosten- und Leistungsrechnung',
                workload_dhbw: 36,
                workload_home: 54,
                catalog_id: 'WWISE_302.2',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11grundlagenwi',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Grundlegende Methoden der Wirtschaftsinformatik',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Grundlegende Methoden der Wirtschaftsinformatik',
            description: '',
            ects: 6,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}', '{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Einführung in die Wirtschaftsinformatik',
                workload_dhbw: 36,
                workload_home: 54,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
              {
                name: 'Systemanalyse und -entwurf',
                workload_dhbw: 36,
                workload_home: 54,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11grundlagenit',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Grundlegende Konzepte der IT',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Grundlegende Konzepte der IT',
            description: '',
            ects: 7,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 3,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Grundlagen der IT',
                workload_dhbw: 36,
                workload_home: 54,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
              {
                name: 'Betriebssysteme',
                workload_dhbw: 24,
                workload_home: 36,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
              {
                name: 'Kommunikationssysteme',
                workload_dhbw: 24,
                workload_home: 36,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11programmieren',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Programmierung und Programmiertechniken',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Programmierung und Programmiertechniken',
            description: '',
            ects: 10,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Einführung in die Programmierung',
                workload_dhbw: 48,
                workload_home: 72,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
              {
                name: 'Fortgeschrittene Programmierung, Algorithmen und Datenstrukturen',
                workload_dhbw: 72,
                workload_home: 108,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11wissenschaftlichesarbeiten',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Wissenschaftliches Arbeiten',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 6,
        Modules: [
          {
            name: 'Wissenschaftliches Arbeiten',
            description: '',
            ects: 5,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.ln.academicRecord_id}}'],
            number_of_lectures_to_attend: 3,
            rated: false,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Wissenschaftliches Arbeiten I',
                workload_dhbw: 15,
                workload_home: 30,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wis.mainFocus_id}}'],
              },
              {
                name: 'Wissenschaftliches Arbeiten II',
                workload_dhbw: 15,
                workload_home: 30,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wis.mainFocus_id}}'],
              },
              {
                name: 'Projektskizze Bachelorarbeit',
                workload_dhbw: 20,
                workload_home: 40,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wis.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11mathe1',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Mathematische Grundlagen I',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Mathematische Grundlagen I',
            description: '',
            ects: 5,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Mathematik für Wirtschaftsinformatiker',
                workload_dhbw: 30,
                workload_home: 45,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.mathe.mainFocus_id}}'],
              },
              {
                name: 'Logik und Algebra',
                workload_dhbw: 30,
                workload_home: 45,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.mathe.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11recht',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Recht',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Recht',
            description: '',
            ects: 5,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Vertragliche Grundlagen und Schuldrecht',
                workload_dhbw: 30,
                workload_home: 45,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.recht.mainFocus_id}}'],
              },
              {
                name: 'Handels- und Gesellschaftsrecht',
                workload_dhbw: 30,
                workload_home: 45,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.recht.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11sq1',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Schlüsselqualifikationen I',
        number_of_modules_to_attend: 1,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Schlüsselqualifikationen I',
            description: '',
            ects: 5,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.ln.academicRecord_id}}'],
            number_of_lectures_to_attend: 1,
            rated: false,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Kommunikation',
                workload_dhbw: 30,
                workload_home: 45,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wis.mainFocus_id}}'],
              },
              {
                name: 'Präsentationskompetenz',
                workload_dhbw: 30,
                workload_home: 45,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wis.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    // WI-SE: 2. Studienjahr (Semesters 3 & 4, pages 23-42/67)
    {
      id: 'wise11finanzierungundrechnungswesen',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Finanzierung und Rechnungswesen',
        number_of_modules_to_attend: 1,
        from_semester_number: 3,
        to_semester_number: 4,
        Modules: [
          {
            name: 'Finanzierung und Rechnungswesen',
            description: '',
            ects: 5,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Grundlagen der Rechnungslegung',
            Lectures: [
              {
                name: 'Investition und Finanzierung',
                workload_dhbw: 28,
                workload_home: 47,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
              {
                name: 'Bilanzierung',
                workload_dhbw: 27,
                workload_home: 48,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11umsetzungwi',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Umsetzung der Methoden der Wirtschaftsinformatik',
        number_of_modules_to_attend: 1,
        from_semester_number: 3,
        to_semester_number: 4,
        Modules: [
          {
            name: 'Umsetzung der Methoden der Wirtschaftsinformatik',
            description: '',
            ects: 6,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}', '{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Grundlegende Methoden der WI, Programmierung und Programmiertechniken',
            Lectures: [
              {
                name: 'Fallstudie',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
              {
                name: 'Projektmanagement',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11datenbanken',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Programmierung und Programmiertechniken',
        number_of_modules_to_attend: 1,
        from_semester_number: 3,
        to_semester_number: 4,
        Modules: [
          {
            name: 'Datenbanken',
            description: '',
            ects: 6,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Grundlegende Methoden der WI, Programmierung und Programmiertechniken',
            Lectures: [
              {
                name: 'Datenbank-Entwurf und Datenbank-Programmierung',
                workload_dhbw: 44,
                workload_home: 76,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
              {
                name: 'Datenbank-Technik',
                workload_dhbw: 22,
                workload_home: 38,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11verteiltesysteme',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Entwicklung verteilter Systeme',
        number_of_modules_to_attend: 1,
        from_semester_number: 3,
        to_semester_number: 4,
        Modules: [
          {
            name: 'Entwicklung verteilter Systeme',
            description: '',
            ects: 6,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Programmierung und Programmiertechniken, Grundlegende Konzepte der IT',
            Lectures: [
              {
                name: 'Web-Programmierung',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
              {
                name: 'Verteilte Systeme',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11softwareengineering1',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Software Engineering I',
        number_of_modules_to_attend: 1,
        from_semester_number: 3,
        to_semester_number: 4,
        Modules: [
          {
            name: 'Software Engineering I',
            description: '',
            ects: 6,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Methoden und Werkzeuge des Software-Engineering',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
              {
                name: 'Alternative A: User-Interface-Entwicklung und Usability',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
              {
                name: 'Alternative B: Webbasierte Datenbankanwendungen',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11mathe2',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Mathematische Grundlagen II',
        number_of_modules_to_attend: 1,
        from_semester_number: 3,
        to_semester_number: 4,
        Modules: [
          {
            name: 'Mathematische Grundlagen II',
            description: '',
            ects: 5,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Statistik',
                workload_dhbw: 28,
                workload_home: 47,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.mathe.mainFocus_id}}'],
              },
              {
                name: 'Operations Research',
                workload_dhbw: 27,
                workload_home: 48,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.mathe.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11vwl',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Volkswirtschaftslehre',
        number_of_modules_to_attend: 1,
        from_semester_number: 3,
        to_semester_number: 4,
        Modules: [
          {
            name: 'Volkswirtschaftslehre',
            description: '',
            ects: 5,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Mikroökonomie und Makroökonomie',
                workload_dhbw: 28,
                workload_home: 47,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.vwl.mainFocus_id}}'],
              },
              {
                name: 'Geld, Währung, Außenwirtschaft, Wirtschaftspolitik',
                workload_dhbw: 28,
                workload_home: 47,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.vwl.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11sq2',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Schlüsselqualifikationen II',
        number_of_modules_to_attend: 1,
        from_semester_number: 3,
        to_semester_number: 4,
        Modules: [
          {
            name: 'Schlüsselqualifikationen II',
            description: '',
            ects: 5,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.ln.academicRecord_id}}'],
            number_of_lectures_to_attend: 1,
            rated: false,
            requirements: 'Schlüsselqualifikationen I',
            Lectures: [
              {
                name: 'IT-Consulting ',
                workload_dhbw: 28,
                workload_home: 47,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wis.mainFocus_id}}'],
              },
              {
                name: 'Unternehmenssimulation',
                workload_dhbw: 27,
                workload_home: 48,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wis.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11wahlpflichtjahr2',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Wahlpflichtmodule Jahr 2',
        number_of_modules_to_attend: 1,
        from_semester_number: 3,
        to_semester_number: 4,
        Modules: [
          {
            name: 'Branchenorientierte Aspekte der Wirtschaftsinformatik in der Industrie I',
            description: '',
            ects: 6,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}', '{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'keine',
            Lectures: [
              {
                name: 'Grundlagen 1',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
              {
                name: 'Grundlagen 2',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
            ],
          },
          {
            name: 'Technische Grundlagen mobiler Applikationen',
            description: '',
            ects: 6,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}', '{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Grundlegende Konzepte der IT',
            Lectures: [
              {
                name: 'Netzwerk- und Betriebssystemstrukturen für mobile Applikationen',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
              {
                name: 'Weiterführende Konzepte mobiler Applikationen',
                workload_dhbw: 33,
                workload_home: 57,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    // WI-SE: 3. Studienjahr (Semesters 5 & 6, pages 43-58/67)
    {
      id: 'wise11management',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Management',
        number_of_modules_to_attend: 1,
        from_semester_number: 5,
        to_semester_number: 6,
        Modules: [
          {
            name: 'Management',
            description: '',
            ects: 7,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Grundlagen der BWL, Grundlagen der Rechnungslegung, Finanzierung und Rechungswesen ',
            Lectures: [
              {
                name: 'Unternehmensführung und Controlling',
                workload_dhbw: 40,
                workload_home: 80,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
              {
                name: 'Ausgewählte Aspekte des Managements',
                workload_dhbw: 30,
                workload_home: 60,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11prozessmanagement',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'IT- und Geschäftsprozessmanagement',
        number_of_modules_to_attend: 1,
        from_semester_number: 5,
        to_semester_number: 6,
        Modules: [
          {
            name: 'IT- und Geschäftsprozessmanagement',
            description: '',
            ects: 7,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Grundlagen der BWL, Grundlegende Methoden der WI, Recht',
            Lectures: [
              {
                name: 'IT-Management & IT-Recht',
                workload_dhbw: 40,
                workload_home: 80,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
              {
                name: 'Geschäftsprozess-Management',
                workload_dhbw: 30,
                workload_home: 60,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11prozessmanagement',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Integrationsseminar zu ausgewählten Themen der WI',
        number_of_modules_to_attend: 1,
        from_semester_number: 5,
        to_semester_number: 6,
        Modules: [
          {
            name: 'Integrationsseminar zu ausgewählten Themen der WI',
            description: '',
            ects: 5,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Grundlegende Methoden der WI, Umsetzung von Methoden der WI',
            Lectures: [
              {
                name: 'Integrationsseminar',
                workload_dhbw: 50,
                workload_home: 100,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11projekt',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Projekt',
        number_of_modules_to_attend: 1,
        from_semester_number: 5,
        to_semester_number: 6,
        Modules: [
          {
            name: 'Projekt',
            description: '',
            ects: 5,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Umsetzung von Methoden der WI',
            Lectures: [
              {
                name: 'Projekt I',
                workload_dhbw: 25,
                workload_home: 50,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
              {
                name: 'Projekt II',
                workload_dhbw: 25,
                workload_home: 50,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11neuekonzepte',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Neue Konzepte',
        number_of_modules_to_attend: 1,
        from_semester_number: 5,
        to_semester_number: 6,
        Modules: [
          {
            name: 'Neue Konzepte',
            description: '',
            ects: 8,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}', '{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Umsetzung von Methoden der WI, Datenbanken, Entwicklung verteilter System',
            Lectures: [
              {
                name: 'Neue Konzepte I',
                workload_dhbw: 40,
                workload_home: 80,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
              {
                name: 'Neue Konzepte II',
                workload_dhbw: 40,
                workload_home: 80,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.wi.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11softwareengineering2',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Software Engineering II',
        number_of_modules_to_attend: 1,
        from_semester_number: 5,
        to_semester_number: 6,
        Modules: [
          {
            name: 'Software Engineering II',
            description: '',
            ects: 6,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Software Engineering I',
            Lectures: [
              {
                name: 'Software-Architekturen',
                workload_dhbw: 30,
                workload_home: 60,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
              {
                name: 'Ausgewählte Themen des Software-Engineering',
                workload_dhbw: 30,
                workload_home: 60,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'wise11wahlpflichtjahr3',
      data: {
        majorSubject_id: '{{majorSubjects.wise11.majorSubject_id}}',
        name: 'Wahlpflichtmodule Jahr 3',
        number_of_modules_to_attend: 1,
        from_semester_number: 5,
        to_semester_number: 6,
        Modules: [
          {
            name: 'Branchenorientierte Aspekte der Wirtschaftsinformatik in der Industrie II',
            description: '',
            ects: 7,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}', '{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Branchenorientierte Aspekte der Wirtschaftsinformatik in der Industrie I',
            Lectures: [
              {
                name: 'Optimierung industrieller Prozesse',
                workload_dhbw: 30,
                workload_home: 60,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
              {
                name: 'Integrative Informationssysteme in der Industrie',
                workload_dhbw: 40,
                workload_home: 80,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.bwl.mainFocus_id}}'],
              },
            ],
          },
          {
            name: 'Entwicklung mobiler Applikationen',
            description: '',
            ects: 7,
            catalog_id: 'unbekannt',
            academicRecord_ids: ['{{academicRecords.k.academicRecord_id}}', '{{academicRecords.se.academicRecord_id}}'],
            number_of_lectures_to_attend: 2,
            rated: true,
            requirements: 'Technische Grundlagen mobiler Applikationen, Programmierung und Programmiertechniken',
            Lectures: [
              {
                name: 'Plattformen und Frameworks',
                workload_dhbw: 30,
                workload_home: 60,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
              {
                name: 'Native Entwicklung mobiler Applikationen',
                workload_dhbw: 40,
                workload_home: 80,
                catalog_id: 'unbekannt',
                mainFocus_ids: ['{{mainFocuses.it.mainFocus_id}}'],
              },
            ],
          },
        ],
      },
    },
  ],
};
