# /courses <!-- omit in toc -->

- [GET /courses](#get-courses)
  - [Rückgabe - GET /courses](#rückgabe---get-courses)
  - [Attribute der Rückgabe - GET /courses](#attribute-der-rückgabe---get-courses)
- [POST /courses](#post-courses)
  - [Body der Anfrage - POST /courses](#body-der-anfrage---post-courses)
  - [Attribute der Anfrage - POST /courses](#attribute-der-anfrage---post-courses)
  - [Rückgabe - POST /courses](#rückgabe---post-courses)
- [PUT /courses?courseId={ID}](#put-coursescourseidid)
  - [Body der Anfrage - PUT /courses?courseId={ID}](#body-der-anfrage---put-coursescourseidid)
  - [Attribute der Anfrage - PUT /courses?courseId={ID}](#attribute-der-anfrage---put-coursescourseidid)
  - [Rückgabe - PUT /courses?courseId={ID}](#rückgabe---put-coursescourseidid)
- [DELETE /courses?courseId={ID}](#delete-coursescourseidid)
  - [Rückgabe - DELETE /courses?courseId={ID}](#rückgabe---delete-coursescourseidid)

## GET /courses

**Info**: Gibt alle zum aktuell angemeldeten Studiengangsleiter vorhandenen Kurse zurück.

### Rückgabe - GET /courses

```json
{
  "message": "Successful",
  "payload": {
    "Courses": [
      {
        "course_id": 0,
        "name": "[NAME_DES_KURSES]",
        "google_calendar_id": "[GOOGLE_KALENDER_ID]",
        "createdAt": "[DATUM]",
        "updatedAt": "[DATUM]",
        "majorSubject_id": 0,
        "DirectorsOfStudies": [
          {
            "directorOfStudies_id": 0,
            "username": "[NAME]",
            "is_admin": true
          }
        ],
        "MajorSubject": {
          "majorSubject_id": 0,
          "name": "[STUDIENGANG]",
          "catalog_effective_from": "[GÜLTIG_AB]",
          "createdAt": "[DATUM]",
          "updatedAt": "[DATUM]",
          "fieldOfStudy_id": 0,
          "FieldOfStudy": {
            "fieldOfStudy_id": 0,
            "name": "[STUDIENRICHTUNG]",
            "createdAt": "2020-06-17T19:29:19.048Z",
            "updatedAt": "2020-06-17T19:29:19.048Z"
          }
        },
        "Semesters": [
          {
            "semester_id": 0,
            "name": "[NAME_DES_SEMESTERS]",
            "number": 0,
            "start_date": "[STARTDATUM]",
            "end_date": "[ENDDATUM]",
            "createdAt": "[DATUM]",
            "updatedAt": "[DATUM]",
            "course_id": 0
          }
        ]
      }
    ]
  }
}
```

### Attribute der Rückgabe - GET /courses

| Attribut                    | Beispielwert                                                                                 | Erklärung                                                                                         |
| --------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `Courses`                   | [ ]                                                                                          | Array von Kursen                                                                                  |
| `course_id`                 | 1                                                                                            | Eindeutige ID eines Kurses                                                                        |
| `name`                      | "WWI 17 SE B"                                                                                | Name des Kurses                                                                                   |
| `google_calendar_id`        | "13123AbcGoogle"                                                                             | Kennzeichner des Google-Kalenders                                                                 |
| `majorSubject_id`           | 1                                                                                            | Eindeutige ID einer Studienrichtung                                                               |
| `DirectorOfStudies`         | { }                                                                                          | Objekt eines Studiengangleiters                                                                   |
| `___directorOfStudies_id`   | 1                                                                                            | Eindeutige ID des Studiengangleiters                                                              |
| `___username`               | "ritterbusch"                                                                                | Name des Studiengangleiters                                                                       |
| `___is_admin`               | "{ \"email-template\": \"blablabla, was auch immer ihr wollt, könnt ihr hier speichern.\"}\" | Freitext, kann als String im JSON-Format gespeichert werden                                       |
| `MajorSubject`              | { }                                                                                          | Objekt einer Studienrichtung                                                                      |
| `___majorSubject_id`        | 1                                                                                            | Eindeutige ID einer Studienrichtung                                                               |
| `___name`                   | "Software Engineering"                                                                       | Name der Studienrichtung                                                                          |
| `___catalog_effective_from` | "2018"                                                                                       | Freitext (kann im Front-End auch als Zahl genutzt werden, wird allerdings als String gespeichert) |
| `___FieldOfStudy`           | { }                                                                                          | Objekt eines Studiengangs                                                                         |
| `______fieldOfStudy_id`     | 1                                                                                            | Eindeutige ID eines Studiengangs                                                                  |
| `______name`                | "Wirtschaftsinformatik"                                                                      | Name des Studiengangs                                                                             |
| `___Semesters`              | [ ]                                                                                          | Array von Semestern                                                                               |
| `______semester_id`         | 1                                                                                            | Eindeutige ID des Semesters                                                                       |
| `______name`                | "WS 17/18"                                                                                   | Freitext, Format: Winter/Sommersemester + Jahr(e)                                                 |
| `______number`              | 1                                                                                            | Nummer des Semesters (erstes Semester, ...)                                                       |
| `______start_date`          | "2017-10-23"                                                                                 | Startdatum; Format: ISO 8601                                                                      |
| `______end_date`            | "2017-10-23"                                                                                 | Enddatum; Format: ISO 8601                                                                        |
| `______course_id`           | 1                                                                                            | Eindeutige ID des Kurses, zu welchem das Semester gehört                                          |

## POST /courses

**Info**: Erzeugt einen neuen Kurs beim angegebenen Studiengangsleiter.

### Body der Anfrage - POST /courses

```json
{
  "name": "[NAME_DES_KURSES]",
  "google_calendar_id": "[GOOGLE_KALENDER_ID]",
  "majorSubject_id": 0,
  "directorOfStudies_ids": [0, 0],
  "Semesters": [
    {
      "name": "[NAME_DES_SEMESTERS]",
      "number": 0,
      "start_date": "[STARTDATUM]",
      "end_date": "[ENDDATUM]"
    }
  ]
}
```

### Attribute der Anfrage - POST /courses

| Attribut                | Erfodert | Beispielwert     | Erklärung                                                                                               |
| ----------------------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| `name`                  | ja       | "WWI 17 SEB"     | Name des Kurses                                                                                         |
| `google_calendar_id`    | nein     | "13123AbcGoogle" | Kennzeichner des Google-Kalenders                                                                       |
| `majorSubject_id`       | ja       | 1                | Eindeutige ID einer Studienrichtung                                                                     |
| `directorOfStudies_ids` | nein     | [0, 1]           | Eigene ID wird automatisch gesetzt, hier können optional weitere verantwortliche DoS hinzugefügt werden |
| `Semesters`             | nein     | [ ]              | Array von Semestern                                                                                     |
| `___name`               | ja       | "WS17/18"        | Freitext, Format: Winter/Sommersemester + Jahr(e)                                                       |
| `___number`             | ja       | 0                | Nummer des Semesters (erstes Semester, ...)                                                             |
| `___start_date`         | ja       | "2018-05-07"     | Startdatum; Format: ISO 8601                                                                            |
| `___end_date`           | ja       | "2018-08-03"     | Enddatum; Format: ISO 8601                                                                              |

### Rückgabe - POST /courses

```json
{
  "message": "Successfully created.",
  "payload": {
    "course_id": 0,
    "name": "[NAME_DES_KURSES]",
    "majorSubject_id": 0,
    "google_calendar_id": "[GOOGLE_KALENDER_ID]",
    "Semesters": [
      {
        "semester_id": 0,
        "name": "[NAME_DES_SEMESTERS]",
        "number": 0,
        "start_date": "[DATUM]",
        "end_date": "[DATUM]",
        "course_id": 0,
        "updatedAt": "[DATUM]",
        "createdAt": "[DATUM]"
      }
    ],
    "updatedAt": "[DATUM]",
    "createdAt": "[DATUM]"
  }
}
```

## PUT /courses?courseId={ID}

**Info**: Aktualisiert den angegebenen Kurs.
`{ID}` ist dabei die `course_id`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.
Semester können über die Route [PUT /semesters?semesterId={ID}](#put-semesterssemesteridid) aktualisiert werden.

### Body der Anfrage - PUT /courses?courseId={ID}

```json
{
  "name": "[NAME_DES_KURSES]",
  "google_calendar_id": "[GOOGLE_KALENDER_ID]",
  "majorSubject_id": 0,
  "directorOfStudies_ids": [0, 0]
}
```

### Attribute der Anfrage - PUT /courses?courseId={ID}

| Attribut                | Erfodert | Beispielwert     | Erklärung                                                                                               |
| ----------------------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| `name`                  | ja       | "WWI 17 SEB"     | Name des Kurses                                                                                         |
| `google_calendar_id`    | nein     | "13123AbcGoogle" | Kennzeichner des Google-Kalenders                                                                       |
| `majorSubject_id`       | ja       | 1                | Eindeutige ID einer Studienrichtung                                                                     |
| `directorOfStudies_ids` | nein     | [0, 1]           | Eigene ID wird automatisch gesetzt, hier können optional weitere verantwortliche DoS hinzugefügt werden |

### Rückgabe - PUT /courses?courseId={ID}

```json
{
  "message": "Successfully updated",
  "payload": true
}
```

## DELETE /courses?courseId={ID}

**Info**: Löscht den angegebenen Kurs mit der `course_id` `{ID}`, sofern man selbst Studiengangsleiter ist.

### Rückgabe - DELETE /courses?courseId={ID}

```json
{
  "message": "Successfully deleted",
  "payload": true
}
```
