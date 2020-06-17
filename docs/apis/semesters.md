# /semesters <!-- omit in toc -->

- [POST /semesters](#post-semesters)
  - [Body der Anfrage - POST /semesters](#body-der-anfrage---post-semesters)
  - [Attribute der Anfrage - POST /semesters](#attribute-der-anfrage---post-semesters)
  - [Rückgabe - POST /semesters](#rückgabe---post-semesters)
- [PUT /semesters?semesterId={ID}](#put-semesterssemesteridid)
  - [Body der Anfrage - PUT /semesters?semesterId={ID}](#body-der-anfrage---put-semesterssemesteridid)
  - [Attribute der Anfrage - PUT /semesters?semesterId={ID}](#attribute-der-anfrage---put-semesterssemesteridid)
  - [Rückgabe - PUT /semesters?semesterId={ID}](#rückgabe---put-semesterssemesteridid)
- [DELETE /semesters?semesterId={ID}](#delete-semesterssemesteridid)
  - [Rückgabe - DELETE /semesters?semesterId={ID}](#rückgabe---delete-semesterssemesteridid)

## POST /semesters

**Info**: Erstellt einen neuen Eintrag eines Semesters zum angegebenen Kurs, sofern es in einem eigenen Kurs angelegt wird.

### Body der Anfrage - POST /semesters

```json
{
    "course_id": 0,
    "name": "[SEMESTERNAME]",
    "number": 0,
    "start_date": "[STARTDATUM]",
    "end_date": "[ENDDATUM]"
}
```

### Attribute der Anfrage - POST /semesters

| Attribut     | Erfodert | Beispielwert | Erklärung                                         |
| ------------ | -------- | ------------ | ------------------------------------------------- |
| `course_id`  | ja       | 1            | Eindeutige ID eines Kurses                        |
| `name`       | ja       | "SS18"       | Freitext, Format: Winter/Sommersemester + Jahr(e) |
| `number`     | ja       | 2            | Nummer des Semesters (erstes Semester, ...)       |
| `start_date` | ja       | "2018-05-07" | Startdatum; Format: ISO 8601                      |
| `end_date`   | ja       | "2018-08-03" | Enddatum; Format: ISO 8601                        |

### Rückgabe - POST /semesters

````json
{
    "message": "Successfully created",
    "payload": {
        "semester_id": 0,
        "name": "[SEMESTERNAME]",
        "number": 0,
        "start_date": "[STARTDATUM]",
        "end_date": "[ENDDATUM]",
        "course_id": 0,
        "updatedAt": "[DATUM]",
        "createdAt": "[DATUM]"
    }
}
````

## PUT /semesters?semesterId={ID}

**Info**: Aktualisiert die Einträge eines Semesters mit angegebener `semester_id` `{ID}`, sofern das Semester Teil eines eigenen Kurses ist.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

### Body der Anfrage - PUT /semesters?semesterId={ID}

```json
{
    "course_id": 0,
    "name": "[SEMESTERNAME]",
    "number": 0,
    "start_date": "[STARTDATUM]",
    "end_date": "[ENDDATUM]"
}
```

### Attribute der Anfrage - PUT /semesters?semesterId={ID}

| Attribut     | Erfodert | Beispielwert | Erklärung                                         |
| ------------ | -------- | ------------ | ------------------------------------------------- |
| `course_id`  | ja       | 1            | Eindeutige ID eines Kurses                        |
| `name`       | ja       | "SS18"       | Freitext, Format: Winter/Sommersemester + Jahr(e) |
| `number`     | ja       | 2            | Nummer des Semesters (erstes Semester, ...)       |
| `start_date` | ja       | "2018-05-07" | Startdatum; Format: ISO 8601                      |
| `end_date`   | ja       | "2018-08-03" | Enddatum; Format: ISO 8601                        |

### Rückgabe - PUT /semesters?semesterId={ID}

```json
{
    "message": "Successfully updated",
    "payload": true
}
```

## DELETE /semesters?semesterId={ID}

**Info**: Löscht das Semester mit der angegebenen `{ID}`, sofern es zu einem eigenen Kurs gehört.

### Rückgabe - DELETE /semesters?semesterId={ID}

```json
{
    "message": "Successfully deleted",
    "payload": true
}
```
