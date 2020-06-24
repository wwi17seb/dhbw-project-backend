# /googleCalendar <!-- omit in toc -->

- [GET /googleCalendar](#get-googlecalendar)
  - [Rückgabe - GET /googleCalendar](#rückgabe---get-googlecalendar)
  - [Attribute der Anfrage GET /googleCalendar](#attribute-der-anfrage-get-googlecalendar)
- [PUT /googleCalendar](#put-googlecalendar)
  - [Body der Anfrage - PUT /googleCalendar](#body-der-anfrage---put-googlecalendar)
  - [Attribute der Anfrage - PUT /googleCalendar](#attribute-der-anfrage---put-googlecalendar)
  - [Rückgabe - PUT /googleCalendar](#rückgabe---put-googlecalendar)

## GET /googleCalendar

**Info**: Gibt alle Infos zum Google Kalender zurück.

### Rückgabe - GET /googleCalendar

```json
{
    "message": "Successful",
    "payload": {
        "GoogleCalendar": {
            "apiKey": "[API-KEY]"
        }
    }
}
```

### Attribute der Anfrage GET /googleCalendar

| Attribut         | Beispielwert | Erklärung                         |
| ---------------- | ------------ | --------------------------------- |
| `GoogleCalendar` | { }          | Objekt des Google Kalender        |
| `___apiKey`      |              | API-Schlüssel des Google Kalender |

## PUT /googleCalendar

**Info**: Aktualisiert die Infos zum Google Calendar.
Diese Route ist nur für Admins zugänglich.
Alle Attribute müssen erneut übergeben werden, um auch das Löschen von Attributen einfach zu ermöglichen.

### Body der Anfrage - PUT /googleCalendar

```json
{
    "apiKey": "[API-KEY]"
}
```

### Attribute der Anfrage - PUT /googleCalendar

| Attribut | Erfodert | Beispielwert | Erklärung                         |
| -------- | -------- | ------------ | --------------------------------- |
| `apiKey` | ja       |              | API-Schlüssel des Google Kalender |

### Rückgabe - PUT /googleCalendar

```json
{
    "message": "Successfully updated",
    "payload": true
}
```
