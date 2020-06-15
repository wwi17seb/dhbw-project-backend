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
- [/mainFocuses](#mainfocuses)
  - [GET /mainFocuses](#get-mainfocuses)
  - [POST /mainFocuses](#post-mainfocuses)
  - [PUT /mainFocuses?mainFocusId={ID}](#put-mainfocusesmainfocusidid)
  - [DELETE /mainFocuses?mainFocusId={ID}](#delete-mainfocusesmainfocusidid)
- [/lecturers](#lecturers)
  - [GET /lecturers](#get-lecturers)
    - [Optionale Parameter /lecturers](#optionale-parameter-lecturers)
  - [POST /lecturers](#post-lecturers)
  - [PUT /lecturers?lecturerId={ID}](#put-lecturerslectureridid)
  - [DELETE /lecturers?lecturerId={ID}](#delete-lecturerslectureridid)
- [/fieldsOfStudy](#fieldsofstudy)
  - [GET /fieldsOfStudy](#get-fieldsofstudy)
    - [Optionale Parameter /fieldsOfStudy](#optionale-parameter-fieldsofstudy)
  - [POST /fieldsOfStudy](#post-fieldsofstudy)
  - [PUT /fieldsOfStudy?fieldOfStudyId={ID}](#put-fieldsofstudyfieldofstudyidid)
  - [DELETE /fieldsOfStudy?fieldOfStudyId={ID}](#delete-fieldsofstudyfieldofstudyidid)
- [/majorSubjects](#majorsubjects)
  - [GET /majorSubjects?fieldOfStudyId={ID}](#get-majorsubjectsfieldofstudyidid)
  - [POST /majorSubjects](#post-majorsubjects)
  - [PUT /majorSubjects?majorSubjectId={ID}](#put-majorsubjectsmajorsubjectidid)
  - [DELETE /majorSubjects?majorSubjectId={ID}](#delete-majorsubjectsmajorsubjectidid)
- [/presentations](#presentations)
  - [GET /presentations?courseId={ID}](#get-presentationscourseidid)
    - [Optionale Parameter /presentations](#optionale-parameter-presentations)
  - [POST /presentations](#post-presentations)
  - [PUT /presentations?presentationId={ID}](#put-presentationspresentationidid)
  - [DELETE /presentations?presentationId={ID}](#delete-presentationspresentationidid)
- [/academicRecords](#academicrecords)
  - [GET /academicRecords](#get-academicrecords)
  - [POST /academicRecords](#post-academicrecords)
  - [PUT /academicRecords?academicRecordId={ID}](#put-academicrecordsacademicrecordidid)
  - [DELETE /academicRecords?academicRecordId={ID}](#delete-academicrecordsacademicrecordidid)
- [/modulecatalog](#modulecatalog)
  - [GET /modulecatalog?majorSubjectId={ID}](#get-modulecatalogmajorsubjectidid)
- [/moduleGroups](#modulegroups)
  - [POST /moduleGroups](#post-modulegroups)
  - [PUT /moduleGroups?moduleGroupId={ID}](#put-modulegroupsmodulegroupidid)
  - [DELETE /moduleGroups?moduleGroupId={ID}](#delete-modulegroupsmodulegroupidid)

## Allgemein

### Authentifizierung

Bei nahezu allen Routen wird geprüft, ob die entsprechende Aktion autorisiert bzw. der Nutzer authentisiert ist.
Dafür muss ein Token (JWT), der beim Login ausgestellt wurde, als URL-Query-Parameter angegeben werden.
Bsp.:

```http
GET /courses?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGlyZWN0b3JPZlN0dWRpZXNfaWQiOjEsImlhdCI6MTU5MjA1NjMzNywiZXhwIjoxNjAwNjk2MzM3fQ.KGl9sxoV-gro8yjUy8lVBQC_6uzUrYfpp-B0aGjf3Bs
```

Ein Beispiel für eine Route, bei der kein gültiger Token übergeben werden muss, ist `POST /login`.

**ALLE nicht als "optional" gekennzeichneten Parameter müssen übergeben werden.**

### Rückgabe - Info

Allgemeiner Rückgabe-Aufbau:

- Integer werden als `0` gekennzeichnet.
- Strings werden durch `"[NAME]"` gekennzeichnet und beinhalten einen beschreibenden Namen.
- Boolean werden als `TRUE` gekennzeichnet.
- Arrays können mehrere Objekte beinhalten. Es wird in der Dokumentation jedoch nur ein Objekt eingesetzt.
<!-- beschreiben mit [], 0 -->

```js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {

    }
}
```

Wenn im Folgenden keine Rückgabe gezeigt ist, dann wird lediglich eine `message` gesetzt und das `payload`-Objekt ist leer.

### Sonstiges

Routen, die nicht existieren, werden nicht dargestellt.

## Auth-Routen

### POST /signup

Body der Anfrage:

```js
{
    "username": "[NAME]", // Bspw. "Nutzername"
    "password": "[PASSWORT]" // Bspw. "MeinSicheresPasswort1337"
}
```

Rückgabe:

```js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "token": "[TOKEN]", // Bspw. "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGlyZWN0b3JPZlN0dWRpZXNfaWQiOjEsImlhdCI6MTU5MjA1NjMzNywiZXhwIjoxNjAwNjk2MzM3fQ.KGl9sxoV-gro8yjUy8lVBQC_6uzUrYfpp-B0aGjf3Bs"
        "directorOfStudies_id": 0, // Bspw. "1"
        "username": "[NUTZERNAME]" // Bspw. "Nutzername"
    }
}
```

### POST /login

**Info**: Route zum Anmelden.

Body der Anfrage:

```js
{
    "username": "[NAME]", // Bspw. "Nutzername"
    "password": "[PASSWORT]" // Bspw. "MeinSicheresPasswort1337"
}
```

Rückgabe:

```js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "token": "[TOKEN]", // Bspw. "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGlyZWN0b3JPZlN0dWRpZXNfaWQiOjEsImlhdCI6MTU5MjA1NjMzNywiZXhwIjoxNjAwNjk2MzM3fQ.KGl9sxoV-gro8yjUy8lVBQC_6uzUrYfpp-B0aGjf3Bs"
        "directorOfStudies_id": 0, // Bspw. "1"
        "username": "[NUTZERNAME]" // Bspw. "Nutzername"
    }
}
```

### POST /logout

**Info**: Route existiert, ändert jedoch nichts.
Jeder Token ist für eine Dauer von `12h` gültig und muss danach erneuert werden.

## /courses

### GET /courses

**Info**: Gibt alle zum aktuell angemeldeten Studiengangsleiter vorhandenen Kurse zurück.

Rückgabe:

```js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "Courses": [
            {
                "course_id": 0, // Bspw. "1"
                "name": "[KURSNAME]", // Bspw. "WWI 17 SE B"
                "google_calendar_id": "[GOOGLE_KALENDER_ID]",
                "DirectorOfStudies": {
                    "misc": "[VERSCHIEDENES]" // Bspw. "{ "email-template": "blablabla, was auch immer ihr wollt, könnt ihr hier speichern.", "oder": "auch einfach anders. ihr seid hier frei.", "bitte": "jedoch als text und kein blob." }"
                },
                "MajorSubject": {
                    "majorSubject_id": 0, // Bspw. "1"
                    "name": "[NAME]", // Bspw. "Software Engineering"
                    "catalog_effective_from": "[CATALOG_EFFECTIVE_FROM]", // Bspw. "Gültig ab 2018"
                    "FieldOfStudy": {
                        "fieldOfStudy_id": 0, // Bspw. "1"
                        "name": "[STUDIENRICHTUNG]" // Bspw. "Wirtschaftsinformatik"
                    }
                },
                "Semesters": [
                    {
                        "semester_id": 0, // Bspw. "1"
                        "name": "[SEMESTERNAME]", // Bspw. "WS17/18"
                        "number": 0, // Bspw. "1"
                        "start_date": "[STARTDATUM]", // Bspw. "2017-10-23"
                        "end_date": "[ENDDATUM]" // Bspw. "2018-02-19"
                    }
                ]
            }
        ]
    }
}
```

### POST /courses

**Info**: Erzeugt einen neuen Kurs beim angegebenen Studiengangsleiter.

Body der Anfrage:

```js
{
    "name": "[KURSNAME]", // Bspw. "WWI 17 SEB"
    "google_calendar_id": "[GOOGLE_KALENDER_ID]",
    "majorSubject_id": 0, // Bspw. "1" - impliziert das field of study.
    "directorOfStudies_ids": [ 0, 0 ], // Bspw. [1] oder [1, 2] - die eigene Id wird automatisch gesetzt, hier können weitere Verantwortliche hinzugefügt werden
    "Semesters": [
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
```

### PUT /courses?courseId={ID}

**Info**: Aktualisiert den angegebenen Kurs.
`{ID}` ist dabei die `course_id`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.
Semester können über die `semester` aktualisiert werden.

Body der Anfrage:

```js
{
    "name": "[KURSNAME]", // Bspw. "WWI 17 SE B"
    "google_calendar_id": "[GOOGLE_KALENDER_ID]",
    "majorSubject_id": 0, // Bspw. "1"
    "directorOfStudies_ids": [ 0, 0 ] // Bspw. [1] oder [1, 2] - die eigene Id wird automatisch gesetzt, hier können weitere Verantwortlichen hinzugefügt werden
}
```

### DELETE /courses?courseId={ID}

**Info**: Löscht den angegebenen Kurs mit der `course_id` `{ID}`, sofern man selbst Studiengangsleiter ist.

## /semesters

### POST /semesters

**Info**: Erstellt einen neuen Eintrag eines Semesters zum angegebenen Kurs, sofern es in einem eigenen Kurs angelegt wird.

Body der Anfrage:

```js
{
    "course_id": 0, // Bspw. "1"
    "name": "[SEMESTERNAME]", // Bspw. "SS18"
    "number": 0, // Bspw. "2"
    "start_date": "[STARTDATUM]", // Bspw. "2018-05-07"
    "end_date": "[ENDDATUM]" // Bspw. "2018-08-03"
}
```

### PUT /semesters?semesterId={ID}

**Info**: Aktualisiert die Einträge eines Semesters mit angegebener `semester_id` `{ID}`, sofern das Semester Teil eines eigenen Kurses ist.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:

```js
{
    "course_id": 0, // Bspw. "1"
    "name": "[SEMESTERNAME]", // Bspw. "SS18"
    "number": 0, // Bspw. "2"
    "start_date": "[STARTDATUM]", // Bspw. "2018-05-07"
    "end_date": "[ENDDATUM]" // Bspw. "2018-08-03"
}
```

### DELETE /semesters?semesterId={ID}

**Info**: Löscht das Semester mit der angegebenen `{ID}`, sofern es zu einem eigenen Kurs gehört.

## /mainFocuses

### GET /mainFocuses

Rückgabe:

```js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "MainFocuses": [
            {
                "mainFocus_id": 0, // Bspw. "1"
                "name": "[SCHWERPUNKT]", // Bspw. "Programmieren"
            }
        ]
    }
}
```

### POST /mainFocuses

**Info**: Erstellt einen neuen Eintrag eines Schwerpunkts.

Body der Anfrage:

```js
{
    "name": "[SCHWERPUNKT]", // Bspw. "Programmieren"
}
```

### PUT /mainFocuses?mainFocusId={ID}

**Info**: Aktualisiert den Schwerpunkt (mainFocus) mit angegebener `mainFocus_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:

```js
{
    "name": "[SCHWERPUNKT]", // Bspw. "Programmieren"
}
```

### DELETE /mainFocuses?mainFocusId={ID}

**Info**: Löscht den Schwerpunkt mit der angegebenen `{ID}`.

## /lecturers

### GET /lecturers

**Info**: Gibt alle Dozenten zurück.

Rückgabe:

```js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "Lecturers": [
            {
                "lecturer_id": 0, // Bspw. "1"
                "firstname": "[VORNAME]", // Bspw. "Sebastian"
                "lastname": "[NACHNAME]", // Bspw. "Ritterbusch"
                "academic_title": "[AKADEMISCHER TITEL]", // Bspw. "Prof. Dr."
                "email": "[E-MAIL]", // Bspw. "sebastian.ritterbusch@dhbw-mannheim.de"
                "salutation": "[ANREDE]", // Bspw. "Herr"
                "phonenumber": "[TELEFONNUMMER]", // Bspw. "+49 621 4105 - 1724"
                "experience": "[ERFAHRUNG]", // Bspw. "Mathematik, Podcasts, ..."
                "MainFocus": [
                    {
                        "mainFocus_id": 0, // Bspw. "1"
                        "name": "[THEMENGEBIET]" // Bspw. "Software Engineering"
                    }
                ],
                "profile": "[PROFIL]", // Geplant als String
                "research": "[LEHRE]", // Geplant als String
                "cv": "[VITA]", // Geplant als String
                "comment": "[KOMMENTAR]", // Bspw. "Sehr engagiert"
                "is_extern": TRUE // false = intern, true = extern
            }
        ]
    }
}
```

#### Optionale Parameter /lecturers

**Info**: [NICHT VORHANDEN!] Folgende Parameter werden noch implementiert.

- `experience`
  - filtert die Rückgabe.
  - gibt lediglich Dozenten mit dem angegebenen String im Freitextfeld `experience` zurück.
  - kommagetrennt.
- `comment`
  - filtert die Rückgabe.
  - gibt lediglich Dozenten mit dem angegebenen String im Freitextfeld `comment` zurück.
  - kommagetrennt.
- `firstname`
  - filtert die Rückgabe.
  - gibt lediglich Dozenten mit dem angegebenen String als Vornamen zurück (evtl. auch ähnliche? &rarr; Mueller = Müller etc.).
- `lastname`
  - filtert die Rückgabe.
  - gibt lediglich Dozenten mit dem angegebenen String als Nachnamen zurück (evtl. auch ähnliche? &rarr; Mueller = Müller etc.).
- `extern`
  - filtert die Rückgabe.
  - gibt ebenfalls externe Dozenten zurück.
  - 0 = nur intern, 1 = intern&extern, 2 = nur extern.

### POST /lecturers

**Info**: Erzeugt einen neuen Dozenten.

Body der Anfrage:

```js
{
    "firstname": "[VORNAME]", // Bspw. "Sebastian"
    "lastname": "[NACHNAME]", // Bspw. "Ritterbusch"
    "academic_title": "[AKADEMISCHER TITEL]", // Bspw. "Prof. Dr."
    "email": "[E-MAIL]", // Bspw. "sebastian.ritterbusch@dhbw-mannheim.de"
    "salutation": "[ANREDE]", // Bspw. "Herr"
    "phonenumber": "[TELEFONNUMMER]", // Bspw. "+49 621 4105 - 1724"
    "experience": "[ERFAHRUNG]", // Bspw. "Mathematik, Podcasts, ..."
    "mainFocus_ids": [ 0, 0 ], // Bspw. "[1]" oder "[1, 2]"
    "profile": "[PROFIL]", // Geplant als String
    "research": "[LEHRE]", // Geplant als String
    "cv": "[VITA]", // Geplant als String
    "comment": "[KOMMENTAR]", // Bspw. "Sehr engagiert"
    "is_extern": TRUE // false = intern, true = extern
}
```

### PUT /lecturers?lecturerId={ID}

**Info**: Aktualisiert den Dozenten mit der angegebenen `lecturer_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:

```js
{
    "firstname": "[VORNAME]", // Bspw. "Sebastian"
    "lastname": "[NACHNAME]", // Bspw. "Ritterbusch"
    "academic_title": "[AKADEMISCHER TITEL]", // Bspw. "Prof. Dr."
    "email": "[E-MAIL]", // Bspw. "sebastian.ritterbusch@dhbw-mannheim.de"
    "salutation": "[ANREDE]", // Bspw. "Herr"
    "phonenumber": "[TELEFONNUMMER]", // Bspw. "+49 621 4105 - 1724"
    "experience": "[ERFAHRUNG]", // Bspw. "Mathematik, Podcasts, ..."
    "mainFocus_ids": [ 0, 0 ], // Bspw. "[1]" oder "[1, 2]"
    "profile": "[PROFIL]", // Geplant als String
    "research": "[LEHRE]", // Geplant als String
    "cv": "[VITA]", // Geplant als String
    "comment": "[KOMMENTAR]", // Bspw. "Sehr engagiert"
    "is_extern": TRUE // false = intern, true = extern
}
```

### DELETE /lecturers?lecturerId={ID}

**Info**: Löscht den angegebenen Dozenten mit der `lecturer_id` `{ID}`, sofern der Dozent dem Studiengangsleiter zugeordnet werden kann.

## /fieldsOfStudy

### GET /fieldsOfStudy

**Info**: Gibt alle Studiengänge zurück.

Rückgabe:

```js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "FieldsOfStudy": [
            {
                "fieldOfStudy_id": 0, // Bspw. "1"
                "name": "[NAME]" // Bspw. "Wirtschaftsinformatik"
            }
        ]
    }
}
```

#### Optionale Parameter /fieldsOfStudy

- `withMajorSubjects`
  - sofern `true` werden hier die Studienrichtungen mitübergeben.

Rückgabe:

```js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "FieldsOfStudy": [
            {
                "fieldOfStudy_id": 0, // Bspw. "1"
                "name": "[NAME]", // Bspw. "Wirtschaftsinformatik"
                "MajorSubjects": [
                    {
                        "majorSubject_id": 0, // Bspw. "1"
                        "name": "[NAME]", // Bspw. "Software Engineering"
                        "catalog_effective_from": "[CATALOG_EFFECTIVE_FROM]" // Bspw. "Gültig ab 2018"
                    }
                ]
            }
        ]
    }
}
```

### POST /fieldsOfStudy

**Info**: Erstellt einen Studiengang.

Body der Anfrage:

```js
{
    "name": "[NAME]" // Bspw. "Wirtschaftsinformatik"
}
```

### PUT /fieldsOfStudy?fieldOfStudyId={ID}

**Info**: Aktualisiert den Studiengang mit der angegebenen `fieldOfStudy_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:

```js
{
    "name": "[NAME]" // Bspw. "Wirtschaftsinformatik"
}
```

### DELETE /fieldsOfStudy?fieldOfStudyId={ID}

**Info**: Löscht den Studiengang mit der angegebenen `fieldOfStudy_id` `{ID}`.

## /majorSubjects

### GET /majorSubjects?fieldOfStudyId={ID}

**Info**: Gibt alle Studienrichtungen zum Studiengang mit der angegebenen `fieldOfStudy_id` `{ID}` zurück. (Muss eine `{ID}` beinhalten.)

Rückgabe:

```js
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
                "name": "[NAME]", // Bspw. "Software Engineering"
                "catalog_effective_from": "[CATALOG_EFFECTIVE_FROM]" // Bspw. "Gültig ab 2018"
            }
        ]
    }
}
```

### POST /majorSubjects

**Info**: Erstellt eine Studienrichtung für einen Studiengang mit angegebener `fieldOfStudy_id`.

Body der Anfrage:

```js
{
    "fieldOfStudy_id": 0, // Bspw. "1"
    "name": "[NAME]", // Bspw. "Software Engineering"
    "catalog_effective_from": "[CATALOG_EFFECTIVE_FROM]" // Bspw. "Gültig ab 2018"
}
```

### PUT /majorSubjects?majorSubjectId={ID}

**Info**: Aktualisiert die Studienrichtung mit der angegebenen `majorSubject_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:

```js
{
    "fieldOfStudy_id": 0, // Bspw. "1"
    "name": "[NAME]", // Bspw. "Software Engineering"
    "catalog_effective_from": "[CATALOG_EFFECTIVE_FROM]" // Bspw. "Gültig ab 2018"
}
```

### DELETE /majorSubjects?majorSubjectId={ID}

**Info**: Löscht die Studienrichtung mit der angegebenen `majorSubject_id` `{ID}`.

## /presentations

### GET /presentations?courseId={ID}

**Info**: Gibt alle **konkreten** Vorlesungen (inkl. der noch in Planung befindlichen) für einen bestimmten Kurs zurück.
Dies funktioniert nur, wenn der angemeldete DoS auch Studiengangsleiter vom angegebenen Kurs ist (er muss die konkreten Vorlesungen nicht zwingend erstellt haben).

Rückgabe:

```js
{
    "Presentations": [
        {
            "presentation_id": 0, // Bspw. "1"
            "status": "[STATUS]", // Bspw. "Dozent offen", "Dozent angeschrieben", ...
            "Lecture": {
                "lecture_id": 0, // Bspw. "3"
                "name": "[NAME]", // Bspw. "Netzwerk- und Betriebssystemstrukturen für mobile Applikationen"
                "workload_home": "[SELBSTSTUDIUM]", // Bspw. "57"
                "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "33"
                "catalog_id": "string", // Bspw. "WWISE_713.1"
                "MainFocus": [
                    {
                        "mainFocus_id": 0, // Bspw. "1"
                        "name": "[THEMENGEBIET]" // Bspw. "Mobile Applikationen"
                    }
                ],
                "Module": {
                    "module_id": 0, // Bspw. "1"
                    "name": "[NAME]", // Bspw. "Technische Grundlagen mobiler Applikationen"
                    "description": "[BESCHREIBUNG]", // Bspw. "Lorem Ipsum..."
                    "ects": 0, // Bspw. "6"
                    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_1337"
                    "AcademicRecords": [ // mögliche Bewertungsverfahren
                        {
                            "academicRecord_id": 0, // Bspw. "1"
                            "abbreviation": "[ABKÜRZUNG]", // Bspw. "K, SE"
                            "type": "[TYP]", // Bspw. "Klausur"
                            "rated": TRUE // Bspw. "TRUE/FALSE
                        }
                    ],
                    "ModuleGroup": {
                        "moduleGroup_id": 0, // Bspw. "1"
                        "name": "[NAME]", // Bspw. "Profil I"
                        "number_of_modules_to_attend": 0, // Bspw. "1"
                        "from_semester_number": 0, // Bspw. "1"
                        "to_semester_number": 0 // Bspw. "2"
                    }
                }
            },
            "Lecturer": { // falls vorhanden
                "lecturer_id": 0, // Bspw. "1"
                "firstname": "[VORNAME]", // Bspw. "Sebastian"
                "lastname": "[NACHNAME]", // Bspw. "Ritterbusch"
                "academic_title": "[AKADEMISCHER TITEL]", // Bspw. "Prof. Dr."
                "email": "[E-MAIL]", // Bspw. "sebastian.ritterbusch@dhbw-mannheim.de"
                "salutation": "[ANREDE]", // Bspw. "Herr"
                "phonenumber": "[TELEFONNUMMER]", // Bspw. "+49 621 4105 - 1724"
                "experience": "[ERFAHRUNG]", // Bspw. "Mathematik, Podcasts, ..."
                "MainFocus": [
                    {
                        "mainFocus_id": 0, // Bspw. "1"
                        "name": "[THEMENGEBIET]" // Bspw. "Software Engineering"
                    }
                ],
                "profile": "[PROFIL]", // Geplant als String
                "research": "[LEHRE]", // Geplant als String
                "cv": "[VITA]", // Geplant als String
                "comment": "[KOMMENTAR]", // Bspw. "Sehr engagiert"
                "is_extern": "[KENNZEICHNER, OB EXTERN]" // 0 = intern, 2 = extern
            },
            "DirectorOfStudies": { // current (signed in) Director of Studies
                "directorOfStudies_Id": 0, // Bspw. "1"
                "username": "[BENUTZERNAME]", // Bspw. "Admin"
                "isAdmin": TRUE, // Bspw. "TRUE/FALSE"
                "misc": "[VERSCHIEDENES]" // Bspw. "{ "email-template": "blablabla, was auch immer ihr wollt, könnt ihr hier speichern.", "oder": "auch einfach anders. ihr seid hier frei.", "bitte": "jedoch als text und kein blob." }"
            },
            "createdBy": {
                "directorOfStudies_id": 0, // Bspw. "2"
                "username": "[BENUTZERNAME]", // Bspw. "jreichwald"
            }
            "AcademicRecord": { // gewähltes Bewertungsverfahren
                "academicRecord_id": 0, // Bspw. "1"
                "abbreviation": "[ABKÜRZUNG]", // Bspw. "K, SE"
                "type": "[TYP]", // Bspw. "Klausur"
                "rated": TRUE // Bspw. "TRUE/FALSE
            },
            "Semester": {
                "semester_id": 0, // Bspw. "1"
                "name": "[SEMESTERNAME]", // Bspw. "WS17/18"
                "number": 0, // Bspw. "1"
                "start_date": "[STARTDATUM]", // Bspw. "2017-10-23"
                "end_date": "[ENDDATUM]" // Bspw. "2018-02-19"
            }
        }
    ]
}
```

#### Optionale Parameter /presentations

- `semesterId`
  - filtert die Rückgabe.
  - gibt alle Presentations zum angegebenen Kurs&Semester zurück.

### POST /presentations

**Info**: Erzeugt eine neue **konkrete** Vorlesung (bzw. eine Anfrage an einen Dozenten).

Body der Anfrage:

```js
{
    "lecture_id": 0, // Bspw. "1"
    "lecturer_id": 0, // Bspw. "1"
    "academicRecord_id": 0, // Bspw. "1"
    "semester_id": 0, // Bspw. "1"
    "course_id": 0, // Bspw. "1"
    "status": "[STATUS]" // Bspw. "Dozent offen", "Dozent angeschrieben", ...
}
```

### PUT /presentations?presentationId={ID}

**Info**: Aktualisiert die Vorlesung bzw. den Status der Dozentenanfrage mit der angegebenen `presentation_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:

```js
{
    "lecture_id": 0, // Bspw. "1"
    "lecturer_id": 0, // Bspw. "1"
    "academicRecord_id": 0, // Bspw. "1"
    "semester_id": 0, // Bspw. "1"
    "course_id": 0, // Bspw. "1"
    "status": "[STATUS]" // Bspw. "Dozent offen", "Dozent angeschrieben", ...
}
```

### DELETE /presentations?presentationId={ID}

**Info**: Löscht die Vorlesung mit der angegebenen `presentation_id` `{ID}`.

## /academicRecords

### GET /academicRecords

**Info**: Gibt alle Prüfungsleistungen zurück.

Rückgabe:

```js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "AcademicRecords": [
            {
                "academicRecord_id": 0 // Bspw. "1"
                "abbreviation": "[ABKÜRZUNG]", // Bspw. "K, SE"
                "type": "[TYP]", // Bspw. "Klausur"
                "rated": TRUE // Bspw. "TRUE/FALSE"
            }
        ]
    }
}
```

### POST /academicRecords

**Info**: Erzeugt eine neue Prüfungsleistung.

Body der Anfrage:

```js
{
    "abbreviation": "[ABKÜRZUNG]", // Bspw. "K, SE"
    "type": "[TYP]", // Bspw. "Klausur"
    "rated": TRUE // Bspw. "TRUE/FALSE
}
```

### PUT /academicRecords?academicRecordId={ID}

**Info**: Aktualisiert die Prüfungsleistung `academicRecord_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:

```js
{
    "abbreviation": "[ABKÜRZUNG]", // Bspw. "K, SE"
    "type": "[TYP]", // Bspw. "Klausur"
    "rated": TRUE // Bspw. "TRUE/FALSE
}
```

### DELETE /academicRecords?academicRecordId={ID}

**Info**: Löscht eine Prüfungsleistung.

## /modulecatalog

### GET /modulecatalog?majorSubjectId={ID}

**Info**: Gibt alle Modulkataloge zu einer angegebenen Studienrichtung (innerhalb eines Studiengangs) zurück.
Dies umfasst also die Modulgruppen, die Module und die (abstrakten) Vorlesungen.

Rückgabe:

```js
{
    "message": "[DEBUG-INFO/KOMMENTAR]", // Bspw. "Successful", "Failed", ...
    "payload": {
        "FieldOfStudy": {
            "fieldOfStudy_id": 0, // Bspw. "1"
            "name": "[STUDIENGANG]" // Bspw. "Wirtschaftsinformatik"
        },
        "MajorSubject": {
            "majorSubject_id": 0, // Bspw. "1"
            "name": "[NAME]", // Bspw. "Software Engineering"
            "catalog_effective_from": "[CATALOG_EFFECTIVE_FROM]" // Bspw. "Gültig ab 2018"
        },
        "ModuleGroups": [
            {
                "moduleGroup_id": 0, // Bspw. "1"
                "name": "[NAME]", // Bspw. "Profil I"
                "number_of_modules_to_attend": 0, // Bspw. "1"
                "from_semester_number": 0, // Bspw. "1"
                "to_semester_number": 0, // Bspw. "2"
                "Modules": [
                    "module_id": 0, // Bspw. "1"
                    "name": "[NAME]", // Bspw. "Technische Grundlagen mobiler Applikationen"
                    "description": "[BESCHREIBUNG]", // Bspw. "Lorem Ipsum..."
                    "ects": 0, // Bspw. "6"
                    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_1337"
                    "number_of_lectures_to_attend": 0, // Bspw. "1"
                    "requirements": "[ANFODERUNGEN]", // Bspw. "Keine."
                    "Lectures": [
                        {
                            "name": "[NAME]", // Bspw. "Netzwerk- und Betriebssystemstrukturen für mobile Applikationen"
                            "workload_home": "[SELBSTSTUDIUM]", // Bspw. "57 Stunden"
                            "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "33 Stunden"
                            "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_301.2"
                            "MainFocuses": [
                                {
                                    "mainFocus_id": 0, // Bspw. "1"
                                    "name": "[THEMENGEBIET]" // Bspw. "Unternehmensführung"
                                }
                            ]
                        }
                    ],
                    "AcademicRecords": [
                        {
                            "academicRecord_id": 0, // Bspw. "1"
                            "abbreviation": "[ABKÜRZUNG]", // Bspw. "K, SE"
                            "type": "[TYP]", // Bspw. "Klausur"
                            "rated": TRUE // Bspw. "TRUE/FALSE
                        }
                    ]
                ]
            }
        ]
    }
}
```

## /moduleGroups

### POST /moduleGroups

**Info**: Erzeugt eine neue Modulgruppe (inklusive der dazugehörigen Module sowie abstrakten Vorlesungen).

Body der Anfrage:

```js
{
    "majorSubject_id": 0, // Bspw. "1"
    "name": "[NAME]", // Bspw. "Profil I"
    "number_of_modules_to_attend": 0, // Bspw. "1"
    "from_semester_number": 0, // Bspw. "1"
    "to_semester_number": 0, // Bspw. "2"
    "Modules": [
        {
            "name": "[NAME]", // Bspw. "Technische Grundlagen mobiler Applikationen"
            "description": "[BESCHREIBUNG]", // Bspw. "Lorem Ipsum..."
            "ects": 0, // Bspw. "6"
            "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_1337"
            "academicRecord_ids": [ 0, 0 ], // Bspw. "[1]" oder "[1, 2]" - mögliche Bewertungsverfahren
            "number_of_lectures_to_attend": 0, // Bspw. "1"
            "requirements": "[ANFODERUNGEN]", // Bspw. "Keine."
            "Lectures": [
                {
                    "name": "[NAME]", // Bspw. "Marketing"
                    "workload_home": "[SELBSTSTUDIUM]", // Bspw. "36 Stunden"
                    "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "24 Stunden"
                    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_301.2"
                    "mainFocus_ids": [0, 0] // Bspw. [1, 2]
                }
            ]
        }
    ]
}
```

### PUT /moduleGroups?moduleGroupId={ID}

**Info**: Aktualisiert eine Modulgruppe eines Modulkatalogs mit der `moduleGroup_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:

```js
{
    "majorSubject_id": 0, // Bspw. "1"
    "name": "[NAME]", // Bspw. "Profil I"
    "number_of_modules_to_attend": 0, // Bspw. "1"
    "from_semester_number": 0, // Bspw. "1"
    "to_semester_number": 0, // Bspw. "2"
    "Modules": [
        {
            "module_id": 0, // Bspw. "1"
            "name": "[NAME]", // Bspw. "Technische Grundlagen mobiler Applikationen"
            "description": "[BESCHREIBUNG]", // Bspw. "Lorem Ipsum..."
            "ects": 0, // Bspw. "6"
            "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_1337"
            "academicRecord_ids": [ 0, 0 ], // Bspw. "[1]" oder "[1, 2]" - mögliche Bewertungsverfahren
            "number_of_lectures_to_attend": 0, // Bspw. "1"
            "requirements": "[ANFODERUNGEN]", // Bspw. "Keine."
            "Lectures": [
                {
                    "lecture_id": 0, // Bspw. "1"
                    "name": "[NAME]", // Bspw. "Marketing"
                    "workload_home": "[SELBSTSTUDIUM]", // Bspw. "36 Stunden"
                    "workload_dhbw": "[PRÄSENZZEIT]", // Bspw. "24 Stunden"
                    "catalog_id": "[KATALOG-ID]", // Bspw. "WWISE_301.2"
                    "mainFocus_ids": [ 0, 0 ] // Bspw. ["1"]
                }
            ]
        }
    ]
}
```

### DELETE /moduleGroups?moduleGroupId={ID}

**Info**: Löscht die Modulgruppe mit der angegebenen `moduleGroup_id` `{ID}` (inklusive der dazugehörigen Module sowie abstrakten Vorlesungen).
