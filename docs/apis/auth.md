# Authentifizierung <!-- omit in toc -->

- [POST /signup](#post-signup)
  - [Body der Anfrage - POST /signup](#body-der-anfrage---post-signup)
  - [Attribute der Anfrage - POST /signup](#attribute-der-anfrage---post-signup)
  - [Rückgabe - POST /signup](#rückgabe---post-signup)
  - [Attribute der Rückgabe - POST /signup](#attribute-der-rückgabe---post-signup)
- [POST /login](#post-login)
  - [Body der Anfrage - POST /login](#body-der-anfrage---post-login)
  - [Attribute der Anfrage - POST /login](#attribute-der-anfrage---post-login)
    - [Rückgabe - POST /login](#rückgabe---post-login)
  - [Attribute der Rückgabe - POST /login](#attribute-der-rückgabe---post-login)
  - [POST /logout](#post-logout)

## POST /signup

Diese Route wird bald nicht mehr in dieser Form verfügbar sein, da eine selbstständige Registierung nicht ohne Weiteres möglich sein sollte.
Für diese Route ist keine Authentifizierung (d. h. kein Token in der URL) notwendig.

### Body der Anfrage - POST /signup

```json
{
    "username": "[NAME]",
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

## POST /login

**Info**: Route zum Anmelden.
Logischerweise muss hier kein Token in der URL übergeben werden.

### Body der Anfrage - POST /login

```json
{
    "username": "[NAME]",
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
        "username": "[NUTZERNAME]"
    }
}
```

### Attribute der Rückgabe - POST /login

| Attribut               | Beispielwert                                                                                                                                                                                                 | Erklärung                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| `token`                | "eyJpe0JEKTAiOjAsImFsZyI6IkhTMjU2IiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGlyZWN0b3JPZlN0dWRpZXNfaWQiOjEsImlhdCI6MTU5MjE3NjQ4MCwiZXhwIjoxNTk4MTM4MDgwfQ.CFzby-2_Q6h-_LsP_dP7IIzyL5ozu_UdV-dzyJdnQAk" | JWT, der zur Authentifizierung dient              |
| `directorOfStudies_id` | 1                                                                                                                                                                                                            | Eindeutige ID des angemeldeten Studiengangleiters |
| `username`             | "Nutzername"                                                                                                                                                                                                 | Nutzername des angemeldeten Studiengangleiters    |

### POST /logout

**Info**: Route existiert, ändert jedoch nichts im Back-End &rarr; Anforderungen fordern "ein Logout wie bei anderen Diensten", d. h. lediglich im Front-End den Token entfernen.
Jeder Token ist standardmäßig für eine Dauer von `12h` gültig und muss danach erneuert werden.
