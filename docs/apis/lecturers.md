# /lecturers <!-- omit in toc -->

- [GET /lecturers](#get-lecturers)
  - [Rückgabe - GET /lecturers](#rückgabe---get-lecturers)
  - [Attribute der Anfrage - GET /lecturers](#attribute-der-anfrage---get-lecturers)
- [POST /lecturers](#post-lecturers)
  - [Body der Anfrage - POST /lecturers](#body-der-anfrage---post-lecturers)
  - [Attribute der Anfrage - POST /lecturers](#attribute-der-anfrage---post-lecturers)
  - [Rückgabe - POST /lecturers](#rückgabe---post-lecturers)
- [PUT /lecturers?lecturerId={ID}](#put-lecturerslectureridid)
  - [Body der Anfrage - PUT /lecturers?lecturerId={ID}](#body-der-anfrage---put-lecturerslectureridid)
  - [Attribute der Anfrage - PUT /lecturers?lecturerId={ID}](#attribute-der-anfrage---put-lecturerslectureridid)
  - [Rückgabe - PUT /lecturers?lecturerId={ID}](#rückgabe---put-lecturerslectureridid)
- [DELETE /lecturers?lecturerId={ID}](#delete-lecturerslectureridid)
  - [Rückgabe - DELETE /lecturers?lecturerId={ID}](#rückgabe---delete-lecturerslectureridid)
- [/lecturerCV](#lecturercv)
  - [GET /lecturerCV?lecturerId={ID}](#get-lecturercvlectureridid)
  - [DEPRECATED - POST /lecturerCV?lecturerId={ID}](#deprecated---post-lecturercvlectureridid)
  - [PUT /lecturerCV?lecturerId={ID}](#put-lecturercvlectureridid)
  - [DELETE /lecturerCV?lecturerId={ID}](#delete-lecturercvlectureridid)

## GET /lecturers

**Info**: Gibt alle Dozenten zurück.

### Rückgabe - GET /lecturers

```json
{
    "message": "Successful",
    "payload": {
        "Lecturers": [
            {
                "lecturer_id": 0,
                "firstname": "[VORNAME]",
                "lastname": "[NACHNAME]",
                "academic_title": "[AKADEMISCHER_TITEL]",
                "email": "[E-MAIL]",
                "salutation": "[ANREDE]",
                "phonenumber": "[TELEFONNUMMER]",
                "experience": "[ERFAHRUNG]",
                "cv": "[DATEINAME]",
                "comment": "[KOMMENTAR]",
                "is_extern": true,
                "possible_lectures": "[Vorlesungen]",
                "allow_manipulation": true,
                "createdAt": "[DATUM]",
                "updatedAt": "[DATUM]",
                "createdBy_id": 0,
                "DirectorOfStudies": {
                    "directorOfStudies_id": 0,
                    "username": "[NUTZERNAME]",
                    "is_admin": true
                },
                "MainFocuses": [
                    {
                        "mainFocus_id": 0,
                        "name": "[SCHWERPUNKT]"
                    }
                ]
            }
        ]
      }
    ]
  }
}
```

### Attribute der Anfrage - GET /lecturers

| Attribut                     | Beispielwert                             | Erklärung                                                                                                        |
| ---------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Lecturers`                  | [ ]                                      | Array von Dozierenden                                                                                            |
| `___firstname`               | "Sebastian"                              | Vorname des Dozierenden                                                                                          |
| `___lastname`                | "Ritterbusch"                            | Nachname des Dozierenden                                                                                         |
| `___academic_title`          | "Prof. Dr."                              | akademischer Titel des Dozierenden                                                                               |
| `___email`                   | "sebastian.ritterbusch@dhbw-mannheim.de" | Mailadresse des Dozierenden                                                                                      |
| `___salutation`              | "Herr"                                   | Anrede des Dozierenden                                                                                           |
| `___phonenumber`             | "+49 621 4105 - 1724"                    | Telefonnummer des Dozierenden                                                                                    |
| `___experience`              | "Mathematik, Podcasts, ..."              | Freitext, kann durch Front-End ebenfalls als JSON-Objekt im Stringformat gespeichert werden (`JSON.stringify()`) |
| `___cv`                      | "dutzint.pdf"                            | Gibt den Namen der PDF-Datei an                                                                                  |
| `___comment`                 | "Sehr engagiert"                         | Freitext, kann durch Front-End ebenfalls als JSON-Objekt im Stringformat gespeichert werden (`JSON.stringify()`) |
| `___possible_lectures`       | "Datenbanken, Methoden der WI"           | Freitext, speichert potentielle Vorlesungen als String                                                           |
| `___is_extern`               | false                                    | Gibt an, ob ein Dozent extern ist - false = intern, true = extern                                                |
| `___allow_manipulation`      | true                                     | Gibt an, ob ein Dozent von **allen** Studiengangsleitern bearbeitbar ist                                         |
| `___createdBy_id`            | 1                                        | ID des Studiengangsleiters, der diesen Dozenten angelegt hat                                                     |
| `___DirectorOfStudies`       | { }                                      | Objekt eines Studiengangleiters                                                                                  |
| `______directorOfStudies_id` | 1                                        | Eindeutiger Bezeichner eines Studiengangleiters                                                                  |
| `______username`             | "jreichwald"                             | Nutzername des Studiengangleiters                                                                                |
| `______name`                 | "Software Engineering"                   | Name des Schwerpunktes                                                                                           |

## POST /lecturers

**Info**: Erzeugt einen neuen Dozenten.

### Body der Anfrage - POST /lecturers

```json
{
  "firstname": "[VORNAME]",
  "lastname": "[NACHNAME]",
  "academic_title": "[AKADEMISCHER_TITEL]",
  "email": "[E-MAIL]",
  "salutation": "[ANREDE]",
  "phonenumber": "[TELEFONNUMMER]",
  "experience": "[ERFAHRUNG]",
  "mainFocus_ids": [0, 0],
  "comment": "[KOMMENTAR]",
  "is_extern": true,
  "allow_manipulation": true,
  "possible_lectures": "[Vorlesungen]"
}
```

### Attribute der Anfrage - POST /lecturers

| Attribut             | Erfodert | Beispielwert                             | Erklärung                                                                                                        |
| -------------------- | -------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `firstname`          | ja       | "Sebastian"                              | Vorname des Dozierenden                                                                                          |
| `lastname`           | ja       | "Ritterbusch"                            | Nachname des Dozierenden                                                                                         |
| `academic_title`     | nein     | "Prof. Dr."                              | akademischer Titel des Dozierenden                                                                               |
| `email`              | nein     | "sebastian.ritterbusch@dhbw-mannheim.de" | Mailadresse des Dozierenden                                                                                      |
| `salutation`         | ja       | "Herr"                                   | Anrede des Dozierenden                                                                                           |
| `phonenumber`        | ja       | "+49 621 4105 - 1724"                    | Telefonnummer des Dozierenden                                                                                    |
| `experience`         | nein     | "Mathematik, Podcasts, ..."              | Freitext, kann durch Front-End ebenfalls als JSON-Objekt im Stringformat gespeichert werden (`JSON.stringify()`) |
| `mainFocus_ids`      | nein     | [ 1, 2 ]                                 | Eindeutige ID eines Schwerpunktes                                                                                |
| `comment`            | nein     | "Sehr engagiert"                         | Freitext, kann durch Front-End ebenfalls als JSON-Objekt im Stringformat gespeichert werden (`JSON.stringify()`) |
| `is_extern`          | ja       | true                                     | Gibt an, ob ein Dozent extern ist - false = intern, true = extern                                                |
| `allow_manipulation` | ja       | true                                     | Gibt an, ob ein Dozent von **allen** Studiengangsleitern bearbeitbar ist                                         |
| `possible_lectures`  | nein     | "Datenbanken, Methoden der WI"           | Freitext, speichert potentielle Vorlesungen als String                                                           |

### Rückgabe - POST /lecturers

```json
{
  "message": "Successfully created",
  "payload": {
    "lecturer_id": 0,
    "firstname": "[VORNAME]",
    "lastname": "[NACHNAME]",
    "academic_title": "[AKADEMISCHER_TITEL]",
    "email": "[E-MAIL]",
    "salutation": "[ANREDE]",
    "phonenumber": "[TELEFONNUMMER]",
    "experience": "[ERFAHRUNG]",
    "comment": "[KOMMENTAR]",
    "is_extern": true,
    "possible_lectures": "[Vorlesungen]",
    "allow_manipulation": true,
    "createdBy_id": 0,
    "updatedAt": "[DATUM]",
    "createdAt": "[DATUM]"
  }
}
```

## PUT /lecturers?lecturerId={ID}

**Info**: Aktualisiert den Dozenten mit der angegebenen `lecturer_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

### Body der Anfrage - PUT /lecturers?lecturerId={ID}

```json
{
  "firstname": "[VORNAME]",
  "lastname": "[NACHNAME]",
  "academic_title": "[AKADEMISCHER_TITEL]",
  "email": "[E-MAIL]",
  "salutation": "[ANREDE]",
  "phonenumber": "[TELEFONNUMMER]",
  "experience": "[ERFAHRUNG]",
  "mainFocus_ids": [0, 0],
  "comment": "[KOMMENTAR]",
  "is_extern": true,
  "possible_lectures": "[Vorlesungen]",
  "allow_manipulation": true
}
```

### Attribute der Anfrage - PUT /lecturers?lecturerId={ID}

| Attribut             | Erfodert | Beispielwert                             | Erklärung                                                                                                        |
| -------------------- | -------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `firstname`          | ja       | "Sebastian"                              | Vorname des Dozierenden                                                                                          |
| `lastname`           | ja       | "Ritterbusch"                            | Nachname des Dozierenden                                                                                         |
| `academic_title`     | nein     | "Prof. Dr."                              | akademischer Titel des Dozierenden                                                                               |
| `email`              | nein     | "sebastian.ritterbusch@dhbw-mannheim.de" | Mailadresse des Dozierenden                                                                                      |
| `salutation`         | ja       | "Herr"                                   | Anrede des Dozierenden                                                                                           |
| `phonenumber`        | ja       | "+49 621 4105 - 1724"                    | Telefonnummer des Dozierenden                                                                                    |
| `experience`         | nein     | "Mathematik, Podcasts, ..."              | Freitext, kann durch Front-End ebenfalls als JSON-Objekt im Stringformat gespeichert werden (`JSON.stringify()`) |
| `mainFocus_ids`      | nein     | 1                                        | Eindeutige ID eines Schwerpunktes                                                                                |
| `comment`            | nein     | "Sehr engagiert"                         | Freitext, kann durch Front-End ebenfalls als JSON-Objekt im Stringformat gespeichert werden (`JSON.stringify()`) |
| `is_extern`          | ja       | true                                     | Gibt an, ob ein Dozent extern ist - false = intern, true = extern                                                |
| `allow_manipulation` | ja       | true                                     | Gibt an, ob ein Dozent von **allen** Studiengangsleitern bearbeitbar ist                                         |
| `possible_lectures`  | nein     | "Datenbanken, Methoden der WI"           | Freitext, speichert potentielle Vorlesungen als String                                                           |

### Rückgabe - PUT /lecturers?lecturerId={ID}

```json
{
  "message": "Successfully updated",
  "payload": true
}
```

## DELETE /lecturers?lecturerId={ID}

**Info**: Löscht den angegebenen Dozenten mit der `lecturer_id` `{ID}`, sofern der Dozent dem Studiengangsleiter zugeordnet werden kann.

### Rückgabe - DELETE /lecturers?lecturerId={ID}

```json
{
  "message": "Successfully deleted",
  "payload": true
```

## /lecturerCV

### GET /lecturerCV?lecturerId={ID}

**Info**: Gibt den Lebenslauf als PDF zu dem angegebenen Dozent zurück.

### DEPRECATED - POST /lecturerCV?lecturerId={ID}

**Info**: Diese Route steht nur zur Verfügung, da es beim Testen schwierig sein kann, ein HTML-Form über PUT abzuschicken.
Bevorzugt sollte jedoch die folgende [`PUT`-Route](#put-lecturercvlectureridid) genutzt werden (Implementierung ist dieselbe).

### PUT /lecturerCV?lecturerId={ID}

**Info**: Lädt den Lebenslauf zum angegebenen Dozenten hoch.
Die Anfrage muss die Form-Data beinhalten, dabei muss der `name` auf `cv` gesetzt sein (z. B. `<input type="file" name="cv">`).
Für weitere Details gibt es Dokus/Tutorials/Beispiele:

- [React File Upload](https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/)
- [MDN - File Upload through JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript#Dealing_with_binary_data)
- eigenes Beispiel - Server muss gestartet sein:
  - für Back-End: [http://localhost:3000/testpdfupload.html](http://localhost:3000/testpdfupload.html)
  - für Front-End: [https://localhost/api/testpdfupload.html](https://localhost/api/testpdfupload.html)
  - [Quellcode](../../tests/testPdfUpload.html)

Ansonten einfach fragen.

### DELETE /lecturerCV?lecturerId={ID}

**Info**: Löscht den Lebenslauf zum angegebenen Dozenten.
