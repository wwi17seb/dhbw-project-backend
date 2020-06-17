# /mainFocuses <!-- omit in toc -->

- [GET /mainFocuses](#get-mainfocuses)
  - [Rückgabe - GET /mainFocuses](#rückgabe---get-mainfocuses)
  - [Attribute der Anfrage - GET /mainFocuses](#attribute-der-anfrage---get-mainfocuses)
- [POST /mainFocuses](#post-mainfocuses)
  - [Body der Anfrage - POST /mainFocuses](#body-der-anfrage---post-mainfocuses)
  - [Attribute der Anfrage - POST /mainFocuses](#attribute-der-anfrage---post-mainfocuses)
  - [Rückgabe - POST /mainFocuses](#rückgabe---post-mainfocuses)
- [PUT /mainFocuses?mainFocusId={ID}](#put-mainfocusesmainfocusidid)
  - [Body der Anfrage - PUT /mainFocuses?mainFocusId={ID}](#body-der-anfrage---put-mainfocusesmainfocusidid)
  - [Attribute der Anfrage - PUT /mainFocuses?mainFocusId={ID}](#attribute-der-anfrage---put-mainfocusesmainfocusidid)
  - [Rückgabe - PUT /mainFocuses?mainFocusId={ID}](#rückgabe---put-mainfocusesmainfocusidid)
- [DELETE /mainFocuses?mainFocusId={ID}](#delete-mainfocusesmainfocusidid)
  - [Rückgabe - DELETE /mainFocuses?mainFocusId={ID}](#rückgabe---delete-mainfocusesmainfocusidid)

## GET /mainFocuses

### Rückgabe - GET /mainFocuses

```json
{
    "message": "Successful",
    "payload": {
        "MainFocuses": [
            {
                "mainFocus_id": 1,
                "name": "[SCHWERPUNKT]",
                "createdAt": "[DATUM]",
                "updatedAt": "[DATUM]"
            }
        ]
    }
}
```

### Attribute der Anfrage - GET /mainFocuses

| Attribut          | Beispielwert    | Erklärung                        |
| ----------------- | --------------- | -------------------------------- |
| `MainFocuses`     | [ ]             | Array von MainFocuses            |
| `___mainFocus_id` | 1               | Eindeutige ID eines Schwerpunkts |
| `___name`         | "Programmieren" | Name des Schwerpunktes           |

## POST /mainFocuses

**Info**: Erstellt einen neuen Eintrag eines Schwerpunkts.

### Body der Anfrage - POST /mainFocuses

```json
{
    "name": "[SCHWERPUNKT]"
}
```

### Attribute der Anfrage - POST /mainFocuses

| Attribut | Erfodert | Beispielwert    | Erklärung              |
| -------- | -------- | --------------- | ---------------------- |
| `name`   | ja       | "Programmieren" | Name des Schwerpunktes |

### Rückgabe - POST /mainFocuses

```json
{
    "message": "Successfully created",
    "payload": {
        "mainFocus_id": 0,
        "name": "[SCHWERPUNKT]",
        "updatedAt": "[DATUM]",
        "createdAt": "[DATUM]"
    }
}
```

## PUT /mainFocuses?mainFocusId={ID}

**Info**: Aktualisiert den Schwerpunkt (mainFocus) mit angegebener `mainFocus_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

### Body der Anfrage - PUT /mainFocuses?mainFocusId={ID}

```json
{
    "name": "[SCHWERPUNKT]"
}
```

### Attribute der Anfrage - PUT /mainFocuses?mainFocusId={ID}

| Attribut | Erfodert | Beispielwert    | Erklärung              |
| -------- | -------- | --------------- | ---------------------- |
| `name`   | ja       | "Programmieren" | Name des Schwerpunktes |

### Rückgabe - PUT /mainFocuses?mainFocusId={ID}

```json
{
    "message": "Successfully updated",
    "payload": true
}
```

## DELETE /mainFocuses?mainFocusId={ID}

**Info**: Löscht den Schwerpunkt mit der angegebenen `{ID}`.

### Rückgabe - DELETE /mainFocuses?mainFocusId={ID}

```json
{
    "message": "Successfully deleted",
    "payload": true
}
```
