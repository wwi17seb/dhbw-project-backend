# User-Routen  <!-- omit in toc -->

- [POST /register](#post-register)
  - [Body der Anfrage - POST /register](#body-der-anfrage---post-register)
  - [Attribute der Anfrage - POST /register](#attribute-der-anfrage---post-register)
  - [Rückgabe - POST /register](#rückgabe---post-register)
  - [Attribute der Rückgabe - POST /register](#attribute-der-rückgabe---post-register)
- [PUT /changePassword](#put-changepassword)
  - [Body der Anfrage - PUT /changePassword](#body-der-anfrage---put-changepassword)
  - [Attribute der Anfrage - PUT /changePassword](#attribute-der-anfrage---put-changepassword)
  - [Rückgabe - PUT /changePassword](#rückgabe---put-changepassword)
- [PUT /directorOfStudies](#put-directorofstudies)
  - [Body der Anfrage - PUT /directorOfStudies](#body-der-anfrage---put-directorofstudies)
  - [Attribute der Anfrage - PUT /directorOfStudies](#attribute-der-anfrage---put-directorofstudies)
  - [Rückgabe - PUT /directorOfStudies](#rückgabe---put-directorofstudies)

## POST /register

**Info**: Diese Route dient dem selbstständigen Registrieren.
Damit der Zugang allerdings auf berechtigte Nutzer beschränkt wird, muss hierzu ein Registrierungsschlüssel angegeben werden.

### Body der Anfrage - POST /register

```json
{
    "username": "[NUTZERNAME]",
    "password": "[PASSWORT]",
    "registerKey": "[REGISTRIERUNGSSCHLÜSSEL]"
}
```

### Attribute der Anfrage - POST /register

| Attribut      | Erfodert | Beispielwert               | Erklärung                                           |
| ------------- | -------- | -------------------------- | --------------------------------------------------- |
| `username`    | ja       | "Nutzername"               | Name des Benutzers, kann auch eine Mailadresse sein |
| `password`    | ja       | "MeinSicheresPasswort1337" | Passwort des Benutzers                              |
| `registerKey` | ja       | "SichererSchlüssel1337"    | Registrierungsschlüssel des Systems                 |

### Rückgabe - POST /register

```json
{
    "message": "[DEBUG-INFO/KOMMENTAR]",
    "payload": {
        "token": "[TOKEN]",
        "directorOfStudies_id": 0,
        "username": "[NUTZERNAME]"
    }
}
```

### Attribute der Rückgabe - POST /register

| Attribut               | Beispielwert                                                                                                                                                                                                 | Erklärung                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `token`                | "eyJpe0JEKTAiOjAsImFsZyI6IkhTMjU2IiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGlyZWN0b3JPZlN0dWRpZXNfaWQiOjEsImlhdCI6MTU5MjE3NjQ4MCwiZXhwIjoxNTk4MTM4MDgwfQ.CFzby-2_Q6h-_LsP_dP7IIzyL5ozu_UdV-dzyJdnQAk" | JWT, der zur Authentifizierung dient            |
| `directorOfStudies_id` | 1                                                                                                                                                                                                            | Eindeutige ID des angelegten Studiengangleiters |
| `username`             | "Nutzername"                                                                                                                                                                                                 | Nutzername des angelegten Studiengangleiters    |

## PUT /changePassword

### Body der Anfrage - PUT /changePassword

```json
{
    "oldPassword": "[ALTES_PASSWORT]",
    "newPassword": "[NEUES_PASSWORT]"
}
```

### Attribute der Anfrage - PUT /changePassword

| Attribut      | Erfodert | Beispielwert            | Erklärung                    |
| ------------- | -------- | ----------------------- | ---------------------------- |
| `oldPassword` | ja       | "MeinAltesPasswort1337" | Altes Passwort des Benutzers |
| `newPassword` | ja       | "MeinNeuesPasswort1337" | Neues Passwort des Benutzers |

### Rückgabe - PUT /changePassword

```json
{
    "message": "Successfully updated",
    "payload": true
}
```

Der bestehende Token ist weiterhin gültig (bis zu seinem Ablauf).

## PUT /directorOfStudies

### Body der Anfrage - PUT /directorOfStudies

**Info**: Erlaubt das Ändern von eigenen Daten (aktuell umfasst dies den Nutzernamen und das Feld `misc`).
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

```json
{
    "username": "[NUTZERNAME]",
    "misc": "[MISC]"
}
```

### Attribute der Anfrage - PUT /directorOfStudies

| Attribut   | Erfodert | Beispielwert         | Erklärung                                           |
| ---------- | -------- | -------------------- | --------------------------------------------------- |
| `username` | ja       | "Nutzername"         | Name des Benutzers, kann auch eine Mailadresse sein |
| `misc`     | nein     | VERSCHIEDENES - JSON | Freitext, wird als String im JSON-Format            |

### Rückgabe - PUT /directorOfStudies

```json
{
    "message": "Successfully updated",
    "payload": true
}
```
