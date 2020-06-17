module.exports = {
  route: 'lecturers',
  data: [
    {
      id: 'tm',
      data: {
        firstname: 'Tony',
        lastname: 'Maldonary',
        academic_title: 'B. Sc.',
        email: 'Tony.Maldonary@bachelor-of-science.com',
        salutation: 'Herr',
        phonenumber: '0123456789',
        experience: 'Can handle DB lecture',
        mainFocus_ids: [
          '{{mainFocuses.projektmanagement.mainFocus_id}}',
          '{{mainFocuses.webentwicklung.mainFocus_id}}',
          '{{mainFocuses.recht.mainFocus_id}}',
          '{{mainFocuses.datenbanken.mainFocus_id}}',
        ],
        profile: 'My Profile',
        research: 'My Research',
        cv: 'My CV',
        comment: 'sehr engagiert',
        is_extern: false,
      },
      token: '{{signup.gömert.token}}',
    },
    {
      id: 'eb',
      data: {
        firstname: 'Emmett L.',
        lastname: 'Brown',
        academic_title: 'Dr.',
        email: 'emmett.l@brown.edu',
        salutation: 'Mr.',
        phonenumber: '+1 1210 1985 2204',
        experience: 'time travel, DeLorean, plutionium',
        mainFocus_ids: [
          '{{mainFocuses.projektmanagement.mainFocus_id}}',
          '{{mainFocuses.softwareentwicklung.mainFocus_id}}',
        ],
        profile: '-',
        research: 'lots of stuff',
        cv: '-',
        comment:
          'can not hold lectures in the afternoon because he walks his dog from 3 to 5 pm; does not hesitate to cooperate with criminals',
        is_extern: true,
      },
      token: '{{signup.jreichwald.token}}',
    },
    {
      id: 'qq',
      data: {
        firstname: 'Quirinus',
        lastname: 'Quirrell',
        academic_title: '',
        email: 'quirrell@hogwarts.co.uk',
        salutation: 'Mr.',
        phonenumber: '+44 578 2108',
        experience: 'Defence Against the Dark Arts',
        mainFocus_ids: [],
        profile: '-',
        research: '',
        cv: '-',
        comment: 'Ravenclaw, hpmor.com',
        is_extern: true,
      },
      token: '{{signup.jreichwald.token}}',
    },
    {
      id: 'ea',
      data: {
        firstname: 'Elliot',
        lastname: 'Alderson',
        academic_title: null,
        email: 'elliotalderson@protonmail.ch',
        salutation: 'Herr',
        phonenumber: '(212) 555-0179',
        experience: 'Cybersecurity, Linux',
        mainFocus_ids: ['{{mainFocuses.itsicherheit.mainFocus_id}}', '{{mainFocuses.mlaids.mainFocus_id}}'],
        profile: null,
        research: null,
        cv: 'Cybersecurity Engineer at Allsafe Cybersecurity',
        comment: 'paranoid',
        is_extern: true,
      },
      token: '{{signup.jreichwald.token}}',
    },
  ],
};