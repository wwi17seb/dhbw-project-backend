# /transferOwnership <!-- omit in toc -->

- [GET /usersForTransfer](#get-usersfortransfer)
  - [Rückgabe - GET /usersForTransfer](#rückgabe---get-usersfortransfer)
  - [Attribute der Rückgabe - GET /usersForTransfer](#attribute-der-rückgabe---get-usersfortransfer)
- [POST /transferOwnership](#post-transferownership)
  - [Body der Anfrage - POST /transferOwnership](#body-der-anfrage---post-transferownership)
  - [Attribute der Anfrage - POST /transferOwnership](#attribute-der-anfrage---post-transferownership)
  - [Rückgabe - POST /transferOwnership](#rückgabe---post-transferownership)

## GET /usersForTransfer

### Rückgabe - GET /usersForTransfer

```json
{
    "message": "Successful",
    "payload": {
        "Users": [
            {
                "directorOfStudies_id": 0,
                "username": "[E-MAIL/NUTZERNAME]"
            }
        ]
    }
}
```

### Attribute der Rückgabe - GET /usersForTransfer

| Attribut                  | Beispielwert  | Erklärung                                |
| ------------------------- | ------------- | ---------------------------------------- |
| `Users`                   | { }           | Objekt eines Studiengangleiters          |
| `___directorOfStudies_id` | 1             | ID des Studiengangleiters                |
| `___username`             | "ritterbusch" | E-Mail/Nutzername des Studiengangleiters |


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
