# /majorSubjects <!-- omit in toc -->

- [GET /majorSubjects?fieldOfStudyId={ID}](#get-majorsubjectsfieldofstudyidid)
  - [Rückgabe - GET /modulecatalog?majorSubjectId={ID}](#rückgabe---get-modulecatalogmajorsubjectidid)
  - [Attribute der Anfrage - GET /majorSubjects?fieldOfStudyId={ID}](#attribute-der-anfrage---get-majorsubjectsfieldofstudyidid)
- [POST /majorSubjects](#post-majorsubjects)
  - [Body der Anfrage - POST /majorSubjects](#body-der-anfrage---post-majorsubjects)
  - [Attribute der Anfrage - POST /majorSubjects](#attribute-der-anfrage---post-majorsubjects)
  - [Rückgabe - POST /majorSubjects](#rückgabe---post-majorsubjects)
- [PUT /majorSubjects?majorSubjectId={ID}](#put-majorsubjectsmajorsubjectidid)
  - [Body der Anfrage - PUT /majorSubjects?majorSubjectId={ID}](#body-der-anfrage---put-majorsubjectsmajorsubjectidid)
  - [Attribute der Anfrage - PUT /majorSubjects?majorSubjectId={ID}](#attribute-der-anfrage---put-majorsubjectsmajorsubjectidid)
  - [Rückgabe - PUT /majorSubjects?majorSubjectId={ID}](#rückgabe---put-majorsubjectsmajorsubjectidid)
- [DELETE /majorSubjects?majorSubjectId={ID}](#delete-majorsubjectsmajorsubjectidid)
  - [Rückgabe - DELETED /majorSubjects?majorSubjectId={ID}](#rückgabe---deleted-majorsubjectsmajorsubjectidid)

## GET /majorSubjects?fieldOfStudyId={ID}

**Info**: Gibt alle Studienrichtungen zum Studiengang mit der angegebenen `fieldOfStudy_id` `{ID}` zurück. (Muss eine `{ID}` beinhalten.)

### Rückgabe - GET /modulecatalog?majorSubjectId={ID}

```json
{
    "message": "Successful",
    "payload": {
        "FieldOfStudy": {
            "fieldOfStudy_id": 0,
            "name": "[STUDIENGANG]"
        },
        "MajorSubjects": [
            {
                "majorSubject_id": 0,
                "name": "[STUDIENRICHTUNG]",
                "catalog_effective_from": "[GÜLTIG_AB]",
                "createdAt": "[DATUM]",
                "updatedAt": "[DATUM]",
                "fieldOfStudy_id": 0
            }
        ]
    }
}
```

### Attribute der Anfrage - GET /majorSubjects?fieldOfStudyId={ID}

| Attribut                    | Beispielwert            | Erklärung                                                                                         |
| --------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------- |
| `FieldsOfStudy`             | [ ]                     | Array der Studiengänge                                                                            |
| `___fieldOfStudy_id`        | 1                       | Eindeutige ID des Studiengangs                                                                    |
| `___name`                   | "Wirtschaftsinformatik" | Name des Studiengangs                                                                             |
| `MajorSubject`              | [ ]                     | Array von MajorSubjects                                                                           |
| `___majorSubject_id`        | 1                       | Eindeutige ID einer Studienrichtung                                                               |
| `___name`                   | "Software Engineering"  | Name einer Studienrichtung                                                                        |
| `___catalog_effective_from` | "2018"                  | Freitext (kann im Front-End auch als Zahl genutzt werden, wird allerdings als String gespeichert) |

## POST /majorSubjects

**Info**: Erstellt eine Studienrichtung für einen Studiengang mit angegebener `fieldOfStudy_id`.

### Body der Anfrage - POST /majorSubjects

```json
{
    "fieldOfStudy_id": 0,
    "name": "[STUDIENRICHTUNG]",
    "catalog_effective_from": "[CATALOG_EFFECTIVE_FROM]"
}
```

### Attribute der Anfrage - POST /majorSubjects

| Attribut                 | Erfodert | Beispielwert           | Erklärung                                                                                         |
| ------------------------ | -------- | ---------------------- | ------------------------------------------------------------------------------------------------- |
| `fieldOfStudy_id`        | ja       | 1                      | Eindeutige ID des Studiengangs                                                                    |
| `name`                   | ja       | "Software Engineering" | Name einer Studienrichtung                                                                        |
| `catalog_effective_from` | nein     | "2018"                 | Freitext (kann im Front-End auch als Zahl genutzt werden, wird allerdings als String gespeichert) |

### Rückgabe - POST /majorSubjects

```json
{
    "message": "Successfully created",
    "payload": {
        "majorSubject_id": 0,
        "name": "[STUDIENRICHTUNG]",
        "fieldOfStudy_id": 0,
        "updatedAt": "[DATUM]",
        "createdAt": "[DATUM]",
        "catalog_effective_from": "[CATALOG_EFFECTIVE_FROM]"
    }
}
```

## PUT /majorSubjects?majorSubjectId={ID}

**Info**: Aktualisiert die Studienrichtung mit der angegebenen `majorSubject_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

### Body der Anfrage - PUT /majorSubjects?majorSubjectId={ID}

```json
{
    "fieldOfStudy_id": 0,
    "name": "[NAME]",
    "catalog_effective_from": "[CATALOG_EFFECTIVE_FROM]"
}
```

### Attribute der Anfrage - PUT /majorSubjects?majorSubjectId={ID}

| Attribut                 | Erfodert | Beispielwert           | Erklärung                                                                                         |
| ------------------------ | -------- | ---------------------- | ------------------------------------------------------------------------------------------------- |
| `fieldOfStudy_id`        | ja       | 1                      | Eindeutige ID des Studiengangs                                                                    |
| `name`                   | ja       | "Software Engineering" | Name der Studienrichtung                                                                          |
| `catalog_effective_from` | nein     | "2018"                 | Freitext (kann im Front-End auch als Zahl genutzt werden, wird allerdings als String gespeichert) |

### Rückgabe - PUT /majorSubjects?majorSubjectId={ID}

```json
{
    "message": "Successfully updated",
    "payload": true
}
```

## DELETE /majorSubjects?majorSubjectId={ID}

**Info**: Löscht die Studienrichtung mit der angegebenen `majorSubject_id` `{ID}`.

### Rückgabe - DELETED /majorSubjects?majorSubjectId={ID}

```json
{
    "message": "Successfully deleted",
    "payload": true
}
```
