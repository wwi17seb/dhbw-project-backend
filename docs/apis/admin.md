# Admin Routen  <!-- omit in toc -->

- [POST /createUser](#post-createuser)
  - [Body der Anfrage - POST /createUser](#body-der-anfrage---post-createuser)
  - [Attribute der Anfrage - POST /createUser](#attribute-der-anfrage---post-createuser)
  - [Rückgabe - POST /createUser](#rückgabe---post-createuser)
  - [Attribute der Rückgabe - POST /createUser](#attribute-der-rückgabe---post-createuser)
- [PUT /resetPassword?directorOfStudiesId={ID}](#put-resetpassworddirectorofstudiesidid)
  - [Attribute der Anfrage - PUT /resetPassword?directorOfStudiesId={ID}](#attribute-der-anfrage---put-resetpassworddirectorofstudiesidid)
  - [Rückgabe - PUT /resetPassword?directorOfStudiesId={ID}](#rückgabe---put-resetpassworddirectorofstudiesidid)
- [PUT /upgradeToAdmin?directorOfStudiesId={ID}](#put-upgradetoadmindirectorofstudiesidid)
  - [Attribute der Anfrage - PUT /upgradeToAdmin?directorOfStudiesId={ID}](#attribute-der-anfrage---put-upgradetoadmindirectorofstudiesidid)
  - [Rückgabe - PUT /upgradeToAdmin?directorOfStudiesId={ID}](#rückgabe---put-upgradetoadmindirectorofstudiesidid)
- [GET /registerKey](#get-registerkey)
  - [Rückgabe - GET /registerKey](#rückgabe---get-registerkey)
  - [Attribute der Anfrage GET /registerKey](#attribute-der-anfrage-get-registerkey)
- [PUT /registerKey](#put-registerkey)
  - [Body der Anfrage - PUT /registerKey](#body-der-anfrage---put-registerkey)
  - [Attribute der Anfrage - PUT /registerKey](#attribute-der-anfrage---put-registerkey)
  - [Rückgabe - PUT /registerKey](#rückgabe---put-registerkey)

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
        "token": "[TOKEN]",
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
{
    "registerKey": "[REGISTRIERUNGSSCHLÜSSEL]"
}
```

### Attribute der Anfrage - PUT /upgradeToAdmin?directorOfStudiesId={ID}

| Attribut      | Beispielwert | Erklärung               |
| ------------- | ------------ | ----------------------- |
| `registerKey` | ja           | "SichererSchlüssel1337" | Neuer Registrierungsschlüssel des Systems |

### Rückgabe - PUT /upgradeToAdmin?directorOfStudiesId={ID}

```json
{
    "message": "Successfully updated",
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
    "registerKey": "[GOOGLE-CALENDAR-API-KEY]"
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
