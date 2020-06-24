# User Routen  <!-- omit in toc -->

- [PUT /changePassword?directorOfStudiesId={ID}](#put-changepassworddirectorofstudiesidid)
  - [Body der Anfrage - PUT /changePassword?directorOfStudiesId={ID}](#body-der-anfrage---put-changepassworddirectorofstudiesidid)
  - [Attribute der Anfrage - PUT /changePassword?directorOfStudiesId={ID}](#attribute-der-anfrage---put-changepassworddirectorofstudiesidid)
  - [Rückgabe - PUT /changePassword?directorOfStudiesId={ID}](#rückgabe---put-changepassworddirectorofstudiesidid)
- [GET /directorOfStudies?directorOfStudiesId={ID}](#get-directorofstudiesdirectorofstudiesidid)
  - [Rückgabe - GET /directorOfStudies?directorOfStudiesId={ID}](#rückgabe---get-directorofstudiesdirectorofstudiesidid)
  - [Attribute der Rückgabe - GET /directorOfStudies](#attribute-der-rückgabe---get-directorofstudies)
- [PUT /directorOfStudies](#put-directorofstudies)
  - [Body der Anfrage - PUT /directorOfStudies](#body-der-anfrage---put-directorofstudies)
  - [Attribute der Anfrage - PUT /directorOfStudies](#attribute-der-anfrage---put-directorofstudies)
  - [Rückgabe - PUT /directorOfStudies](#rückgabe---put-directorofstudies)

## PUT /changePassword?directorOfStudiesId={ID}

**Info**: Erlaubt das Ändern des eigenen Passworts.
Dazu muss die eigene `directorOfStudiesId` angegeben werden.
Es muss kein Token zur Authentifizierung übermittelt werden.

### Body der Anfrage - PUT /changePassword?directorOfStudiesId={ID}

```json
{
    "oldPassword": "[ALTES_PASSWORT]",
    "newPassword": "[NEUES_PASSWORT]"
}
```

### Attribute der Anfrage - PUT /changePassword?directorOfStudiesId={ID}

| Attribut      | Erfodert | Beispielwert            | Erklärung                    |
| ------------- | -------- | ----------------------- | ---------------------------- |
| `oldPassword` | ja       | "MeinAltesPasswort1337" | Altes Passwort des Benutzers |
| `newPassword` | ja       | "MeinNeuesPasswort1337" | Neues Passwort des Benutzers |

### Rückgabe - PUT /changePassword?directorOfStudiesId={ID}

```json
{
    "message": "Successfully updated",
    "payload": {
        "token": "[TOKEN]"
    }
}
```

## GET /directorOfStudies

**Info**: Gibt die aktuellen Daten des angemeldeten Studiengangleiters zurück.

### Rückgabe - GET /directorOfStudies

```json
{
    "message": "Successfully updated",
    "payload": {
        "directorOfStudies_id": 0,
        "username": "[NUTZERNAME]",
        "misc": "[MISC]",
        "is_admin": true
    }
}
```

### Attribute der Rückgabe - GET /directorOfStudies

| Attribut               | Beispielwert         | Erklärung                                                  |
| ---------------------- | -------------------- | ---------------------------------------------------------- |
| `directorOfStudies_Id` | 1                    | Eindeutige ID des Studiengangsleiters                      |
| `username`             | "Nutzername"         | Benutzername des Studiengangleiters                        |
| `misc`                 | VERSCHIEDENES - JSON | Freitext, wird als String im JSON-Format gespeichert       |
| `isAdmin`              | true / false         | Boolean ob Nutzer Studiengangleiters ein administrator ist |

## PUT /directorOfStudies

**Info**: Erlaubt das Ändern von eigenen Daten (aktuell umfasst dies den Nutzernamen und das Feld `misc`).

### Body der Anfrage - PUT /directorOfStudies

```json
{
    "username": "[NUTZERNAME]",
    "misc": "[MISC]"
}
```

### Attribute der Anfrage - PUT /directorOfStudies

| Attribut   | Erfodert | Beispielwert         | Erklärung                                            |
| ---------- | -------- | -------------------- | ---------------------------------------------------- |
| `username` | ja       | "Nutzername"         | Benutzername des Studiengangleiters                  |
| `misc`     | nein     | VERSCHIEDENES - JSON | Freitext, wird als String im JSON-Format gespeichert |

### Rückgabe - PUT /directorOfStudies

```json
{
    "message": "Successfully updated",
    "payload": {
        "token": "[TOKEN]"
    }
}
```
