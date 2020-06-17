# /modulecatalog <!-- omit in toc -->

- [GET /modulecatalog?majorSubjectId={ID}](#get-modulecatalogmajorsubjectidid)
  - [Rückgabe](#rückgabe)
  - [Attribute der Anfrage - GET /modulecatalog?majorSubjectId={ID}](#attribute-der-anfrage---get-modulecatalogmajorsubjectidid)
- [POST /moduleGroups](#post-modulegroups)
  - [Body der Anfrage - POST /moduleGroups](#body-der-anfrage---post-modulegroups)
  - [Attribute der Anfrage - POST /moduleGroups](#attribute-der-anfrage---post-modulegroups)
  - [Rückgabe - POST /moduleGroups](#rückgabe---post-modulegroups)
- [PUT /moduleGroups?moduleGroupId={ID}](#put-modulegroupsmodulegroupidid)
  - [Body der Anfrage - PUT /moduleGroups?moduleGroupId={ID}](#body-der-anfrage---put-modulegroupsmodulegroupidid)
  - [Attribute der Anfrage - PUT /moduleGroups?moduleGroupId={ID}](#attribute-der-anfrage---put-modulegroupsmodulegroupidid)
  - [Rückgabe - PUT /moduleGroups?moduleGroupId={ID}](#rückgabe---put-modulegroupsmodulegroupidid)
- [DELETE /moduleGroups?moduleGroupId={ID}](#delete-modulegroupsmodulegroupidid)
  - [Rückgabe - DELETE /moduleGroups?moduleGroupId={ID}](#rückgabe---delete-modulegroupsmodulegroupidid)

## GET /modulecatalog?majorSubjectId={ID}

**Info**: Gibt alle Modulkataloge zu einer angegebenen Studienrichtung (innerhalb eines Studiengangs) zurück.
Dies umfasst also die Modulgruppen, die Module und die (abstrakten) Vorlesungen.

### Rückgabe

```json
{
    "message": "Successful",
    "payload": {
        "MajorSubject": {
            "majorSubject_id": 0,
            "name": "[NAME]",
            "createdAt": "[DATUM]",
            "updatedAt": "[DATUM]",
            "fieldOfStudy_id": 0,
            "FieldOfStudy": {
                "fieldOfStudy_id": 0,
                "name": "[NAME]",
                "createdAt": "[DATUM]",
                "updatedAt": "[DATUM]"
            }
        },
        "ModuleGroups": [
            {
                "moduleGroup_id": 0,
                "name": "[NAME]",
                "number_of_modules_to_attend": 0,
                "from_semester_number": 0,
                "to_semester_number": 0,
                "createdAt": "[DATUM]",
                "updatedAt": "[DATUM]",
                "majorSubject_id": 0,
                "Modules": [
                    {
                        "module_id": 0,
                        "name": "[NAME]",
                        "description": "",
                        "ects": 0,
                        "catalog_id": "[KATALOG_ID]",
                        "number_of_lectures_to_attend": 0,
                        "rated": true,
                        "requirements": "Keine",
                        "createdAt": "[DATUM]",
                        "updatedAt": "[DATUM]",
                        "moduleGroup_id": 0,
                        "AcademicRecords": [
                            {
                                "academicRecord_id": 0,
                                "abbreviation": "[ABKÜRZUNG]",
                                "type": "[ART]",
                                "createdAt": "[DATUM]",
                                "updatedAt": "[DATUM]",
                                "module_academicRecord": {
                                    "createdAt": "[DATUM]",
                                    "updatedAt": "[DATUM]",
                                    "academicRecord_id": 0,
                                    "module_id": 0
                                }
                            }
                        ],
                        "Lectures": [
                            {
                                "lecture_id": 0,
                                "name": "[NAME]",
                                "workload_home": 0,
                                "workload_dhbw": 0,
                                "catalog_id": "[KATALOG_ID]",
                                "createdAt": "[DATUM]",
                                "updatedAt": "[DATUM]",
                                "module_id": 0,
                                "MainFocuses": [
                                    {
                                        "mainFocus_id": 0,
                                        "name": "[NAME]",
                                        "createdAt": "[DATUM]",
                                        "updatedAt": "[DATUM]",
                                        "lecture_mainFocus": {
                                            "createdAt": "[DATUM]",
                                            "updatedAt": "[DATUM]",
                                            "lecture_id": 0,
                                            "mainFocus_id": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

### Attribute der Anfrage - GET /modulecatalog?majorSubjectId={ID}

| Attribut                             | Beispielwert            | Erklärung                                                                |
| ------------------------------------ | ----------------------- | ------------------------------------------------------------------------ |
| `ModuleGroups`                       | [ ]                     | Array der Studiengänge                                                   |
| `___moduleGroup_id`                  | 1                       | Eindeutige ID der Modulgruppe                                            |
| `___name`                            | "Wirtschaftsinformatik" | Name des Studiengangs                                                    |
| `___number_of_modules_to_attend`     | 1                       | Anzahl Module, die im Rahmen der Modulgruppe besucht werden müssen       |
| `___from_semester_number`            | 1                       | Zeitfenster, in welchen Semestern die Modulgruppe angelegt werden muss   |
| `___to_semester_number`              | 1                       | Zeitfenster, in welchen Semestern die Modulgruppe angelegt werden muss   |
| `___majorSubject_id`                 | 1                       | Eindeutige ID des Schwerpunktes                                          |
| `___Modules`                         | [ ]                     | Array von Modulen                                                        |
| `______module_id`                    | 1                       | Eindeutiger Bezeichner des Modules                                       |
| `______name`                         | "Integrationsseminar"   | Name des Modules                                                         |
| `______description`                  | "..."                   | Beschreibung des Moduls aus dem Modulkatalog                             |
| `______ects`                         | 1                       | ECTS-Punkte des Moduls                                                   |
| `______catalog_id`                   | 1                       | Kennzeichnung aus dem Modulkatalog der DHBW                              |
| `______number_of_lectures_to_attend` | 1                       | Anzahl Vorlesungen, die im Rahmen des Moduls besucht werden müssen       |
| `______requirements`                 | "Anfoderung"            | Freitext, Für Teilnahme an Vorlesung benötigte Grundlagen bzw. Vorwissen |
| `______moduleGroup_id`               | 1                       | Eindeutige ID der Modulgruppe                                            |
| `______AcademicRecords`              | [ ]                     | Array der Prüfungsleistungen                                             |
| `_________academicRecord_id`         | 1                       | Eindeutige ID der Prüfungsleistung                                       |
| `_________abbreviation`              | "K"                     | Abkürzung der Prüfungsleistung                                           |
| `_________type`                      | "Klausur"               | Art der Prüfungsleistung                                                 |
| `_________rated`                     | true                    | Wird die Prüfungsleistung benotet                                        |
| `_________module_academicRecord`     | { }                     | Objekt der Zwischentabelle Modul-Prüfungsleistung                        |
| `____________academicRecord_id`      | 1                       | Eindeutige ID der Prüfungsleistung                                       |
| `____________module_id`              | 1                       | Eindeutige ID des Moduls                                                 |
| `______Lectures`                     | [ ]                     | Array von Vorlesungen                                                    |
| `_________lecture_id`                | 1                       | Eindeutiger Bezeichner einer Vorlesung                                   |
| `_________name`                      | ""                      | Name der Vorlesung                                                       |
| `_________workload_home`             | 1                       | Präsenzstudium; Einheit: Stunden                                         |
| `_________workload_dhbw`             | 1                       | Selbststudium; Einheit: Stunden                                          |
| `_________catalog_id`                | 1                       | Kennzeichnung aus dem Modulkatalog der DHBW                              |
| `_________module_id`                 | 1                       | Eindeutige ID des Moduls                                                 |
| `_________MainFocuses`               | [ ]                     | Array von Schwerpunkten der Vorlesung                                    |
| `____________mainFocus_id`           | 1                       | Eindeutige ID des Schwerpunktes                                          |
| `____________name`                   | "IT-Security"           | Name des Schwerpunktes                                                   |
| `____________lecture_mainFocus`      | { }                     | Objekt der Zwischentabelle Schwerpunkt-Vorlesung                         |
| `_______________lecture_id`          | 1                       | Eindeutige ID der abstrakten Vorlesung                                   |
| `_______________mainFocus_id`        | 1                       | Eindeutige ID des Schwerpunktes                                          |

## POST /moduleGroups

**Info**: Erzeugt eine neue Modulgruppe (inklusive der dazugehörigen Module sowie abstrakten Vorlesungen).

### Body der Anfrage - POST /moduleGroups

```json
{
    "majorSubject_id": 0,
    "name": "[NAME]",
    "number_of_modules_to_attend": 0,
    "from_semester_number": 0,
    "to_semester_number": 0,
    "Modules": [
        {
            "name": "[NAME]",
            "description": "[BESCHREIBUNG]",
            "ects": 0,
            "catalog_id": "[KATALOG-ID]",
            "academicRecord_ids": [ 0, 0 ],
            "number_of_lectures_to_attend": 0,
            "rated": true,
            "requirements": "[ANFODERUNGEN]",
            "Lectures": [
                {
                    "name": "[NAME]",
                    "workload_home": "[SELBSTSTUDIUM]",
                    "workload_dhbw": "[PRÄSENZZEIT]",
                    "catalog_id": "[KATALOG-ID]",
                    "mainFocus_ids": [ 0, 0 ]
                }
            ]
        }
    ]
}
```

### Attribute der Anfrage - POST /moduleGroups

| Attribut                      | Erfodert | Beispielwert                                  | Erklärung                                                              |
| ----------------------------- | -------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| `majorSubject_id`             | ja       | 1                                             | Eindeutige ID der Studienrichtung                                      |
| `name`                        | ja       | "Profil I"                                    | Name der Studienrichtung                                               |
| `number_of_modules_to_attend` | ja       | 1                                             | Anzahl Module, die im Rahmen der Modulgruppe besucht werden müssen     |
| `from_semester_number`        | ja       | 3                                             | Zeitfenster, in welchen Semestern die Modulgruppe angelegt werden muss |
| `to_semester_number`          | ja       | 4                                             | Zeitfenster, in welchen Semestern die Modulgruppe angelegt werden muss |
| `Modules`                     | ja       | [ ]                                           | Array von Modulen                                                      |
| `___name`                     | ja       | "Technische Grundlagen mobiler Applikationen" | Name des Moduls                                                        |
| `___description`              | ja       | "Technische Grundlagen mobiler Applikationen" | Beschreibung des Moduls                                                |

### Rückgabe - POST /moduleGroups

```json
{
    "message": "Successfully created",
    "payload": {
        "moduleGroup_id": 0,
        "majorSubject_id": 0,
        "name": "[NAME]",
        "number_of_modules_to_attend": 0,
        "from_semester_number": 0,
        "to_semester_number": 0,
        "Modules": [
            {
                "module_id": 0,
                "name": "[NAME]",
                "description": "[BESCHREIBUNG]",
                "ects": 0,
                "catalog_id": "[KATALOG_ID]",
                "number_of_lectures_to_attend": 0,
                "rated": true,
                "requirements": "[ANFORDERUNGEN]",
                "Lectures": [
                    {
                        "lecture_id": 0,
                        "name": "[NAME]",
                        "workload_home": 0,
                        "workload_dhbw": 0,
                        "catalog_id": "[KATALOG_ID]",
                        "createdAt": "[DATUM]",
                        "updatedAt": "[DATUM]",
                        "module_id": 0
                    }
                ],
                "moduleGroup_id": 0,
                "updatedAt": "[DATUM]",
                "createdAt": "[DATUM]"
            }
        ],
        "updatedAt": "[DATUM]",
        "createdAt": "[DATUM]"
    }
}
```

## PUT /moduleGroups?moduleGroupId={ID}

**Info**: Aktualisiert eine Modulgruppe eines Modulkatalogs mit der `moduleGroup_id` `{ID}`.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

### Body der Anfrage - PUT /moduleGroups?moduleGroupId={ID}

```json
{
    "majorSubject_id": 0,
    "name": "[NAME]",
    "number_of_modules_to_attend": 0,
    "from_semester_number": 0,
    "to_semester_number": 0,
    "Modules": [
        {
            "module_id": 0,
            "name": "[NAME]",
            "description": "[BESCHREIBUNG]",
            "ects": 0,
            "catalog_id": "[KATALOG-ID]",
            "academicRecord_ids": [ 0, 0 ],
            "number_of_lectures_to_attend": 0,
            "rated": true,
            "requirements": "[ANFODERUNGEN]",
            "Lectures": [
                {
                    "lecture_id": 0,
                    "name": "[NAME]",
                    "workload_home": "[SELBSTSTUDIUM]",
                    "workload_dhbw": "[PRÄSENZZEIT]",
                    "catalog_id": "[KATALOG-ID]",
                    "mainFocus_ids": [ 0, 0 ]
                }
            ]
        }
    ]
}
```

### Attribute der Anfrage - PUT /moduleGroups?moduleGroupId={ID}

| Attribut                      | Erfodert | Beispielwert                                  | Erklärung                                                              |
| ----------------------------- | -------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| `majorSubject_id`             | ja       | 1                                             | Eindeutige ID der Studienrichtung                                      |
| `name`                        | ja       | "Profil I"                                    | Name der Studienrichtung                                               |
| `number_of_modules_to_attend` | ja       | 1                                             | Anzahl Module, die im Rahmen der Modulgruppe besucht werden müssen     |
| `from_semester_number`        | ja       | 3                                             | Zeitfenster, in welchen Semestern die Modulgruppe angelegt werden muss |
| `to_semester_number`          | ja       | 4                                             | Zeitfenster, in welchen Semestern die Modulgruppe angelegt werden muss |
| `Modules`                     | ja       | Array                                         | Array von Modulen                                                      |
| `___name`                     | ja       | "Technische Grundlagen mobiler Applikationen" | Name des Moduls                                                        |
| `___description`              | ja       | "Technische Grundlagen mobiler Applikationen" | Beschreibung des Moduls                                                |

### Rückgabe - PUT /moduleGroups?moduleGroupId={ID}

```json
{
    "message": "Successfully updated",
    "payload": true
}
```

## DELETE /moduleGroups?moduleGroupId={ID}

**Info**: Löscht die Modulgruppe mit der angegebenen `moduleGroup_id` `{ID}` (inklusive der dazugehörigen Module sowie abstrakten Vorlesungen).

### Rückgabe - DELETE /moduleGroups?moduleGroupId={ID}

```json
{
    "message": "Successfully deleted",
    "payload": true
}
```
