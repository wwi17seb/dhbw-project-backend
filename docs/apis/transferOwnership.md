# /transferOwnership <!-- omit in toc -->

- [POST /transferOwnership](#post-transferownership)
  - [Body der Anfrage - POST /transferOwnership](#body-der-anfrage---post-transferownership)
  - [Attribute der Anfrage - POST /academicRecords](#attribute-der-anfrage---post-academicrecords)
  - [Rückgabe - POST /academicRecords](#rückgabe---post-academicrecords)

## POST /transferOwnership

**Info**: Transferiert alle Kurse, Dozierenden & Präsentationen eines Studiengangsleiters zu einem Anderen.

### Body der Anfrage - POST /transferOwnership

```json
{
    "newOwnerId": 0
}
```

### Attribute der Anfrage - POST /academicRecords

| Attribut     | Erfodert | Beispielwert | Erklärung                       |
| ------------ | -------- | ------------ | ------------------------------- |
| `newOwnerId` | ja       | 1            | ID des neuen Studiengangleiters |

### Rückgabe - POST /academicRecords

```json
{
    "message": "Successfully transferred",
    "payload": true
}
```
