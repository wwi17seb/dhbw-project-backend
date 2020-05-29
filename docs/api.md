# Schnittstellen <!-- omit in toc -->

## Inhalt <!-- omit in toc -->

- [Allgemein](#allgemein)
  - [Authentifizierung](#authentifizierung)
  - [Rückgabe - Info](#rückgabe---info)
  - [Sonstiges](#sonstiges)
- [Auth-Routen](#auth-routen)
  - [POST /signup](#post-signup)
  - [POST /login](#post-login)
  - [POST /logout](#post-logout)
- [/courses](#courses)
  - [GET /courses](#get-courses)
  - [POST /courses](#post-courses)
  - [PUT /courses?courseId={ID}](#put-coursescourseidid)
  - [DELETE /courses?courseId={ID}](#delete-coursescourseidid)
- [/semesters](#semesters)
  - [POST /semesters](#post-semesters)
  - [PUT /semesters?semesterId={ID}](#put-semesterssemesteridid)
  - [DELETE /semesters?semesterId={ID}](#delete-semesterssemesteridid)
- [/lecturers](#lecturers)
  - [GET /lecturers](#get-lecturers)
    - [Optionale Parameter /lecturers](#optionale-parameter-lecturers)
  - [POST /lecturers](#post-lecturers)
  - [PUT /lecturers?lecturerId={ID}](#put-lecturerslectureridid)
  - [DELETE /lecturers?lecturerId={ID}](#delete-lecturerslectureridid)
- [/moduleGroups](#modulegroups)
  - [POST /moduleGroups](#post-modulegroups)
  - [PUT /moduleGroups?moduleGroupId={ID}](#put-modulegroupsmodulegroupidid)
  - [DELETE /moduleGroups?moduleGroupId={ID}](#delete-modulegroupsmodulegroupidid)
- [/modules](#modules)
  - [POST /modules](#post-modules)
  - [PUT /modules?moduleId={ID}](#put-modulesmoduleidid)
  - [DELETE /modules?moduleId={ID}](#delete-modulesmoduleidid)
- [/lectures](#lectures)
  - [POST /lectures](#post-lectures)
  - [PUT /lectures?lectureId={ID}](#put-lectureslectureidid)
  - [DELETE /lectures?lectureId={ID}](#delete-lectureslectureidid)
- [/fieldOfStudies](#fieldofstudies)
  - [GET /fieldOfStudies](#get-fieldofstudies)
    - [Optionale Parameter /fieldOfStudies](#optionale-parameter-fieldofstudies)
  - [POST /fieldOfStudies](#post-fieldofstudies)
  - [PUT /fieldOfStudies?fieldOfStudyId={ID}](#put-fieldofstudiesfieldofstudyidid)
  - [DELETE /fieldOfStudies?fieldOfStudyId={ID}](#delete-fieldofstudiesfieldofstudyidid)
- [/majorSubjects](#majorsubjects)
  - [GET /majorSubjects?fieldOfStudyId={ID}](#get-majorsubjectsfieldofstudyidid)
  - [POST /majorSubjects](#post-majorsubjects)
  - [PUT /majorSubjects?majorSubjectId={ID}](#put-majorsubjectsmajorsubjectidid)
  - [DELETE /majorSubjects?majorSubjectId={ID}](#delete-majorsubjectsmajorsubjectidid)
- [/presentations](#presentations)
  - [POST /presentations](#post-presentations)
  - [PUT /presentations?presentationId={ID}](#put-presentationspresentationidid)
  - [DELETE /presentations?presentationId={ID}](#delete-presentationspresentationidid)
- [/modulecatalog](#modulecatalog)
  - [GET /modulecatalog?majorSubjectId={ID}](#get-modulecatalogmajorsubjectidid)
- [/semesterview](#semesterview)
  - [GET /semesterview?courseId={ID}](#get-semesterviewcourseidid)

## Allgemein
### Authentifizierung
Bei nahezu allen Routen wird geprüft, ob die entsprechende Aktion autorisiert bzw. der Nutzer authentisiert ist.
Dafür muss ein Token (JWT), der beim Login ausgestellt wurde, als URL-Query-Parameter angegeben werden.
Bsp.:
````http
GET /courses?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ1c2VySWQiOjIsImlhdCI6MTU4OTg3MzY4OCwiZXhwIjoxNTk4NTEzNjg4fQ.KTjlx88ke7SWKhQAARMkoOlDtyjRyO73ksUMcThyOJ8
````
Ein Beispiel für eine Route, bei der kein gültiger Token übergeben werden muss, ist ``POST /login``.

**ALLE nicht als "optional" gekennzeichneten Parameter müssen übergeben werden.**

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

## Auth-Routen

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

### POST /login

**Info**: Route zum Anmelden.

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

### POST /logout

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
                    "misc": "[VERSCHIEDENES]" // Bspw. "{ "email-template": "blablabla, was auch immer ihr wollt, könnt ihr hier speichern.", "oder": "auch einfach anders. ihr seid hier frei.", "bitte": "jedoch als text und kein blob." }"
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

### POST /semesters

**Info**: Aktualisiert die Einträge eines Semesters mit angegebener ``semester_id`` ``{ID}``, sofern das Semester Teil eines eigenen Kurses ist.
Alle Attribute müssen erneut übergeben werden, da diese so aktualisiert werden bzw. alle notwendig sind.

Body der Anfrage:
````js
{
    "course_id": 0, // Bspw. "1"
    "name": "[SEMESTERNAME]", // Bspw. "SS18"
    "number": 0, // Bspw. "2"
    "start_date": "[STARTDATUM]", // Bspw. "2018-05-07"
    "end_date": "[ENDDATUM]" // Bspw. "2018-08-03"
}
````

### PUT /semesters?semesterId={ID}

**Info**: Aktualisiert die Einträge eines Semesters mit angegebener ``semester_id`` ``{ID}``, sofern das Semester Teil eines eigenen Kurses ist.
Alle Attribute müssen erneut übergeben werden, da diese so aktualisiert werden bzw. alle notwendig sind.

Body der Anfrage:
````js
{
    "course_id": 0, // Bspw. "1"
    "name": "[SEMESTERNAME]", // Bspw. "SS18"
    "number": 0, // Bspw. "2"
    "start_date": "[STARTDATUM]", // Bspw. "2018-05-07"
    "end_date": "[ENDDATUM]" // Bspw. "2018-08-03"
}
````

### DELETE /semesters?semesterId={ID}

**Info**: Löscht das Semester mit der angegebenen ``{ID}``.

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
                "lecturer_id": 0, // Bspw. "1"
                "firstname": "[VORNAME]", // Bspw. "Sebastian"
                "lastname": "[NACHNAME]", // Bspw. "Ritterbusch"
                "academic_title": "[AKADEMISCHER TITEL]", // Bspw. "Prof. Dr."
                "email": "[E-MAIL]", // Bspw. "sebastian.ritterbusch@dhbw-mannheim.de"
                "salutation": "[ANREDE]", // Bspw. "Herr"
                "phonenumber": "[TELEFONNUMMER]", // Bspw. "+49 621 4105 - 1724"
                "experience": "[ERFAHRUNG]", // Bspw. "Mathematik, Podcasts, ..."
                "mainFocus": [
                    {
                        "name": "[THEMENGEBIET]", // Bspw. "Software Engineering"
                    }
                ],
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
    "mainFocus": [
        {
            "name": "[THEMENGEBIET]", // Bspw. "Software Engineering"
        }
    ],
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
    "mainFocus": [
        {
            "name": "[THEMENGEBIET]", // Bspw. "Software Engineering"
        }
    ],
    "profile": "[PROFIL]", // Geplant als String
    "research": "[LEHRE]", // Geplant als String
    "cv": "[VITA]", // Geplant als String
    "comment": "[KOMMENTAR]", // Bspw. "Sehr engagiert"
    "is_extern": "[KENNZEICHNER, OB EXTERN]" // 0 = intern, 2 = extern
}
````

### DELETE /lecturers?lecturerId={ID}

**Info**: Löscht den angegebenen Dozenten mit der ``lecturer_id`` ``{ID}``, sofern der Dozent dem Studiengangsleiter zugeordnet werden kann.

## /moduleGroups

**Info**: Nur zum Erstellen, Bearbeiten und Löschen der Modulgruppe.

### POST /moduleGroups

**Info**: Erzeugt eine neue Modulgruppe.

Body der Anfrage:
````js
{
    "majorSubject_id": 0, // Bspw. "1"
    "name": "[NAME]", // Bspw. "Profil I"
    "number_of_modules_to_attend": 0, // Bspw. "1"
    "from_semester_number": 0, // Bspw. "1"
    "to_semester_number": 0 // Bspw. "2"
}
````

### PUT /moduleGroups?moduleGroupId={ID}

**Info**: Aktualisiert die Modulgruppe mit der angegebenen ``moduleGroup_id`` ``{ID}``.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:
````js
{
    "majorSubject_id": 0, // Bspw. "1"
    "name": "[NAME]", // Bspw. "Profil I"
    "number_of_modules_to_attend": 0, // Bspw. "1"
    "from_semester_number": 0, // Bspw. "1"
    "to_semester_number": 0 // Bspw. "2"
}
````

### DELETE /moduleGroups?moduleGroupId={ID}

**Info**: Löscht die Modulgruppe mit der angegebenen ``moduleGroup_id`` ``{ID}``.

## /modules

**Info**: Nur zum Erstellen, Bearbeiten und Löschen des Moduls.

### POST /modules

**Info**: Erzeugt eine neues Modul.

Body der Anfrage:
````js
{
    "moduleGroup_id": 0, // Bspw. "1"
    "name": "[NAME]", // Bspw. "Technische Grundlagen mobiler Applikationen"
    "description": "[BESCHREIBUNG]", // Bspw. "Lorem Ipsum..."
    "ects": 0, // Bspw. "6"
    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_1337"
}
````

### PUT /modules?moduleId={ID}

**Info**: Aktualisiert das Modul mit der angegebenen ``module_id`` ``{ID}``.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:
````js
{
    "moduleGroup_id": 0, // Bspw. "1"
    "name": "[NAME]", // Bspw. "Technische Grundlagen mobiler Applikationen"
    "description": "[BESCHREIBUNG]", // Bspw. "Lorem Ipsum..."
    "ects": 0, // Bspw. "6"
    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_1337"
}
````

### DELETE /modules?moduleId={ID}

**Info**: Löscht das Modul mit der angegebenen ``module_id`` ``{ID}``.

## /lectures

**Info**: Nur zum Erstellen, Bearbeiten und Löschen der **abstrakten** Vorlesung.

### POST /lectures

**Info**: Erzeugt eine neue **abstrakten** Vorlesung.

Body der Anfrage:
````js
{
    "module_id": 0, // Bspw. "1"
    "name": "[NAME]", // Bspw. "Marketing"
    "workload_home": "[SELBSTSTUDIUM]", // Bspw. "36 Stunden"
    "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "24 Stunden"
    "requirements": "[ANFODERUNGEN]" // Bspw. "Keine."
    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_301.2"
    "mainFocus": [
        {
            "name": "[THEMENGEBIET]" // Bspw. "Unternehmensführung"
        }
    ]
}
````

### PUT /lectures?lectureId={ID}

**Info**: Aktualisiert die Vorlesung mit der angegebenen ``lecture_id`` ``{ID}``.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:
````js
{
    "module_id": 0, // Bspw. "1"
    "name": "[NAME]", // Bspw. "Marketing"
    "workload_home": "[SELBSTSTUDIUM]", // Bspw. "36 Stunden"
    "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "24 Stunden"
    "requirements": "[ANFODERUNGEN]" // Bspw. "Keine."
    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_301.2"
    "mainFocus": [
        {
            "name": "[THEMENGEBIET]" // Bspw. "Unternehmensführung"
        }
    ]
}
````

### DELETE /lectures?lectureId={ID}

**Info**: Löscht die Vorlesung mit der angegebenen ``{ID}``.

## /fieldOfStudies

### GET /fieldOfStudies

**Info**: Gibt alle Studiengänge zurück.

Rückgabe:
````js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "FieldOfStudies": [
            {
                "id": 0, // Bspw. "1"
                "name": "[NAME]" // Bspw. "Wirtschaftsinformatik"
            }
        ]
    }
}
````

#### Optionale Parameter /fieldOfStudies

- ``withMajorSubjects``
  - sofern ``true`` werden hier die Studienrichtungen mitübergeben.

Rückgabe:
````js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "FieldOfStudies": [
            {
                "id": 0, // Bspw. "1"
                "name": "[NAME]", // Bspw. "Wirtschaftsinformatik"
                "MajorSubjects": [
                    {
                        "id": 0, // Bspw. "1"
                        "name": "[NAME]" // Bspw. "Software Engineering 2018"
                    }
                ]
            }
        ]
    }
}
````

### POST /fieldOfStudies

**Info**: Erstellt einen Studiengang.

Body der Anfrage:
````js
{
    "name": "[NAME]" // Bspw. "Wirtschaftsinformatik"
}
````

### PUT /fieldOfStudies?fieldOfStudyId={ID}

**Info**: Aktualisiert den Studiengang mit der angegebenen ``fieldOfStudy_id`` ``{ID}``.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:
````js
{
    "name": "[NAME]" // Bspw. "Wirtschaftsinformatik"
}
````

### DELETE /fieldOfStudies?fieldOfStudyId={ID}

**Info**: Löscht den Studiengang mit der angegebenen ``fieldOfStudy_id`` ``{ID}``.

## /majorSubjects

### GET /majorSubjects?fieldOfStudyId={ID}

**Info**: Gibt alle Studienrichtungen zum Studiengang mit der angegebenen ``fieldOfStudy_id`` ``{ID}`` zurück. (Muss eine ``{ID}`` beinhalten.)

Rückgabe:
````js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "FieldOfStudy": {
            "fieldOfStudy_id": 0, // Bspw. "1"
            "name": "[NAME]", // Bspw. "Wirtschaftsinformatik"
        },
        "MajorSubjects": [
            {
                "majorSubject_id": 0, // Bspw. "1"
                "name": "[NAME]" // Bspw. "Software Engineering ab 2018"
            }
        ]
    }
}
````

### POST /majorSubjects

**Info**: Erstellt eine Studienrichtung für einen Studiengang mit angegebener ``fieldOfStudy_id``.

Body der Anfrage:
````js
{
    "fieldOfStudy_id": 0, // Bspw. "1"
    "name": "[NAME]" // Bspw. "Software Engineering 2018"
}
````

### PUT /majorSubjects?majorSubjectId={ID}

**Info**: Aktualisiert die Studienrichtung mit der angegebenen ``majorSubject_id`` ``{ID}``.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:
````js
{
    "fieldOfStudy_id": 0, // Bspw. "1"
    "name": "[NAME]" // Bspw. "Software Engineering 2011"
}
````

### DELETE /majorSubjects?majorSubjectId={ID}

**Info**: Löscht die Studienrichtung mit der angegebenen ``majorSubject_id`` ``{ID}``.

## /presentations

**Info**: Nur zum Erstellen, Bearbeiten und Löschen der Dozenten-Anfragen und **konkreten** Vorlesungen.

### POST /presentations

**Info**: Erzeugt eine neue **konkrete** Vorlesung (bzw. eine Anfrage an einen Dozenten).

Body der Anfrage:
````js
{
    "lecture_id": 0, // Bspw. "1"
    "lecturer_id": 0, // Bspw. "1"
    "academicRecord_id": 0, // Bspw. "1"
    "semester_id": 0, // Bspw. "1"
    "course_id": 0, // Bspw. "1"
    "status": "[STATUS]", // Bspw. "Dozent offen", "Dozent angeschrieben", ...
}
````

### PUT /presentations?presentationId={ID}

**Info**: Aktualisiert die Vorlesung bzw. den Status der Dozentenanfrage mit der angegebenen ``presentation_id`` ``{ID}``.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:
````js
{
    "lecture_id": 0, // Bspw. "1"
    "lecturer_id": 0, // Bspw. "1"
    "academicRecord_id": 0, // Bspw. "1"
    "semester_id": 0, // Bspw. "1"
    "course_id": 0, // Bspw. "1"
    "status": "[STATUS]", // Bspw. "Dozent offen", "Dozent angeschrieben", ...
}
````

### DELETE /presentations?presentationId={ID}

**Info**: Löscht die Vorlesung mit der angegebenen ``presentation_id`` ``{ID}``.

## /modulecatalog

### GET /modulecatalog?majorSubjectId={ID}

**Info**: Gibt alle Modulkataloge zu einer angegebenen Studienrichtung (innerhalb eines Studiengangs) zurück.
Dies umfasst also die Modulgruppen, die Module und die (abstrakten) Vorlesungen.

Rückgabe:
````js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "fieldOfStudy": {
            "fieldOfStudy_id": 0, // Bspw. "1"
            "name": "[STUDIENGANG]" // Bspw. "Wirtschaftsinformatik"
        },
        "majorSubject": {
            "majorSubject_id": 0, // Bspw. "1"
            "name": "[STUDIENRICHTUNG]" // Bspw. "Software Engineering ab 2011"
        },
        "moduleGroups": [
            {
                "moduleGroup_id": 0, // Bspw. "1"
                "name": "[NAME]", // Bspw. "Profil I"
                "number_of_modules_to_attend": 0, // Bspw. "1"
                "from_semester_number": 0, // Bspw. "1"
                "to_semester_number": 0 // Bspw. "2"
                "modules": [
                    "module_id": 0, // Bspw. "1"
                    "name": "[NAME]", // Bspw. "Technische Grundlagen mobiler Applikationen"
                    "description": "[BESCHREIBUNG]", // Bspw. "Lorem Ipsum..."
                    "ects": 0, // Bspw. "6"
                    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_1337"
                    "lectures": [
                        {
                            "name": "[NAME]", // Bspw. "Netzwerk- und Betriebssystemstrukturen für mobile Applikationen"
                            "workload_home": "[SELBSTSTUDIUM]", // Bspw. "57 Stunden"
                            "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "33 Stunden"
                            "requirements": "[ANFODERUNGEN]" // Bspw. "Keine."
                            "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_301.2"
                            "mainFocus": [
                                {   
                                    "name": "[THEMENGEBIET]" // Bspw. "Unternehmensführung"
                                }
                            ] 
                        }
                    ],
                    "academicRecords": [
                        {
                            "academicRecord_id": 0, // Bspw. "1"
                            "abbreviation": "[ABKÜRZUNG]", // Bspw. "K, SE"
                            "type": "[TYP]", // Bspw. "Klausur"
                            "rated": TRUE //  Bspw. "TRUE/FALSE
                        }
                    ]
                ]
            }
        ]
    }
}
````


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
                "semester_id": 0, // Bspw. "1"
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
                                "description": "[BESCHREIBUNG]", // Bspw. "Lorem Ipsum..."
                                "ects": 0, // Bspw. "6"
                                "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_713"
                                "presentations": [
                                    {
                                        "lecture": {
                                            "lecture_id": 0, // Bspw. "3"
                                            "name": "[NAME]", // Bspw. "Netzwerk- und Betriebssystemstrukturen für mobile Applikationen"
                                            "workload_home": "[SELBSTSTUDIUM]", // Bspw. "57"
                                            "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "33"
                                            "catalog_id": "string", // Bspw. "WWISE_713.1"
                                            "mainFocus": [
                                                {
                                                    "name": "[THEMENGEBIET]" // Bspw. "Mobile Applikationen"
                                                }
                                        },
                                        "status": "[STATUS]", // Bspw. "Dozent offen", "Dozent angeschrieben", ...
                                        "lecturer": { // falls vorhanden
                                            "lecturer_id": 0, // Bspw. "1"
                                            "firstname": "[VORNAME]", // Bspw. "Sebastian"
                                            "lastname": "[NACHNAME]", // Bspw. "Ritterbusch"
                                            "academic_title": "[AKADEMISCHER TITEL]", // Bspw. "Prof. Dr."
                                            "email": "[E-MAIL]", // Bspw. "sebastian.ritterbusch@dhbw-mannheim.de"
                                            "salutation": "[ANREDE]", // Bspw. "Herr"
                                            "phonenumber": "[TELEFONNUMMER]", // Bspw. "+49 621 4105 - 1724"
                                            "experience": "[ERFAHRUNG]", // Bspw. "Mathematik, Podcasts, ..."
                                            "mainFocus": [
                                                {
                                                    "name": "[THEMENGEBIET]", // Bspw. "Software Engineering"
                                                }
                                            ],
                                            "profile": "[PROFIL]", // Geplant als String
                                            "research": "[LEHRE]", // Geplant als String
                                            "cv": "[VITA]", // Geplant als String
                                            "comment": "[KOMMENTAR]", // Bspw. "Sehr engagiert"
                                            "is_extern": "[KENNZEICHNER, OB EXTERN]" // 0 = intern, 2 = extern
                                        },
                                        "directorOfStudies": {
                                            "misc": "[VERSCHIEDENES]" // Bspw. "{ "email-template": "blablabla, was auch immer ihr wollt, könnt ihr hier speichern.", "oder": "auch einfach anders. ihr seid hier frei.", "bitte": "jedoch als text und kein blob." }"
                                        }
                                    }
                                ],
                                "academicRecords": [ // mögliche Bewertungsverfahren
                                    {
                                        "academicRecord_id": 0, // Bspw. "1"
                                        "abbreviation": "[ABKÜRZUNG]", // Bspw. "K, SE"
                                        "type": "[TYP]", // Bspw. "Klausur"
                                        "rated": TRUE //  Bspw. "TRUE/FALSE
                                    }
                                ],
                                "academicRecord": { // gewähltes Bewertungsverfahren
                                    "academicRecord_id": 0, // Bspw. "1"
                                    "abbreviation": "[ABKÜRZUNG]", // Bspw. "K, SE"
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
