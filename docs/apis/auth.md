# Authentifizierung <!-- omit in toc -->

- [DEPRECATED - POST /signup](#deprecated---post-signup)
  - [Body der Anfrage - POST /signup](#body-der-anfrage---post-signup)
  - [Attribute der Anfrage - POST /signup](#attribute-der-anfrage---post-signup)
  - [Rückgabe - POST /signup](#rückgabe---post-signup)
  - [Attribute der Rückgabe - POST /signup](#attribute-der-rückgabe---post-signup)
- [POST /register](#post-register)
  - [Body der Anfrage - POST /register](#body-der-anfrage---post-register)
  - [Attribute der Anfrage - POST /register](#attribute-der-anfrage---post-register)
  - [Rückgabe - POST /register](#rückgabe---post-register)
  - [Attribute der Rückgabe - POST /register](#attribute-der-rückgabe---post-register)
- [POST /login](#post-login)
  - [Body der Anfrage - POST /login](#body-der-anfrage---post-login)
  - [Attribute der Anfrage - POST /login](#attribute-der-anfrage---post-login)
    - [Rückgabe - POST /login](#rückgabe---post-login)
  - [Attribute der Rückgabe - POST /login](#attribute-der-rückgabe---post-login)
- [POST /logout](#post-logout)

## DEPRECATED - POST /signup

**Info**: Diese Route wird bald nicht mehr in dieser Form verfügbar sein, da eine selbstständige Registierung nicht ohne Weiteres möglich sein sollte.
Für diese Route ist keine Authentifizierung (d. h. kein Token in der URL) notwendig.
Bitte stattdessen die Route [`/register`](#post-register) nutzen.

### Body der Anfrage - POST /signup

```json
{
    "username": "[NUTZERNAME]",
    "password": "[PASSWORT]"
}
```

### Attribute der Anfrage - POST /signup

| Attribut   | Erfodert | Beispielwert               | Erklärung                                           |
| ---------- | -------- | -------------------------- | --------------------------------------------------- |
| `username` | ja       | "Nutzername"               | Name des Benutzers, kann auch eine Mailadresse sein |
| `password` | ja       | "MeinSicheresPasswort1337" | Passwort des Benutzers                              |

### Rückgabe - POST /signup

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

### Attribute der Rückgabe - POST /signup

| Attribut               | Beispielwert                                                                                                                                                                                                 | Erklärung                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `token`                | "eyJpe0JEKTAiOjAsImFsZyI6IkhTMjU2IiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGlyZWN0b3JPZlN0dWRpZXNfaWQiOjEsImlhdCI6MTU5MjE3NjQ4MCwiZXhwIjoxNTk4MTM4MDgwfQ.CFzby-2_Q6h-_LsP_dP7IIzyL5ozu_UdV-dzyJdnQAk" | JWT, der zur Authentifizierung dient            |
| `directorOfStudies_id` | 1                                                                                                                                                                                                            | Eindeutige ID des angelegten Studiengangleiters |
| `username`             | "Nutzername"                                                                                                                                                                                                 | Nutzername des angelegten Studiengangleiters    |

## POST /register

**Info**: Diese Route dient dem selbstständigen Registrieren.
Ersetzt `POST /signup`.
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

## POST /login

**Info**: Route zum Anmelden.
Logischerweise muss hier kein Token in der URL übergeben werden.

### Body der Anfrage - POST /login

```json
{
    "username": "[NUTZERNAME]",
    "password": "[PASSWORT]"
}
```

### Attribute der Anfrage - POST /login

| Attribut   | Beispielwert               | Erklärung                                           |
| ---------- | -------------------------- | --------------------------------------------------- |
| `username` | "Nutzername"               | Name des Benutzers, kann auch eine Mailadresse sein |
| `password` | "MeinSicheresPasswort1337" | Passwort des Benutzers                              |

#### Rückgabe - POST /login

```json
{
    "message": "[DEBUG-INFO/KOMMENTAR]",
    "payload": {
        "token": "[TOKEN]",
        "directorOfStudies_id": 0,
        "username": "[NUTZERNAME]",
        "password_change_required": false
    }
}
```

### Attribute der Rückgabe - POST /login

| Attribut                   | Beispielwert                                                                                                                                                                                                 | Erklärung                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `token`                    | "eyJpe0JEKTAiOjAsImFsZyI6IkhTMjU2IiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGlyZWN0b3JPZlN0dWRpZXNfaWQiOjEsImlhdCI6MTU5MjE3NjQ4MCwiZXhwIjoxNTk4MTM4MDgwfQ.CFzby-2_Q6h-_LsP_dP7IIzyL5ozu_UdV-dzyJdnQAk" | JWT, der zur Authentifizierung dient                                                                    |
| `directorOfStudies_id`     | 1                                                                                                                                                                                                            | Eindeutige ID des angemeldeten Studiengangleiters                                                       |
| `username`                 | "Nutzername"                                                                                                                                                                                                 | Nutzername des angemeldeten Studiengangleiters                                                          |
| `password_change_required` | false                                                                                                                                                                                                        | Gibt an, ob das Passwort zwangsweise gewechselt werden muss. Falls ja, wird kein Token mehr ausgestellt |

## POST /logout

**Info**: Route existiert, ändert jedoch nichts im Back-End &rarr; Anforderungen fordern "ein Logout wie bei anderen Diensten", d. h. lediglich im Front-End den Token entfernen.
Jeder Token ist standardmäßig für eine Dauer von `12h` gültig und muss danach erneuert werden.
Es ist also auch noch nach einem Passwortwechsel, einem Logout oder einem Zurücksetzen des Passworts (inkl. Zwang zum Passwortwechsel) möglich, mit dem Token auf alle Routen zuzugreifen.
