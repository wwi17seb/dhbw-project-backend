# /fieldsOfStudy <!-- omit in toc -->

- [GET /fieldsOfStudy](#get-fieldsofstudy)
  - [Rückgabe - GET /fieldsOfStudy](#rückgabe---get-fieldsofstudy)
  - [Attribute der Anfrage GET /fieldOfStudy](#attribute-der-anfrage-get-fieldofstudy)
  - [Optionale Parameter /fieldsOfStudy](#optionale-parameter-fieldsofstudy)
    - [Rückgabe - GET /fieldsOfStudy?withMajorSubjects=true](#rückgabe---get-fieldsofstudywithmajorsubjectstrue)
    - [Zusätzliche Attribute der Anfrage GET /fieldOfStudy?withMajorSubjects=true](#zusätzliche-attribute-der-anfrage-get-fieldofstudywithmajorsubjectstrue)
- [POST /fieldsOfStudy](#post-fieldsofstudy)
  - [Body der Anfrage - POST /fieldsOfStudy](#body-der-anfrage---post-fieldsofstudy)
  - [Attribute der Anfrage - POST /fieldsOfStudy](#attribute-der-anfrage---post-fieldsofstudy)
  - [Rückgabe - POST /fieldOfStudy](#rückgabe---post-fieldofstudy)
- [PUT /fieldsOfStudy?fieldOfStudyId={ID}](#put-fieldsofstudyfieldofstudyidid)
  - [Body der Anfrage - PUT /fieldsOfStudy?fieldOfStudyId={ID}](#body-der-anfrage---put-fieldsofstudyfieldofstudyidid)
  - [Attribute der Anfrage - PUT /fieldsOfStudy?fieldOfStudyId={ID}](#attribute-der-anfrage---put-fieldsofstudyfieldofstudyidid)
  - [Rückgabe - PUT /fieldsOfStudy?fieldOfStudyId={ID}](#rückgabe---put-fieldsofstudyfieldofstudyidid)
- [DELETE /fieldsOfStudy?fieldOfStudyId={ID}](#delete-fieldsofstudyfieldofstudyidid)
  - [Rückgabe - DELETE /fieldsOfStudy?fieldOfStudyId={ID}](#rückgabe---delete-fieldsofstudyfieldofstudyidid)

## GET /fieldsOfStudy

**Info**: Gibt alle Studiengänge zurück.

### Rückgabe - GET /fieldsOfStudy

```json
{
    "message": "Successful",
    "payload": {
        "FieldsOfStudy": [
            {
                "fieldOfStudy_id": 0,
                "name": "[STUDIENGANG]",
                "createdAt": "[DATUM]",
                "updatedAt": "[DATUM]"
            }
        ]
    }
}
```

### Attribute der Anfrage GET /fieldOfStudy

| Attribut             | Beispielwert            | Erklärung                      |
| -------------------- | ----------------------- | ------------------------------ |
| `FieldsOfStudy`      | [ ]                     | Array der Studiengänge         |
| `___fieldOfStudy_id` | 1                       | Eindeutige ID des Studiengangs |
| `___name`            | "Wirtschaftsinformatik" | Name des Studiengangs          |

### Optionale Parameter /fieldsOfStudy

-   `withMajorSubjects`
    -   sofern `true` werden hier die Studienrichtungen mitübergeben.

#### Rückgabe - GET /fieldsOfStudy?withMajorSubjects=true

```json
{
    "message": "[DEBUG-INFO/KOMMENTAR]",
    "payload": {
        "FieldsOfStudy": [
            {
                "fieldOfStudy_id": 0,
                "name": "[STUDIENGANG]",
                "createdAt": "[DATUM]",
                "updatedAt": "[DATUM]",
                "MajorSubjects": [
                    {
                        "majorSubject_id": 0,
                        "name": "[STUDIENRICHTUNG]",
                        "catalog_effective_from": "[CATALOG_EFFECTIVE_FROM]",
                        "createdAt": "[DATUM]",
                        "updatedAt": "[DATUM]",
                        "fieldOfStudy_id": 0
                    }
                ]
            }
        ]
    }
}
```

#### Zusätzliche Attribute der Anfrage GET /fieldOfStudy?withMajorSubjects=true

| Attribut                    | Beispielwert            | Erklärung                                                                                         |
| --------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------- |
| `MajorSubjects`             | [ ]                     | Array der Studienrichtungen                                                                       |
| `___majorSubject_id`        | 1                       | Eindeutige ID der Studienrichtung                                                                 |
| `___name`                   | "Wirtschaftsinformatik" | Name des Studiengangs                                                                             |
| `___catalog_effective_from` | "2018"                  | Freitext (kann im Front-End auch als Zahl genutzt werden, wird allerdings als String gespeichert) |
| `___fieldOfStudy_id`        | 1                       | Eindeutige ID des Studiengangs                                                                    |

## POST /fieldsOfStudy

**Info**: Erstellt einen Studiengang.

### Body der Anfrage - POST /fieldsOfStudy

```json
{
    "name": "[STUDIENGANG]"
}
```

### Attribute der Anfrage - POST /fieldsOfStudy

| Attribut | Erfodert | Beispielwert            | Erklärung             |
| -------- | -------- | ----------------------- | --------------------- |
| `name`   | ja       | "Wirtschaftsinformatik" | Name des Studiengangs |

### Rückgabe - POST /fieldOfStudy

```json
{
    "message": "Successfully created",
    "payload": {
        "fieldOfStudy_id": 0,
        "name": "[STUDIENGANG]",
        "updatedAt": "[DATUM]",
        "createdAt": "[DATUM]"
    }
}
```

## PUT /fieldsOfStudy?fieldOfStudyId={ID}

**Info**: Aktualisiert den Studiengang mit der angegebenen `fieldOfStudy_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

### Body der Anfrage - PUT /fieldsOfStudy?fieldOfStudyId={ID}

```json
{
    "name": "[STUDIENGANG]"
}
```

### Attribute der Anfrage - PUT /fieldsOfStudy?fieldOfStudyId={ID}

| Attribut | Erfodert | Beispielwert            | Erklärung             |
| -------- | -------- | ----------------------- | --------------------- |
| `name`   | ja       | "Wirtschaftsinformatik" | Name des Studiengangs |

### Rückgabe - PUT /fieldsOfStudy?fieldOfStudyId={ID}

```json
{
    "message": "Successfully updated",
    "payload": true
}
```

## DELETE /fieldsOfStudy?fieldOfStudyId={ID}

**Info**: Löscht den Studiengang mit der angegebenen `fieldOfStudy_id` `{ID}`.

### Rückgabe - DELETE /fieldsOfStudy?fieldOfStudyId={ID}

```json
{
    "message": "Successfully deleted",
    "payload": true
}
```
