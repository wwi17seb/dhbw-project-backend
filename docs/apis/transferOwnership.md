# /transferOwnership <!-- omit in toc -->

- [POST /transferOwnership](#post-transferownership)
  - [Body der Anfrage - POST /transferOwnership](#body-der-anfrage---post-transferownership)
  - [Attribute der Anfrage - POST /transferOwnership](#attribute-der-anfrage---post-transferownership)
  - [Rückgabe - POST /transferOwnership](#rückgabe---post-transferownership)

## POST /transferOwnership

**Info**: Transferiert alle Kurse, Dozierenden & Präsentationen eines Studiengangsleiters zu einem Anderen.

### Body der Anfrage - POST /transferOwnership

```json
{
    "newOwnerId": 0
}
```

### Attribute der Anfrage - POST /transferOwnership

| Attribut     | Erfodert | Beispielwert | Erklärung                       |
| ------------ | -------- | ------------ | ------------------------------- |
| `newOwnerId` | ja       | 1            | ID des neuen Studiengangleiters |

### Rückgabe - POST /transferOwnership

```json
{
    "message": "Successfully transferred",
    "payload": true
}
```
