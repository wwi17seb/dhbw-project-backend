# Schnittstellen - **STAND: 24.05.2020** <!-- omit in toc -->

## Inhalt <!-- omit in toc -->

- [Allgemein](#allgemein)
  - [Authentifizierung](#authentifizierung)
  - [Rückgabe - Info](#r%c3%bcckgabe---info)
  - [Sonstiges](#sonstiges)
- [/signup](#signup)
  - [POST /signup](#post-signup)
- [/login](#login)
  - [POST /login](#post-login)
- [/logout](#logout)
- [/courses](#courses)
  - [GET /courses](#get-courses)
  - [POST /courses](#post-courses)
  - [PUT /courses?courseId={ID}](#put-coursescourseidid)
  - [DELETE /courses?courseId={ID}](#delete-coursescourseidid)
- [/semesters](#semesters)
  - [PUT /semesters?semesterId={ID}](#put-semesterssemesteridid)
  - [DELETE /semesters?semesterId={ID}](#delete-semesterssemesteridid)
- [/semesterview](#semesterview)
  - [GET /semesterview?courseId={ID}](#get-semesterviewcourseidid)
- [/lecturers](#lecturers)
  - [GET /lecturers](#get-lecturers)
    - [Optionale Parameter /lecturers](#optionale-parameter-lecturers)
  - [POST /lecturers](#post-lecturers)
  - [PUT /lecturers?lecturerId={ID}](#put-lecturerslectureridid)
  - [DELETE /lecturers?lecturerId={ID}](#delete-lecturerslectureridid)
- [/lectures](#lectures)
  - [POST /lectures](#post-lectures)
  - [PUT /lectures?lectureId={ID}](#put-lectureslectureidid)
  - [DELETE /lectures?lectureId={ID}](#delete-lectureslectureidid)

## Allgemein
### Authentifizierung
Bei nahezu allen Routen wird geprüft, ob die entsprechende Aktion autorisiert bzw. der Nutzer authentisiert ist.
Dafür muss ein Token (JWT), der beim Login ausgestellt wurde, als URL-Query-Parameter angegeben werden.
Bsp.:
````http
GET /courses?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ1c2VySWQiOjIsImlhdCI6MTU4OTg3MzY4OCwiZXhwIjoxNTk4NTEzNjg4fQ.KTjlx88ke7SWKhQAARMkoOlDtyjRyO73ksUMcThyOJ8
````
Ein Beispiel für eine Route, bei der kein gültiger Token übergeben werden muss, ist ``POST /login``.

### Rückgabe - Info
Allgemeiner Rückgabe-Aufbau:

- Integer werden als ``0`` gekennzeichnet.
- Strings werden durch ``"[NAME]"`` gekennzeichnet und beinhalten einen beschreibenden Namen.
- Boolean werden als ``TRUE`` gekennzeichnet.
- Arrays können mehrere Objekte beinhalten. Es wird in der Dokumentation jedoch nur ein Objekt eingesetzt.
<!-- beschreiben mit [], 0 -->
````js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {

    }
}
````

Wenn im Folgenden keine Rückgabe gezeigt ist, dann wird lediglich eine ``message`` gesetzt und das ``payload``-Objekt ist leer.

### Sonstiges

Routen, die nicht existieren, werden nicht dargestellt.

## /signup

**Info**: Route zum Account anlegen, meldet nach erfolgreichem Anlegen automatisch an.

### POST /signup

Body der Anfrage:
````js
{
    "username": "[NAME]", // Bspw. "Nutzername"
    "password": "[PASSWORT]" // Bspw. "MeinSicheresPasswort1337"
}
````

Rückgabe:
````js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "token": "[TOKEN]", // Bspw. "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ1c2VySWQiOjIsImlhdCI6MTU4OTg3MzY4OCwiZXhwIjoxNTk4NTEzNjg4fQ.KTjlx88ke7SWKhQAARMkoOlDtyjRyO73ksUMcThyOJ8"
        "userId": 0, // Bspw. "1"
        "username": "[NUTZERNAME]" // Bspw. "Nutzername"
    }
}
````

## /login

**Info**: Route zum Anmelden.

### POST /login

Body der Anfrage:
````js
{
    "username": "[NAME]", // Bspw. "Nutzername"
    "password": "[PASSWORT]" // Bspw. "MeinSicheresPasswort1337""
}
````

Rückgabe:
````js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "token": "[TOKEN]", // Bspw. "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ1c2VySWQiOjIsImlhdCI6MTU4OTg3MzY4OCwiZXhwIjoxNTk4NTEzNjg4fQ.KTjlx88ke7SWKhQAARMkoOlDtyjRyO73ksUMcThyOJ8"
        "userId": 0, // Bspw. "1"
        "username": "[NUTZERNAME]" // Bspw. "Nutzername"
    }
}
````

## /logout

**Info**: Route existiert, ändert jedoch nichts.
Jeder Token ist für eine Dauer von `12h` gültig und muss danach erneuert werden.

## /courses

### GET /courses

**Info**: Gibt alle zum aktuell angemeldeten Studiengangsleiter vorhandenen Kurse zurück.

Rückgabe:
````js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "courses": [
            {
                "course_id": 0, // Bspw. "1"
                "name": "[KURSNAME]", // Bspw. "WWI 17 SE B"
                "directorOfStudies": {
                    // Inhalt folgt...
                },
                "majorSubject": "[STUDIENGANG]", // Bspw. "Wirtschaftsinformatik"
                "fieldOfStudy": "[STUDIENRICHTUNG]" // Bspw. "Software Engineering"
            }
        ]
    }
}
````


### POST /courses

**Info**: Erzeugt einen neuen Kurs beim angegebenen Studiengangsleiter.

Body der Anfrage:
````js
{
    "name": "[KURSNAME]", // Bspw. "WWI 17 SEB"
    "majorSubject": "[STUDIENGANG]", // Bspw. "Wirtschaftsinformatik"
    "fieldOfStudy": "[STUDIENRICHTUNG]", // Bspw. "Software Engineering"
    "semesters": [
        {
            "name": "[SEMESTERNAME]", // Bspw. "WS17/18"
            "number": 0, // Bspw. "1"
            "start_date": "[STARTDATUM]", // Bspw. "2017-10-23"
            "end_date": "[ENDDATUM]" // Bspw. "2018-02-19"
        },
        {
            "name": "[SEMESTERNAME]", // Bspw. "SS18"
            "number": 0, // Bspw. "2"
            "start_date": "[STARTDATUM]", // Bspw. "2018-05-07"
            "end_date": "[ENDDATUM]" // Bspw. "2018-08-03"
        }
        // für jedes weitere Semester ein weiteres Objekt.
    ]
}
````

### PUT /courses?courseId={ID}

**Info**: Aktualisiert den angegebenen Kurs.
``{ID}`` ist dabei die ``course_id``.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.
Semester können über die ``semester`` aktualisiert werden.

Body der Anfrage:
````js
{
    "name": "[KURSNAME]", // Bspw. "WWI 17 SE B"
    "majorSubject": "[STUDIENGANG]", // Bspw. "Wirtschaftsinformatik"
    "fieldOfStudy": "[STUDIENRICHTUNG]" // Bspw. "Software Engineering"
}
````

### DELETE /courses?courseId={ID}

**Info**: Löscht den angegebenen Kurs mit der ``course_id`` ``{ID}``, sofern man selbst Studiengangsleiter ist.

## /semesters

### PUT /semesters?semesterId={ID}

**Info**: Aktualisiert die Einträge eines Semesters mit angegebener ``semester_id`` ``{ID}``, sofern das Semester Teil eines eigenen Kurses ist.
Alle Attribute müssen erneut übergeben werden, da diese so aktualisiert werden bzw. alle notwendig sind.

Body der Anfrage:
````js
{
    "name": "[SEMESTERNAME]", // Bspw. "SS18"
    "number": 0, // Bspw. "2"
    "start_date": "[STARTDATUM]", // Bspw. "2018-05-07"
    "end_date": "[ENDDATUM]" // Bspw. "2018-08-03"
}
````

### DELETE /semesters?semesterId={ID}

**Info**: Löscht das Semester mit der angegebenen ``{ID}``.

## /semesterview

### GET /semesterview?courseId={ID}

**Info**: Gibt alle Semesterinformationen zu einem angegebenen Kurs zurück.

Rückgabe:
````js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "course": {
            "name": "[KURSNAME]", // Bspw. "WWI 17 SEB"
            "majorSubject": "[STUDIENGANG]", // Bspw. "Wirtschaftsinformatik"
            "fieldOfStudy": "[STUDIENRICHTUNG]", // Bspw. "Software Engineering
        },
        "semesters": [
            {
                "name": "[SEMESTERNAME]", // Bspw. "WS17/18"
                "number": 0, // Bspw. "1"
                "start_date": "[STARTDATUM]", // Bspw. "2017-10-23"
                "end_date": "[ENDDATUM]" // Bspw. "2018-02-19"
                "moduleGroups": [
                    {
                        "moduleGroup_id": 0, // Bspw. "1"
                        "name": "[MODULGRUPPE]", // Bspw. "Profil I" oder "Management"
                        "number_of_modules_to_attend": 0, // Bspw. "2"
                        "from_semester_number": 0, // Bspw. "3"
                        "to_semester_number": 0, // Bspw. "4"
                        "modules": [
                            {
                                "module_id": 0, // Bspw. "2"
                                "name": "[MODULNAME]", // Bspw. "Technische Grundlagen mobiler Applikationen"
                                "description": "[BESCHREIBUNG]", // Bspw. "..."
                                "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_713"
                                "lectures": [
                                    {
                                        "lecture_id": 0, // Bspw. "3"
                                        "name": "[NAME]", // Bspw. "Netzwerk- und Betriebssystemstrukturen für mobile Applikationen"
                                        "workload_home": "[SELBSTSTUDIUM]", // Bspw. "57"
                                        "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "33"
                                        "catalog_id": "string", // Bspw. "WWISE_713.1"
                                        "mainFocus": {
                                            "mainFocus_id": 0, // Bspw. "1"
                                            "mainFocus_name": "[THEMENGEBIET]" // Bspw. "Mobile Applikationen"
                                        },
                                        "lecturer_state": "[STATUS]", //  // Bspw. "Offen", "Angeschrieben", ...
                                        "dependend_lectures": [
                                            {
                                                "lecture_id": 0 // weitere Informationen wären an der Stelle redundant
                                            }
                                        ],
                                        "lecturer": { // falls vorhanden
                                            "firstname": "[VORNAME]", // Bspw. "Sebastian"
                                            "lastname": "[NACHNAME]", // Bspw. "Ritterbusch"
                                            "academic_title": "[AKADEMISCHER TITEL]", // Bspw. "Prof. Dr."
                                            "email": "[E-MAIL]", // Bspw. "sebastian.ritterbusch@dhbw-mannheim.de"
                                            "salutation": "[ANREDE]", // Bspw. "Herr"
                                            "phonenumber": "[TELEFONNUMMER]", // Bspw. "+49 621 4105 - 1724"
                                            "experience": "[ERFAHRUNG]", // Bspw. "Mathematik, Podcasts, ..."
                                            "main_focus": "[SCHWERPUNKT]", // Bspw. "Software Engineering"
                                            "profile": "[PROFIL]", // Geplant als String
                                            "research": "[LEHRE]", // Geplant als String
                                            "cv": "[VITA]", // Geplant als String
                                            "comment": "[KOMMENTAR]", // Bspw. "Sehr engagiert"
                                            "is_extern": "[KENNZEICHNER, OB EXTERN]" // 0 = intern, 2 = extern
                                        }
                                    }
                                ],
                                "academicRecords": [ // mögliche Bewertungsverfahren
                                    {
                                        "academicRecord_id": 0, // Bspw. "1"
                                        "abbreviation": "[ABKÜRZUNG]", // Bspw. "K"
                                        "type": "[TYP]", // Bspw. "Klausur"
                                        "rated": TRUE //  Bspw. "TRUE/FALSE
                                    }
                                ],
                                "academicRecord": { // gewähltes Bewertungsverfahren
                                    "academicRecord_id": 0, // Bspw. "1"
                                    "abbreviation": "[ABKÜRZUNG]", // Bspw. "K"
                                    "type": "[TYP]", // Bspw. "Klausur"
                                    "rated": TRUE //  Bspw. "TRUE/FALSE
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
````

## /lecturers

### GET /lecturers

**Info**: Gibt alle dem Studiengangsleiter zugehörigen Dozenten zurück.

Rückgabe:
````js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "lecturers": [
            {
                "lecturer_id": 0 // Bspw. "1"
                "firstname": "[VORNAME]", // Bspw. "Sebastian"
                "lastname": "[NACHNAME]", // Bspw. "Ritterbusch"
                "academic_title": "[AKADEMISCHER TITEL]", // Bspw. "Prof. Dr."
                "email": "[E-MAIL]", // Bspw. "sebastian.ritterbusch@dhbw-mannheim.de"
                "salutation": "[ANREDE]", // Bspw. "Herr"
                "phonenumber": "[TELEFONNUMMER]", // Bspw. "+49 621 4105 - 1724"
                "experience": "[ERFAHRUNG]", // Bspw. "Mathematik, Podcasts, ..."
                "main_focus": "[SCHWERPUNKT]", // Bspw. "Software Engineering"
                "profile": "[PROFIL]", // Geplant als String
                "research": "[LEHRE]", // Geplant als String
                "cv": "[VITA]", // Geplant als String
                "comment": "[KOMMENTAR]", // Bspw. "Sehr engagiert"
                "is_extern": "[KENNZEICHNER, OB EXTERN]" // 0 = intern, 2 = extern
            }
        ]
    }
}
````

#### Optionale Parameter /lecturers

- ``experience``
  - filtert die Rückgabe.
  - gibt lediglich Dozenten mit dem angegebenen String im Freitextfeld ``experience`` zurück.
- ``comment``
  - filtert die Rückgabe.
  - gibt lediglich Dozenten mit dem angegebenen String im Freitextfeld ``comment`` zurück.
- ``firstname``
  - filtert die Rückgabe.
  - gibt lediglich Dozenten mit dem angegebenen String als Vornamen zurück (evtl. auch ähnliche? &rarr; Mueller = Müller etc.).
- ``lastname``
  - filtert die Rückgabe.
  - gibt lediglich Dozenten mit dem angegebenen String als Nachnamen zurück (evtl. auch ähnliche? &rarr; Mueller = Müller etc.).
- ``extern``
  - filtert die Rückgabe.
  - gibt ebenfalls externe Dozenten zurück.
  - 0 = nur intern, 1 = intern&extern, 2 = nur extern.


### POST /lecturers

**Info**: Erzeugt einen neuen Dozenten.

Body der Anfrage:
````js
{
    "firstname": "[VORNAME]", // Bspw. "Sebastian"
    "lastname": "[NACHNAME]", // Bspw. "Ritterbusch"
    "academic_title": "[AKADEMISCHER TITEL]", // Bspw. "Prof. Dr."
    "email": "[E-MAIL]", // Bspw. "sebastian.ritterbusch@dhbw-mannheim.de"
    "salutation": "[ANREDE]", // Bspw. "Herr"
    "phonenumber": "[TELEFONNUMMER]", // Bspw. "+49 621 4105 - 1724"
    "experience": "[ERFAHRUNG]", // Bspw. "Mathematik, Podcasts, ..."
    "main_focus": "[SCHWERPUNKT]", // Bspw. "Software Engineering"
    "profile": "[PROFIL]", // Geplant als String
    "research": "[LEHRE]", // Geplant als String
    "cv": "[VITA]", // Geplant als String
    "comment": "[KOMMENTAR]", // Bspw. "Sehr engagiert"
    "is_extern": "[KENNZEICHNER, OB EXTERN]" // 0 = intern, 2 = extern
}
````

### PUT /lecturers?lecturerId={ID}

**Info**: Aktualisiert den Dozenten mit der angegebenen ``lecturer_id`` ``{ID}``.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:
````js
{
    "firstname": "[VORNAME]", // Bspw. "Sebastian"
    "lastname": "[NACHNAME]", // Bspw. "Ritterbusch"
    "academic_title": "[AKADEMISCHER TITEL]", // Bspw. "Prof. Dr."
    "email": "[E-MAIL]", // Bspw. "sebastian.ritterbusch@dhbw-mannheim.de"
    "salutation": "[ANREDE]", // Bspw. "Herr"
    "phonenumber": "[TELEFONNUMMER]", // Bspw. "+49 621 4105 - 1724"
    "experience": "[ERFAHRUNG]", // Bspw. "Mathematik, Podcasts, ..."
    "main_focus": "[SCHWERPUNKT]", // Bspw. "Software Engineering"
    "profile": "[PROFIL]", // Geplant als String
    "research": "[LEHRE]", // Geplant als String
    "cv": "[VITA]", // Geplant als String
    "comment": "[KOMMENTAR]", // Bspw. "Sehr engagiert"
    "is_extern": "[KENNZEICHNER, OB EXTERN]" // 0 = intern, 2 = extern
}
````

### DELETE /lecturers?lecturerId={ID}

**Info**: Löscht den angegebenen Dozenten mit der ``lecturer_id`` ``{ID}``, sofern der Dozent dem Studiengangsleiter zugeordnet werden kann.

## /lectures

**Info**: Nur zum Erstellen der Vorlesungen.

### POST /lectures

**Info**: Erzeugt eine neue Vorlesung.

Body der Anfrage:
````js
{
    "name": "[NAME]", // Bspw. "Marketing"
    "workload_home": "[SELBSTSTUDIUM]", // Bspw. "36 Stunden"
    "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "24 Stunden"
    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_301.2"
    "mainFocus": [
        {
            "mainFocus_id": 0, // Bspw. "1"
            "mainFocus_name": "[THEMENGEBIET]" // Bspw. "Unternehmensführung"
        }
    ],
    "lecturer_state": "[STATUS]", //  // Bspw. "Offen", "Angeschrieben", ...
    "lecturer_id": 0 // Dozenten-ID, Bspw. "1"
}
````

### PUT /lectures?lectureId={ID}

**Info**: Aktualisiert die Vorlesung mit der angegebenen ``lecture_id`` ``{ID}``.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:
````js
{
    "name": "[NAME]", // Bspw. "Marketing"
    "workload_home": "[SELBSTSTUDIUM]", // Bspw. "36 Stunden"
    "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "24 Stunden"
    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_301.2"
    "mainFocus": [
        {
            "mainFocus_id": 0 // Bspw. "1"
            "mainFocus_name": "[THEMENGEBIET]" // Bspw. "Unternehmensführung"
        }
    ],
    "lecturer_state": "[STATUS]", //  // Bspw. "Offen", "Angeschrieben", ...
    "lecturer_id": 0 // Dozenten-ID, Bspw. "1"
}
````

### DELETE /lectures?lectureId={ID}

**Info**: Löscht die Vorlesung mit der angegebenen ``{ID}``.