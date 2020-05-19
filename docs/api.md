# Schnittstellen - **STAND: 13.12.2019** <!-- omit in toc -->

## Vorwort <!-- omit in toc -->

Im Rahmen dieses Vorschlags zu den Schnittstellen wurde alles mit dem Link "https://exoplan.it" dargestellt. Das ist lediglich eine Idee und sollte durch die IP des Backend-Servers ersetzt werden.

- [/login](#login)
  - [POST /login](#post-login)
- [/logout](#logout)
  - [POST /logout](#post-logout)
- [/courses](#courses)
  - [GET /courses](#get-courses)
    - [Weitere Parameter /courses](#weitere-parameter-courses)
  - [POST /courses](#post-courses)
  - [PUT /courses/{id}](#put-coursesid)
  - [DELETE /courses/{id}](#delete-coursesid)
- [/semesterview](#semesterview)
  - [GET /semesterview](#get-semesterview)
    - [Weitere Parameter /semesterview](#weitere-parameter-semesterview)
  - [POST /semesterview](#post-semesterview)
  - [PUT /semesterview/{id}](#put-semesterviewid)
  - [DELETE /semesterview/{id}](#delete-semesterviewid)
- [/lecturers](#lecturers)
  - [GET /lecturers](#get-lecturers)
    - [Weitere Parameter /lecturers](#weitere-parameter-lecturers)
  - [POST /lecturers](#post-lecturers)
  - [PUT /lecturers/{id}](#put-lecturersid)
  - [DELETE /lecturers/{id}](#delete-lecturersid)
- [/lectures](#lectures)
  - [POST /lectures](#post-lectures)
  - [PUT /lectures/{id}](#put-lecturesid)
  - [DELETE /lectures/{id}](#delete-lecturesid)


## /login

- Fokus: Einloggen
- Benötigt für: _Erster Prototyp_ Seite 1

### POST /login

Body der Anfrage:
````json
{
    "username": "string",
    "password": "string"
}
````

## /logout

- Fokus: Logout
- Benötigt für: _Erster Prototyp_ Seite 2 (Abmelden Knopf)

### POST /logout

Body der Anfrage:
````json
{
    "token": "string"
}
````

## /courses

- Fokus: Kurse
- Benötigt für: _Erster Prototyp_ Seite 2 (Leiste mit allen eigenen Kursen)

### GET /courses

Rückgabe:
````json
{
    "data": [
        {
            "course_id": "number",
            "name": "string",
            "directorOfStudies": "string",
            "majorSubject": "string",
            "fieldOfStudy": "string"
        }
    ],
    "links": { // Beispielhaft befüllt
        "first": "https://exoplan.it/courses?page=1",
        "last": "https://exoplan.it/courses?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "type": "courses",
        "current_page": "number",
        "from": "number",
        "last_page": "number",
        "path": "https://exoplan.it/courses",
        "per_page": "number",
        "to": "number",
        "total": "number",
        "tags": {
            "directorOfStudies": "string",
        }
    }
}
````

#### Weitere Parameter /courses

- ``directorOfStudies``
  - filtert die Rückgabe
  - gibt lediglich die Kurse des angegebenen Dozenten zurück


### POST /courses

- Erzeugt einen neuen Kurs

Body der Anfrage:
````json
{
    "name": "string",
    "directorOfStudies": "number", // id des Studiengangleiters
    "majorSubject": "string",
    "fieldOfStudy": "string",
    "semesters": [
        {
            "name": "string",
            "number": "number",
            "start_date": "timestamp",
            "end_date": "timestamp"
        }
    ]
}
````

### PUT /courses/{id}

- Muss über die Route ``.../courses/{id}`` erfolgen, da es den spezifischen Kurs mit der angegebenen ``course_id`` aktualisiert.
- Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:
````json
{
    "name": "string",
    "directorOfStudies": "string",
    "majorSubject": "string",
    "fieldOfStudy": "string"
}
````

### DELETE /courses/{id}

- Muss über die Route ``.../courses/{id}`` erfolgen, da es den spezifischen Kurs mit der angegebenen ``course_id`` löscht.


## /semesterview

- Fokus: Semesteransicht
- Benötigt für: _Erster Prototyp_ Seite 3 (Semester [eines bestimmten] Kurses)
- Routenname auch noch änderbar, falls Ansicht einen eigenen Namen bekommt

### GET /semesterview

Rückgabe:
````json
{
    "data": [
        {
            "semester_id": "number",
            "name": "string",
            "start_date": "timestamp",
            "end_date": "timestamp",
            "course_id": "number", // referenziert einen bestimmten Kurs
            "moduleGroups": [
                {
                    "moduleGroup_id": "number",
                    "name": "string",
                    "number_of_modules_to_attend": "number",
                    "from_semester_number": "number",
                    "to_semester_number": "number",
                    "modules": [
                        {
                            "module_id": "number",
                            "name": "string",
                            "description": "string",
                            "catalog_id": "string",
                            "lectures": [
                                {
                                    "lecture_id": "number",
                                    "name": "string",
                                    "workload_home": "number",
                                    "workload_dhbw": "number",
                                    "catalog_id": "string",
                                    "mainFocus": {
                                        "name": "string"
                                    },
                                    "lecturer_state": "string",
                                    "dependend_lectures": [
                                        {
                                            "lecture_id": "number" // weitere Informationen wären redundant an der Stelle
                                        }
                                    ],
                                    "lecturer": { // falls vorhanden
                                        "lecturer_id": "number",
                                        "firstname": "string",
                                        "lastname": "string"
                                        // es könnten auch alle Attribute des Dozenten übergeben werden, diese sind jedoch nicht im Mockup bei dieser Ansicht vorhanden
                                    }
                                }
                            ],
                            "academicRecord": {
                                "academicRecord_id": "number",
                                "abbreviation": "string",
                                "type": "string",
                                "rated": "boolean" // benotet: Ja/Nein
                            }
                        }
                    ]
                }
            ]
        }
    ],
    "links": { // Beispielhaft befüllt
        "first": "https://exoplan.it/semesterview?page=1",
        "last": "https://exoplan.it/semesterview?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "type": "semesters",
        "current_page": "number",
        "from": "number",
        "last_page": "number",
        "path": "https://exoplan.it/semesterview",
        "per_page": "number",
        "to": "number",
        "total": "number",
        "tags": {
            "course_id": "number"
        }
    }
}
````

#### Weitere Parameter /semesterview

- ``course_id``
  - filtert die Rückgabe
  - gibt lediglich die Semester eines bestimmten Kurses zurück
  - dabei wird über die Datenbank bestimmt welche Modulgruppen ein Kurs belegen muss


### POST /semesterview

- Existiert nicht, da keine Semester erstellt werden können, sondern vom Backend beim Anlegen eines Kurses angegeben werden müssen

### PUT /semesterview/{id}

- Muss über die Route ``.../semesterview/{id}`` erfolgen, da es das spezifische Semester mit der angegebenen ``semester_id`` aktualisiert.
- Alle Attribute müssen erneut übergeben werden, da diese so aktualisiert werden bzw. alle notwendig sind.

Body der Anfrage:
````json
{
    "name": "string",
    "number": "number",
    "start_date": "timestamp",
    "end_date": "timestamp"
}
````

### DELETE /semesterview/{id}

- Vorerst nicht möglich.


## /lecturers

- Fokus: Dozenten
- Benötigt für: _Erster Prototyp_ Seiten 4 & 5

### GET /lecturers

Rückgabe:
````json
{
    "data": [
        {
            "lecturer_id": "number",
            "firstname": "string",
            "lastname": "string",
            "academic_title": "string",
            "email": "string",
            "salutation": "string",
            "phonenumber": "string",
            "experience": "string",
            "comment": "string",
            "is_extern": "number"
        }
    ],
    "links": { // Beispielhaft befüllt
        "first": "https://exoplan.it/lecturers?page=1",
        "last": "https://exoplan.it/lecturers?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "type": "lecturer",
        "current_page": "number",
        "from": "number",
        "last_page": "number",
        "path": "https://exoplan.it/lecturers",
        "per_page": "number",
        "to": "number",
        "total": "number",
        "tags": {
            "experience": "string",
            "comment": "string",
            "firstname": "string",
            "lastname": "string",
            "extern": "number"
        }
    }
}
````

#### Weitere Parameter /lecturers

- ``experience``
  - filtert die Rückgabe
  - gibt lediglich Dozenten mit dem angegebenen String im Freitextfeld ``experience`` zurück
- ``comment``
  - filtert die Rückgabe
  - gibt lediglich Dozenten mit dem angegebenen String im Freitextfeld ``comment`` zurück
- ``firstname``
  - filtert die Rückgabe
  - gibt lediglich Dozenten mit dem angegebenen String als Vornamen zurück (evtl. auch ähnliche? &rarr; Mueller = Müller etc.)
- ``lastname``
  - filtert die Rückgabe
  - gibt lediglich Dozenten mit dem angegebenen String als Nachnamen zurück (evtl. auch ähnliche? &rarr; Mueller = Müller etc.)
- ``extern``
  - filtert die Rückgabe
  - gibt ebenfalls externe Dozenten zurück
  - 0 = nur intern, 1 = intern&extern, 2 = nur extern


### POST /lecturers

- Erzeugt einen neuen Dozenten

Body der Anfrage:
````json
{
    "firstname": "string",
    "lastname": "string",
    "academic_title": "string",
    "email": "string",
    "salutation": "string",
    "phonenumber": "string",
    "experience": "string",
    "comment": "string",
    "is_extern": "number"
}
````

### PUT /lecturers/{id}

- Muss über die Route ``.../lecturers/{id}`` erfolgen, da es den spezifischen Dozenten mit der angegebenen ``lecturer_id`` aktualisiert.
- Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

Body der Anfrage:
````json
{
    "firstname": "string",
    "lastname": "string",
    "academic_title": "string",
    "email": "string",
    "salutation": "string",
    "phonenumber": "string",
    "experience": "string",
    "comment": "string",
    "is_extern": "number"
}
````

### DELETE /lecturers/{id}

- Muss über die Route ``.../lecturers/{id}`` erfolgen, da es den spezifischen Dozenten mit der angegebenen ``lecturer_id`` löscht.


## /lectures

- Fokus: Vorlesung Erstellen
- Benötigt für: _Erster Prototyp_ Seite 3
- Vorerst ohne GET - jedoch auch implementierbar, sofern benötigt
- Dienen nur dazu Vorlesungen zu speichern &rarr; Abfrage erfolgt über die ``/semesterview`` Route

### POST /lectures

- erzeugt eine neue Vorlesung

Body der Anfrage:
````json
{
    "name": "string",
    "workload_home": "number",
    "workload_dhbw": "number",
    "catalog_id": "string",
    "mainFocus": [
        {
            "mainFocus_id": "number"
        }
    ],
    "lecturer_state": "string", // angeschrieben etc.
    "lecturer_id": "number" // falls vorhanden
}
````

### PUT /lectures/{id}

- Muss über die Route ``.../lectures/{id}`` erfolgen, da es die spezifische Vorlesung mit der angegebenen ``lecture_id`` aktualisiert.
- Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen. (Bspw. Falls ein Dozent abspringt.)

Body der Anfrage:
````json
{
    "name": "string",
    "workload_home": "number",
    "workload_dhbw": "number",
    "catalog_id": "string",
    "mainFocus": {
        "name": "string"
    },
    "lecturer_state": "string", // angeschrieben etc.
    "lecturer_id": "number" // falls vorhanden
}
````

### DELETE /lectures/{id}

- Muss über die Route ``.../lectures/{id}`` erfolgen, da es die spezifische Vorlesung mit der angegebenen ``lecture_id`` löscht.
