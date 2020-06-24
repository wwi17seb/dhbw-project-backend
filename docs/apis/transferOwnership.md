# /transferOwnership

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
