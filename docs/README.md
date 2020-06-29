# Schnittstellen <!-- omit in toc -->
<!-- aWRpb3RlbnNpY2hlcmVzIEhhbmRidWNoIGbDvHIgRnJvbnQtRW5kLUVudHdpY2tsZXIsIGRpZSBJZGlvdGVuIQ== -->
## Inhalt <!-- omit in toc -->

- [Logik](#logik)
- [Dokumente](#dokumente)
- [Authentifizierung](#authentifizierung)
- [Rückgabe Allgemein](#rückgabe-allgemein)
- [Fehlermeldungen](#fehlermeldungen)
- [Sonstiges](#sonstiges)

## Logik

Folgende Punkte sind zunächst wichtig zu verstehen:

- Das Back-End ist auf die gesamte DHBW ausgelegt
  - mehrere Studiengänge sowie Studienrichtungen sind erlaubt
- Jeder Kurs besitzt einen Hauptverantwortlichen (Studiengangsleiter), welcher den Kurs betreut
  - Zudem können weitere Verantwortliche (Studiengangsleiter) hinzugefügt werden &rarr; weiteres im Kurs-Dokument
- Vorlesungen sind zunächst abstrakt und nur Teil eines Moduls (Modulkatalogs)
- Kurse besuchen Präsentationen, welche die konkreten Vorlesungen abbilden
- Präsentationen beinhalten dabei lediglich Referenzen zu Vorlesungen, Kursen sowie Dozierenden
- Dozierende können allgemein eingesehen werden
- Dozierende werden von einem Studiengangsleiter angelegt und gehören zu diesem
<!-- - Dozierende können von einem Studiengangsleiter zu einem anderen übertragen werden -->
- Studiengangsleiter müssen sich selbst ebenfalls als Dozierenden anlegen

Generelles Vorgehen (unabhängig von anderen Routen):

1. Registrieren als Studiengangsleiter
2. Anlegen von Studiengängen
3. Anlegen von Studienrichtungen
4. Anlegen von Schwerpunkten
5. Anlegen von Bewertungsmethoden

(Abhängig von anderen Routen)

1. Anlegen von Kursen - benötigt eine Studienrichtung und einen Studiengangsleiter (wird automatisch gesetzt)
1. Anlegen von Semestern im Kurs - benötigt einen Studiengangsleiter, dieser ist im _Token_ enthalten.
1. Anlegen von Dozierenden - benötigt Schwerpunkt(e), um seitens FE gefunden werden
1. Anlegen von **Modulgruppen, welche Module und abstrakte Vorlesungen beinhalten** - benötigen Bewertungsmethoden sowie Schwerpunkten und Studienrichtung
1. Anlegen von Präsentationen - benötigen eine Modulgruppe (inkl. Modulen und abstrakten Vorlesungen) sowie einen Kurs (inkl. Semester)

In den jeweiligen Dokumentationen finden sich dazu die Schnittstellen sowie eine Dokumentation der zu verwendenden Attribute.
Diese werden in Tabellen dargestellt.
Sofern ein Attribut drei Unterstriche ("___") oder ein Vielfaches davon hat, ist dies als Bestandteil des vorhergehenden Objekts mit weniger Unterstrichen zu betrachten.

## Dokumente

- Studiengangsleiter
  - Registrieren und Anmelden: [auth.md](apis/auth.md)
- Studienrichtung & Studiengang
  - Anlegen, Auslesen, Verändern und Löschen: [fieldsOfStudy.md (Studiengang)](apis/fieldsOfStudy.md) & [majorSubjects.md (Studienrichtung)](apis/majorSubjects.md)
- Schwerpunkte & Bewertungsmethoden
  - Anlegen, Auslesen, Verändern und Löschen: [mainFocuses.md (Schwerpunkte)](apis/mainFocuses.md) & [academicRecords.md (Bewertungsmethoden)](apis/academicRecords.md)
- Kurse und ihre Semester
  - Anlegen, Auslesen (nur über Kurse), Verändern und Löschen: [courses.md (Kurse)](apis/courses.md) & [semesters.md (Semester)](apis/semesters.md)
  - GoogleCalendar Informationen: [googleCalendar.md](apis/googleCalendar.md)
- Dozierende
  - Anlegen, Auslesen, Verändern und Löschen: [lecturers.md](apis/lecturers.md)
- Modul-Gruppe &rarr; `GET` ist der Modulkatalog
  - Anlegen, Auslesen, Verändern und Löschen: [moduleGroups.md (Modulgruppen, Module, Vorlesungen)](apis/moduleGroups.md)
- Präsentationen (konkrete Vorlesungen)
  - Anlegen, Auslesen, Verändern und Löschen: [presentations.md](apis/presentations.md)
- Übertragen von Dozierenden/Kursen/Vorlesungen
  - [transferOwnership.md](apis/transferOwnership.md)

## Authentifizierung

Bei nahezu allen Routen wird geprüft, ob die entsprechende Aktion autorisiert bzw. der Nutzer authentisiert ist.
Dafür muss ein Token (JWT), der beim Login ausgestellt wurde, als URL-Query-Parameter angegeben werden.
Bsp.:

```http
GET /courses?token=eyJpe0JEKTAiOjAsImFsZyI6IkhTMjU2IiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGlyZWN0b3JPZlN0dWRpZXNfaWQiOjEsImlhdCI6MTU5MjE3NjQ4MCwiZXhwIjoxNTk4MTM4MDgwfQ.CFzby-2_Q6h-_LsP_dP7IIzyL5ozu_UdV-dzyJdnQAk
```

Der hier verwendete Token gilt als "Long-Term-Token", ist somit bis Ende August gültig und kann zum Testen (sofern vorher ein Nutzer/Studiengangsleiter mit der `ID 1` angelegt wurde) verwendet werden.
Ein Beispiel für eine Route, bei der kein gültiger Token übergeben werden muss, ist `POST /login`.

## Rückgabe Allgemein

Allgemeiner Rückgabe-Aufbau:

- Integer werden als `0` gekennzeichnet.
- Strings werden durch `"[NAME]"` gekennzeichnet und beinhalten einen beschreibenden Namen.
- Boolean werden als `true` gekennzeichnet.
- Arrays können mehrere Objekte beinhalten. Es wird in der Dokumentation jedoch nur ein Objekt repräsentativ eingesetzt.
- Der Payload der `GET` und `POST`-Methoden enthält für jedes vorhandene Objekt aus der Datenbank **immer** eine `ID` des Objektes. Dazu mehr in den jeweiligen Abschnitten.

```json
{
    "message": "[DEBUG-INFO/KOMMENTAR]",
    "payload": {

    }
}
```

| Attribut  | Beispielwert | Erklärung                                                |
| --------- | ------------ | -------------------------------------------------------- |
| `message` | "Successful" | Debug-Info bzw. Kommentar zur Anfrage                    |
| `payload` | { }          | Objekt der Rückgabe, beinhaltet eine Antwort zur Anfrage |

Wenn im Folgenden keine Rückgabe gezeigt ist, dann wird lediglich eine `message` gesetzt und das `payload`-Objekt ist leer.

## Fehlermeldungen

| HTTP-Code | Meldung                   | Erklärung                                     | Lösung                                                                                                                                                      |
| --------- | ------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `4xx`     | Spezifische Fehlermeldung | Fehlende Attribute etc. erzeugen einen Fehler | API richtig verwenden                                                                                                                                       |
| `500`     | Internal Server Error     | potentieller Fehler im Back-End               | API nachlesen, dass alles passt, falls jedoch alles richtig ist: Dem Back-End melden, wie der Fehler reproduziert werden kann &rarr; Back-End behebt Fehler |

## Sonstiges

Routen, die nicht existieren, werden nicht dargestellt.
