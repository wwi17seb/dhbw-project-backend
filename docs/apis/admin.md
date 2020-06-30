# Admin-Routen  <!-- omit in toc -->

- [GET /users](#get-users)
  - [Body der Rückgabe - GET /users](#body-der-rückgabe---get-users)
  - [Attribute der Rückgabe - GET /users](#attribute-der-rückgabe---get-users)
- [POST /createUser](#post-createuser)
  - [Body der Anfrage - POST /createUser](#body-der-anfrage---post-createuser)
  - [Attribute der Anfrage - POST /createUser](#attribute-der-anfrage---post-createuser)
  - [Rückgabe - POST /createUser](#rückgabe---post-createuser)
  - [Attribute der Rückgabe - POST /createUser](#attribute-der-rückgabe---post-createuser)
- [PUT /resetPassword?directorOfStudiesId={ID}](#put-resetpassworddirectorofstudiesidid)
  - [Attribute der Anfrage - PUT /resetPassword?directorOfStudiesId={ID}](#attribute-der-anfrage---put-resetpassworddirectorofstudiesidid)
  - [Rückgabe - PUT /resetPassword?directorOfStudiesId={ID}](#rückgabe---put-resetpassworddirectorofstudiesidid)
- [PUT /upgradeToAdmin?directorOfStudiesId={ID}](#put-upgradetoadmindirectorofstudiesidid)
  - [Rückgabe - PUT /upgradeToAdmin?directorOfStudiesId={ID}](#rückgabe---put-upgradetoadmindirectorofstudiesidid)
- [GET /registerKey](#get-registerkey)
  - [Rückgabe - GET /registerKey](#rückgabe---get-registerkey)
  - [Attribute der Anfrage GET /registerKey](#attribute-der-anfrage-get-registerkey)
- [PUT /registerKey](#put-registerkey)
  - [Body der Anfrage - PUT /registerKey](#body-der-anfrage---put-registerkey)
  - [Attribute der Anfrage - PUT /registerKey](#attribute-der-anfrage---put-registerkey)
  - [Rückgabe - PUT /registerKey](#rückgabe---put-registerkey)

## GET /users

**Info**: Gibt alle im System registrierten Nutzer (Studiengangsleiter) zurück.

### Body der Rückgabe - GET /users

```json
{
    "message": "Successful",
    "payload": {
        "Users": [
            {
                "directorOfStudies_id": 0,
                "username": "[NUTZERNAME]",
                "is_admin": true,
                "password_change_required": true
            }
        ]
    }
}
```

### Attribute der Rückgabe - GET /users

| Attribut                      | Beispielwert | Erklärung                                                  |
| ----------------------------- | ------------ | ---------------------------------------------------------- |
| `Users`                       | [ ]          | Array der Benutzer                                         |
| `___directorOfStudies_id`     | 1            | Eindeutige ID des jeweiligen Studiengangleiters            |
| `___username`                 | "Nutzername" | Nutzername des jeweiligen Studiengangleiters               |
| `___is_admin`                 | true / false | Boolean ob Nutzer Studiengangleiters ein administrator ist |
| `___password_change_required` | false        | Gibt an, ob ein Passwortwechsel erforderlich ist           |

## POST /createUser

**Info**: Diese Route dient dem Anlegen eines neuen Benutzers.

### Body der Anfrage - POST /createUser

```json
{
    "username": "[NUTZERNAME]",
    "password": "[PASSWORT]"
}
```

### Attribute der Anfrage - POST /createUser

| Attribut   | Erfodert | Beispielwert               | Erklärung                                                                                 |
| ---------- | -------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| `username` | ja       | "Nutzername"               | Name des Benutzers, kann auch eine Mailadresse sein                                       |
| `password` | ja       | "MeinSicheresPasswort1337" | Übergangspasswort des Nutzers, bis er sich selbstständig anmeldet und das Passwort ändert |

### Rückgabe - POST /createUser

```json
{
    "message": "[DEBUG-INFO/KOMMENTAR]",
    "payload": {
        "directorOfStudies_id": 0,
        "username": "[NUTZERNAME]"
    }
}
```

### Attribute der Rückgabe - POST /createUser

| Attribut               | Beispielwert | Erklärung                                       |
| ---------------------- | ------------ | ----------------------------------------------- |
| `directorOfStudies_id` | 1            | Eindeutige ID des angelegten Studiengangleiters |
| `username`             | "Nutzername" | Nutzername des angelegten Studiengangleiters    |

## PUT /resetPassword?directorOfStudiesId={ID}

```json
{
    "newPassword": "[NEUES_PASSWORT]",
}
```

### Attribute der Anfrage - PUT /resetPassword?directorOfStudiesId={ID}

| Attribut      | Erfodert | Beispielwert                     | Erklärung                                                                                 |
| ------------- | -------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| `newPassword` | Ja       | "SicheresUebergangsPasswort7331" | Übergangspasswort des Nutzers, bis er sich selbstständig anmeldet und das Passwort ändert |

### Rückgabe - PUT /resetPassword?directorOfStudiesId={ID}

```json
{
    "message": "Successfully updated",
    "payload": true
}
```

## PUT /upgradeToAdmin?directorOfStudiesId={ID}

```json
{}
```

### Rückgabe - PUT /upgradeToAdmin?directorOfStudiesId={ID}

```json
{
    "message": "Successfully upgraded user to admin",
    "payload": true
}
```

## GET /registerKey

**Info**: Gibt den Registrierungsschlüssel zurück.

### Rückgabe - GET /registerKey

```json
{
    "message": "Successful",
    "payload": {
        "registerKey": "[REGISTRIERUNGSSCHLÜSSEL]"
    }
}
```

### Attribute der Anfrage GET /registerKey

| Attribut      | Beispielwert            | Erklärung                           |
| ------------- | ----------------------- | ----------------------------------- |
| `registerKey` | "SichererSchlüssel1337" | Registrierungsschlüssel des Systems |

## PUT /registerKey

**Info**: Aktualisiert den Registrierungsschlüssel.
Wird der Registrierungsschlüssel auf einen falsy Wert gesetzt (`undefined`, `null`, `false`, `""`), so deaktiviert dies die selbstständige Registrierung.

### Body der Anfrage - PUT /registerKey

```json
{
    "registerKey": "[Registrierungsschlüssel]"
}
```

### Attribute der Anfrage - PUT /registerKey

| Attribut      | Erfodert | Beispielwert            | Erklärung                                 |
| ------------- | -------- | ----------------------- | ----------------------------------------- |
| `registerKey` | ja       | "SichererSchlüssel1337" | Neuer Registrierungsschlüssel des Systems |

### Rückgabe - PUT /registerKey

```json
{
    "message": "Successfully updated",
    "payload": true
}
```
