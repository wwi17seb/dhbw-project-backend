# /presentations <!-- omit in toc -->

- [GET /presentations](#get-presentations)
  - [Rückgabe - GET /presentations](#rückgabe---get-presentations)
  - [Attribute der Anfrage - GET /presentations](#attribute-der-anfrage---get-presentations)
  - [Optionale Parameter /presentations](#optionale-parameter-presentations)
    - [Rückgabe mit Queryparameter `getCoLecturers=true`](#rückgabe-mit-queryparameter-getcolecturerstrue)
- [POST /presentations](#post-presentations)
  - [Body der Anfrage - POST /presentations](#body-der-anfrage---post-presentations)
  - [Attribute der Anfrage - POST /presentations](#attribute-der-anfrage---post-presentations)
  - [Rückgabe - POST /presentations](#rückgabe---post-presentations)
- [PUT /presentations?presentationId={ID}](#put-presentationspresentationidid)
  - [Body der Anfrage - PUT /presentations?presentationId={ID}](#body-der-anfrage---put-presentationspresentationidid)
  - [Attribute der Anfrage - PUT /presentations?presentationId={ID}](#attribute-der-anfrage---put-presentationspresentationidid)
  - [Rückgabe - PUT /presentations?presentationId={ID}](#rückgabe---put-presentationspresentationidid)
- [DELETE /presentations?presentationId={ID}](#delete-presentationspresentationidid)
  - [Rückgabe - DELETE /presentations?presentationId={ID}](#rückgabe---delete-presentationspresentationidid)

## GET /presentations

**Info**: Gibt alle **konkreten** Vorlesungen (inkl. der noch in Planung befindlichen) zurück. Über `courseId` wird dies auf einen Kurs beschränkt und über `lecturerId` können alle **konkreten** Vorlesungen eines Dozenten gefunden werden.
Es müssen entweder `courseId` oder `lecturerId` angegeben werden. Es können nicht beide Filter gleichzeitig verwendet werden.
Über die `courseId` werden nur Vorlesungen eines bestimmten Kurses zurückgegeben und über `lecturerId` werden Vorlesungen anhand des Dozenten gefiltert.
Das Filtern nach `courseId` funktioniert nur, wenn der angemeldete DoS auch Studiengangsleiter vom angegebenen Kurs ist (er muss die konkreten Vorlesungen nicht zwingend erstellt haben).

`GET /presentations?courseId={ID}` oder `GET /presentations?lecturerId={ID}`

### Rückgabe - GET /presentations

```json
{
    "message": "Successful",
    "payload": {
        "Presentations": [
            {
                "presentation_id": 0,
                "status": "[STATUS]",
                "createdAt": "[DATUM]",
                "updatedAt": "[DATUM]",
                "academicRecord_id": 0,
                "course_id": 0,
                "createdBy_id": 0,
                "lecture_id": 0,
                "lecturer_id": 0,
                "semester_id": 0,
                "Semester": {
                    "semester_id": 0,
                    "name": "[NAME_DES_SEMESTERS]",
                    "number": 0,
                    "start_date": "[STARTDATUM]",
                    "end_date": "[ENDDATUM]",
                    "createdAt": "[DATUM]",
                    "updatedAt": "[DATUM]",
                    "course_id": 0
                },
                "AcademicRecord": {
                    "academicRecord_id": 0,
                    "abbreviation": "[ABKÜRZUNG]",
                    "type": "[ART]",
                    "createdAt": "[DATUM]",
                    "updatedAt": "[DATUM]"
                },
                "Lecture": {
                    "lecture_id": 0,
                    "name": "[NAME_DER_VORLESUNG]",
                    "workload_home": 0,
                    "workload_dhbw": 0,
                    "catalog_id": "[KATALOG_ID]",
                    "createdAt": "[DATUM]",
                    "updatedAt": "[DATUM]",
                    "module_id": 0,
                    "MainFocuses": [
                        {
                            "mainFocus_id": 0,
                            "name": "[NAME_DES_SCHWERPUNKTS]",
                            "createdAt": "[DATUM]",
                            "updatedAt": "[DATUM]"
                        }
                    ],
                    "Module": {
                        "module_id": 0,
                        "name": "[NAME]",
                        "description": "[BESCHREIBUNG]",
                        "ects": 0,
                        "catalog_id": "[KATALOG_ID]",
                        "number_of_lectures_to_attend": 0,
                        "requirements": "[ANFORDERUNGEN]",
                        "rated": true,
                        "createdAt": "[DATUM]",
                        "updatedAt": "[DATUM]",
                        "moduleGroup_id": 0,
                        "ModuleGroup": {
                            "moduleGroup_id": 0,
                            "name": "[NAME_DER_MODULEGRUPPE]",
                            "number_of_modules_to_attend": 0,
                            "from_semester_number": 0,
                            "to_semester_number": 0,
                            "createdAt": "[DATUM]",
                            "updatedAt": "[DATUM]",
                            "majorSubject_id": 0
                        },
                        "AcademicRecords": [
                            {
                                "academicRecord_id": 0,
                                "abbreviation": "[ABKÜRZUNG]",
                                "type": "[TYP]",
                                "createdAt": "[DATUM]",
                                "updatedAt": "[DATUM]"
                            }
                        ]
                    }
                },
                "Lecturer": {
                    "lecturer_id": 0,
                    "firstname": "[VORNAME]",
                    "lastname": "[NACHNAME]",
                    "academic_title": "[AKADEMISCHER_TITEL]",
                    "email": "[E-MAIL]",
                    "salutation": "[ANREDE]",
                    "phonenumber": "[TELEFONNUMMER]",
                    "cv": "[LEBENSLAUF]",
                    "comment": "[KOMMENTAR]",
                    "possible_lectures": "[VORLESUNGEN]",
                    "is_extern": true,
                    "allow_manipulation": true,
                    "createdAt": "[DATUM]",
                    "updatedAt": "[DATUM]",
                    "createdBy_id": 0,
                    "MainFocuses": [
                        {
                            "mainFocus_id": 0,
                            "name": "[SCHWERPUNKT]",
                            "createdAt": "[DATUM]",
                            "updatedAt": "[DATUM]"
                        }
                    ]
                },
                "DirectorOfStudies": {
                    "directorOfStudies_id": 0,
                    "username": "[BENUTZERNAME]",
                    "is_admin": true,
                    "misc": "[VERSCHIEDENES]"
                },
                "createdBy": {
                    "directorOfStudies_id": 0,
                    "username": "[BENUTZERNAME]"
                }
            }
        ]
    }
}
```

### Attribute der Anfrage - GET /presentations

| Attribut                                  | Beispielwert                                        | Erklärung                                                                                                        |
| ----------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Presentations`                           | [ ]                                                 | Array von konkreten Vorlesungen                                                                                  |
| `___presentation_id`                      | 1                                                   | Eindeutige ID der konkreten Vorlesung                                                                            |
| `___status`                               | "Dozent angeschrieben"                              | Freitext zum Status der Absprache mit Dozierenden                                                                |
| `___academicRecord_id`                    | 1                                                   | Eindeutige ID der Prüfungsleistung                                                                               |
| `___course_id`                            | 1                                                   | Eindeutige ID des dazugehörigen Kurses                                                                           |
| `___createdBy_id`                         | 1                                                   | Eindeutige ID des Erstellers                                                                                     |
| `___lecture_id`                           | 1                                                   | Eindeutige ID der abstrakten Vorlesung                                                                           |
| `___lecturer_id`                          | 1                                                   | Eindeutige ID des Dozenten                                                                                       |
| `___semester_id`                          | 1                                                   | Eindeutige ID des Semesters                                                                                      |
| `___Semester`                             | { }                                                 | Objekt eines Semesters                                                                                           |
| `______semester_id`                       | 1                                                   | Eindeutige ID des Semesters                                                                                      |
| `______name`                              | WS17/18                                             | Name des Semesters                                                                                               |
| `______number`                            | 1                                                   | Nummerierung der Semester innerhalb eines Kurses                                                                 |
| `______start_date`                        | 2017-10-23                                          | Anfang des Semesters; Format: ISO 8601                                                                           |
| `______end_date`                          | 2018-02-14                                          | Ende des Semesters; Format: ISO 8601                                                                             |
| `______course_id`                         | 1                                                   | Eindeutige ID des Kurses zum Semester                                                                            |
| `___AcademicRecord`                       | { }                                                 | gewählte Prüfungsleistung                                                                                        |
| `______academicRecord_id`                 | 1                                                   | Eindeutige ID der Prüfungsleistung                                                                               |
| `______abbreviation`                      | K, SE                                               | Abkürzung der Prüfungsleistung                                                                                   |
| `______type`                              | Klausur                                             | Art der Prüfungsleistung                                                                                         |
| `___Lecture`                              | { }                                                 | Objekt der abstrakten Vorlesung                                                                                  |
| `______lecture_id`                        | 1                                                   | Eindeutige ID der abstrakten Vorlesung                                                                           |
| `______name`                              | "Betriebssystemstrukturen für mobile Applikationen" | Name der abstrakten Vorlesung                                                                                    |
| `______workload_home`                     | 1                                                   | Selbststudium; Einheit: Stunden                                                                                  |
| `______workload_dhbw`                     | 1                                                   | Präsenzstudium; Einheit: Stunden                                                                                 |
| `______catalog_id`                        | "WWISE_713.1"                                       | Kennzeichnung aus dem Modulkatalog der DHBW                                                                      |
| `______module_id`                         | 1                                                   | Eindeutige ID des Moduls                                                                                         |
| `______MainFocuses`                       | [ ]                                                 | Array von Schwerpunkten der Vorlesung                                                                            |
| `_________mainFocus_id`                   | 1                                                   | Eindeutige ID des Schwerpunktes                                                                                  |
| `_________name`                           | "Mobile Applikationen"                              | Name des Schwerpunktes                                                                                           |
| `______Module`                            | { }                                                 | Objekt eines Moduls                                                                                              |
| `_________module_id`                      | 1                                                   | Eindeutige ID des Moduls                                                                                         |
| `_________name`                           | Technische Grundlagen mobiler Applikatione          | Name des Moduls                                                                                                  |
| `_________description`                    | "Lorem Ipsum..."                                    | Beschreibung des Moduls aus dem Modulkatalog                                                                     |
| `_________ects`                           | 1                                                   | ECTS-Punkte des Moduls                                                                                           |
| `_________catalog_id`                     | "WWISE_1337"                                        | Kennzeichnung aus dem Modulkatalog der DHBW                                                                      |
| `_________number_of_lectures_to_attend`   | 1                                                   | Anzahl Vorlesungen, die im Rahmen des Moduls besucht werden müssen                                               |
| `_________requirements`                   | "Software Engineering 1"                            | Freitext, Für Teilnahme an Vorlesung benötigte Grundlagen bzw. Vorwissen                                         |
| `_________rated`                          | true / false                                        | Benotung                                                                                                         |
| `_________moduleGroup_id`                 | 1                                                   | Eindeutige ID der Modulgruppe                                                                                    |
| `_________ModuleGroup`                    | { }                                                 | Objekt einer Modulgruppe                                                                                         |
| `____________moduleGroup_id`              | 1                                                   | Eindeutige ID der Modulgruppe                                                                                    |
| `____________name`                        | "Profil 1"                                          | Name der Modulgruppe                                                                                             |
| `____________number_of_modules_to_attend` | 1                                                   | Anzahl Module, die im Rahmen der Modulgruppe besucht werden müssen                                               |
| `____________from_semester_number`        | 1                                                   | Zeitfenster, in welchen Semestern die Modulgruppe angelegt werden muss                                           |
| `____________to_semester_number`          | 1                                                   | Zeitfenster, in welchen Semestern die Modulgruppe angelegt werden muss                                           |
| `____________majorSubject_id`             | 1                                                   | Eindeutige ID des Schwerpunktes                                                                                  |
| `______AcademicRecords`                   | [ ]                                                 | Array der Prüfungsleistungen                                                                                     |
| `_________academicRecord_id`              | 1                                                   | Eindeutige ID der Prüfungsleistung                                                                               |
| `_________abbreviation`                   | "K", "SE"                                           | Abkürzung der Prüfungsleistung                                                                                   |
| `_________type`                           | "Klausur"                                           | Art der Prüfungsleistung                                                                                         |
| `___Lecturer`                             | { }                                                 | Objekt eines Dozierenden                                                                                         |
| `______lecturer_id`                       | 1                                                   | Eindeutige ID des Dozierenden                                                                                    |
| `______firstname`                         | "Sebastian"                                         | Vorname des Dozierenden                                                                                          |
| `______lastname`                          | "Ritterbusch"                                       | Nachname des Dozierenden                                                                                         |
| `______academic_title`                    | "Prof. Dr."                                         | akademischer Titel des Dozierenden                                                                               |
| `______email`                             | "sebastian.ritterbusch@dhbw-mannheim.de"            | E-Mail des Dozierenden                                                                                           |
| `______salutation`                        | "Herr"                                              | Anrede des Dozierenden                                                                                           |
| `______phonenumber`                       | "+49 621 4105 - 1724"                               | Telefonnummer des Dozierenden                                                                                    |
| `______cv`                                | ""                                                  | zur Zeit nur als string möglich; wird angepasst und nachgereicht                                                 |
| `______comment`                           | "Sehr engagiert"                                    | Freitext, kann durch Front-End ebenfalls als JSON-Objekt im Stringformat gespeichert werden (`JSON.stringify()`) |
| `______possible_lectures`                 | "Mathematik, Podcasts, ..."                         | Freitext, beinhaltet Vorlesungen, die der Dozierende halten könnte                                               |
| `______is_extern`                         | false                                               | Gibt an, ob ein Dozent extern ist - false = intern, true = extern                                                |
| `______allow_manipulation`                | true                                                | Gibt an, ob ein Dozent von **allen** Studiengangsleitern bearbeitbar ist                                         |
| `______createdBy_id`                      | 1                                                   | ID des Users, der zuletzt den Dozenten verändert hat                                                             |
| `______MainFocuses`                       | [ ]                                                 | Array von Schwerpunkten des Dozierenden                                                                          |
| `_________mainFocus_id`                   | 1                                                   | Eindeutige ID des Schwerpunktes                                                                                  |
| `_________name`                           | Software Engineering                                | Name des Schwerpunktes                                                                                           |
| `___DirectorOfStudies`                    | { }                                                 | aktuell angemeldeter Studiengangsleiter                                                                          |
| `______directorOfStudies_Id`              | 1                                                   | Eindeutige ID des Studiengangsleiters                                                                            |
| `______username`                          | Admin                                               | Benutzername des Studiengangleiters                                                                              |
| `______isAdmin`                           | true / false                                        | Boolean ob Nutzer Studiengangleiters ein administrator ist                                                       |
| `______misc`                              | VERSCHIEDENES - JSON                                | Freitext, wird als String im JSON-Format gespeichert                                                             |
| `___createdBy`                            | { }                                                 | Objekt createdByErstellt von Studiengangsleiter                                                                  |
| `______directorOfStudies_id`              | 1                                                   | Eindeutige ID des Studiengangsleiters                                                                            |
| `______username`                          | "jreichwald"                                        | Nutzername des Studiengangsleiters                                                                               |

### Optionale Parameter /presentations

- `semesterId`
  - filtert die Rückgabe
  - filtert Anfragen die `courseId` nutzen
  - gibt alle Presentations zum angegebenen Kurs&Semester zurück.
- `getCoLecturers`
  - gemeinsam mit `lecturerId`
  - fügt Rückgabe weitere Felder hinzu
  - fügt ein Array der Mit-Dozenten (Co-Lecturers) an Präsentationen, die von mehreren Dozenten gleichzeitig gehalten werden, an

#### Rückgabe mit Queryparameter `getCoLecturers=true`

Sofern `getCoLecturers` angefordert wird, werden alle Dozierenden, welche die gleiche Vorlesung, im gleichen Kurs halten, ausgegeben.
Der Wert von `getCoLecturers` ist dabei egal (wenn er _truthy_ ist, werden weitere Dozenten ausgegeben).
Ein Filtern nach `status`, sodass nur Co-Lecturer von tatsächlich gehaltenen Vorlesungen angezeigt werden, muss im Front-End erfolgen (alternativ kann der Status angezeigt werden, sodass der Benutzer eine entsprechende Einschätzung vornehmen kann).
Dabei hat die Presentation, wie oben beschrieben, selbst einen `status`, der sich auf den gesuchten Dozenten bezieht.
Für jeden Co-Lecturer gibt es nochmal einen `status`, der sich jeweils auf diesen bzw. diese Presentation bezieht.
Für weitere Infos über Dozierende siehe [Dozierenden-Doku](lecturers.md).

```json
{
    "CoLecturers": [
        {
            "status": "[STATUS]",
            "lecturer_id": 0,
            "firstname": "[VORNAME]",
            "lastname": "[NACHNAME]",
            "academic_title": "[AKADEMISCHER_TITEL]",
            "salutation": "[ANREDE]",
            "is_extern": true,
        }
    ]
}
```

## POST /presentations

**Info**: Erzeugt eine neue **konkrete** Vorlesung (bzw. eine Anfrage an einen Dozenten).

### Body der Anfrage - POST /presentations

```json
{
    "lecture_id": 0,
    "lecturer_id": 0,
    "academicRecord_id": 0,
    "semester_id": 0,
    "course_id": 0,
    "status": "[STATUS]"
}
```

### Attribute der Anfrage - POST /presentations

| Attribut            | Erfodert | Beispielwert                                  | Erklärung                                         |
| ------------------- | -------- | --------------------------------------------- | ------------------------------------------------- |
| `lecture_id`        | ja       | 1                                             | Eindeutige ID der dazugehörigen Lecture           |
| `lecturer_id`       | ja       | 1                                             | Eindeutige ID des dazugehörigen Dozierenden       |
| `academicRecord_id` | ja       | 1                                             | Eindeutige ID der Prüfungsleistung                |
| `semester_id`       | ja       | 1                                             | Eindeutige ID des dazugehörigen Semesters         |
| `course_id`         | ja       | 1                                             | Eindeutige ID des dazugehörigen Kurses            |
| `status`            | nein     | "Dozent offen", "Dozentin angeschrieben", ... | Freitext zum Status der Absprache mit Dozierenden |

### Rückgabe - POST /presentations

```json
{
    "message": "Successfully created",
    "payload": {
        "presentation_id": 0,
        "course_id": 0,
        "semester_id": 0,
        "academicRecord_id": 0,
        "lecture_id": 0,
        "lecturer_id": 0,
        "status": "[STATUS]",
        "createdBy_id": 0,
        "updatedAt": "[DATUM]",
        "createdAt": "[DATUM]"
    }
}
```

## PUT /presentations?presentationId={ID}

**Info**: Aktualisiert die Vorlesung bzw. den Status der Dozentenanfrage mit der angegebenen `presentation_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

### Body der Anfrage - PUT /presentations?presentationId={ID}

```json
{
    "lecture_id": 0,
    "lecturer_id": 0,
    "academicRecord_id": 0,
    "semester_id": 0,
    "course_id": 0,
    "status": "[STATUS]"
}
```

### Attribute der Anfrage - PUT /presentations?presentationId={ID}

| Attribut            | Erfodert | Beispielwert                                  | Erklärung                               |
| ------------------- | -------- | --------------------------------------------- | --------------------------------------- |
| `lecture_id`        | ja       | 0                                             | Eindeutige ID der Vorlesung             |
| `lecturer_id`       | ja       | "Software Engineering"                        | Eindeutige ID des Dozenten              |
| `academicRecord_id` | ja       | 1                                             | Eindeutige ID der Prüfungsleistung      |
| `semester_id`       | ja       | 1                                             | Eindeutige ID des Semesters             |
| `course_id`         | ja       | 1                                             | Eindeutige ID des dazugehörigen Kurses  |
| `status`            | nein     | "Dozent offen", "Dozentin angeschrieben", ... | Freitext, aktueller Stand der Vorlesung |

### Rückgabe - PUT /presentations?presentationId={ID}

```json
{
    "message": "Successfully updated",
    "payload": true
}
```

## DELETE /presentations?presentationId={ID}

**Info**: Löscht die Vorlesung mit der angegebenen `presentation_id` `{ID}`.

### Rückgabe - DELETE /presentations?presentationId={ID}

```json
{
    "message": "Successfully deleted",
    "payload": true
}
```
