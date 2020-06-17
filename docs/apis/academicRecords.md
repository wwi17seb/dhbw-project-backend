# /academicRecords <!-- omit in toc -->

- [GET /academicRecords](#get-academicrecords)
  - [Rückgabe - GET /academicRecords](#rückgabe---get-academicrecords)
  - [Attribute der Anfrage - GET /academicRecords](#attribute-der-anfrage---get-academicrecords)
- [POST /academicRecords](#post-academicrecords)
  - [Body der Anfrage - POST /academicRecords](#body-der-anfrage---post-academicrecords)
  - [Attribute der Anfrage - POST /academicRecords](#attribute-der-anfrage---post-academicrecords)
  - [Rückgabe - POST /academicRecords](#rückgabe---post-academicrecords)
- [PUT /academicRecords?academicRecordId={ID}](#put-academicrecordsacademicrecordidid)
  - [Body der Anfrage - /academicRecords?academicRecordId={ID}](#body-der-anfrage---academicrecordsacademicrecordidid)
  - [Attribute der Anfrage - PUT /academicRecords?academicRecordId={ID}](#attribute-der-anfrage---put-academicrecordsacademicrecordidid)
  - [Rückgabe - PUT /academicRecords?academicRecordId={ID}](#rückgabe---put-academicrecordsacademicrecordidid)
- [DELETE /academicRecords?academicRecordId={ID}](#delete-academicrecordsacademicrecordidid)
  - [Rückgabe - DELETE /academicRecords?academicRecordId={ID}](#rückgabe---delete-academicrecordsacademicrecordidid)

## GET /academicRecords

**Info**: Gibt alle Prüfungsleistungen zurück.

### Rückgabe - GET /academicRecords

```json
{
    "message": "Successful",
    "payload": {
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
}
```

### Attribute der Anfrage - GET /academicRecords

| Attribut               | Beispielwert | Erklärung                            |
| ---------------------- | ------------ | ------------------------------------ |
| `AcademicRecords`      |              | Array von AcademicRecords            |
| `___academicRecord_id` | 0            | Eindeutige ID einer Prüfungsleistung |
| `___abbreviation`      | K, SE        | Abkürzung der Prüfungsleistung       |
| `___type`              | Klausur      | Art der Prüfungsleistung             |

## POST /academicRecords

**Info**: Erzeugt eine neue Prüfungsleistung.

### Body der Anfrage - POST /academicRecords

```json
{
    "abbreviation": "[ABKÜRZUNG]",
    "type": "[TYP]"
}
```

### Attribute der Anfrage - POST /academicRecords

| Attribut       | Erfodert | Beispielwert                            | Erklärung                      |
| -------------- | -------- | --------------------------------------- | ------------------------------ |
| `abbreviation` | ja       | "K" oder SE" oder ...                   | Abkürzung der Prüfungsleistung |
| `type`         | ja       | "Klausur" oder "Seminararbeit" oder ... | Art der Prüfungsleistung       |

### Rückgabe - POST /academicRecords

```json
{
    "message": "Successfully created",
    "payload": {
        "academicRecord_id": 0,
        "abbreviation": "[ABKÜRZUNG]",
        "type": "[TYP]",
        "updatedAt": "[DATUM]",
        "createdAt": "[DATUM]"
    }
}
```

## PUT /academicRecords?academicRecordId={ID}

**Info**: Aktualisiert die Prüfungsleistung `academicRecord_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

### Body der Anfrage - /academicRecords?academicRecordId={ID}

```json
{
    "abbreviation": "[ABKÜRZUNG]",
    "type": "[TYP]"
}
```

### Attribute der Anfrage - PUT /academicRecords?academicRecordId={ID}

| Attribut       | Erfodert | Beispielwert                            | Erklärung                      |
| -------------- | -------- | --------------------------------------- | ------------------------------ |
| `abbreviation` | ja       | "K" oder SE" oder ...                   | Abkürzung der Prüfungsleistung |
| `type`         | ja       | "Klausur" oder "Seminararbeit" oder ... | Art der Prüfungsleistung       |

### Rückgabe - PUT /academicRecords?academicRecordId={ID}

```json
{
    "message": "Successfully updated",
    "payload": true
}
```

## DELETE /academicRecords?academicRecordId={ID}

**Info**: Löscht eine Prüfungsleistung.

### Rückgabe - DELETE /academicRecords?academicRecordId={ID}

```json
{
    "message": "Successfully deleted",
    "payload": true
}
```
