<p align="center">
  <a href="https://github.com/wwi17seb?q=%22dhbw-project-%22">
    <img src="https://github.com/wwi17seb/dhbw-project-frontend/blob/master/src/images/ExoPlanLogo_transparent.png" alt="ExoPlan Logo" width="400">
  </a>

  <!--<h3 align="center">a.k.a. Peojekt</h3>-->

  <p align="center">
    <b><a href="https://github.com/wwi17seb/dhbw-project-backend">dhbw-project-backend</a></b>
    •
    <a href="https://github.com/wwi17seb/dhbw-project-frontend">dhbw-project-frontend</a>
    •
    <a href="https://github.com/wwi17seb/dhbw-project-documentation">dhbw-project-documentation</a>
  </p>

  <p align="center">
    <a href="https://github.com/wwi17seb/dhbw-project-backend/releases"
    ><img src="https://img.shields.io/badge/version-2.0-informational" alt="v2.0"
    ></a>
    <a href="https://youtu.be/dQw4w9WgXcQ"
    ><img src="https://img.shields.io/badge/build-success-success" alt="build status"
    ></a>
    <a href="https://youtu.be/dQw4w9WgXcQ" title="Manual Test Coverage"
    ><img src="https://img.shields.io/badge/coverage-93%25-success" alt="test coverage: 93%"
    ></a>
    <a href="https://github.com/wwi17seb/dhbw-project-backend/blob/master/LICENSE"
    ><img src="https://img.shields.io/badge/license-MIT-success" alt="MIT License"
    ></a>
  </p>
</p>

## Content <!-- omit in toc -->

- [backend usage](#backend-usage)
  - [common setup](#common-setup)
  - [for backend developers](#for-backend-developers)
  - [for frontend developers](#for-frontend-developers)
  - [for demo usage (exoplan project)](#for-demo-usage-exoplan-project)
  - [shutdown or rebuilding the whole docker network](#shutdown-or-rebuilding-the-whole-docker-network)
- [prettier setup](#prettier-setup)
- [postman setup](#postman-setup)
- [login](#login)
- [local files](#local-files)
- [routes](#routes)
  - [general information](#general-information)
  - [current status](#current-status)

# backend usage

## common setup

1.  Clone this project and checkout the master branch.
2.  Create a folder `env`.
3.  Create a file `app.properties` inside the env folder with the following properties (example values):

    ```
    app.port = 3000
    app.defaultUser = admin
    app.defaultPassword = defaultpasswordhere
    app.isAdmin = true
    app.forceSync = false
    app.enableTestData = false

    server.user     = dhbw
    server.database = becker
    server.password = iH0p3youU5EaSecretPa$$word
    server.port = 5432
    server.dialect = postgres
    jwt.superSecret = TreevgQreNefpuUngHroreunhcgAvpugfTrznpug13
    server.host = postgres

    pepper = ErarFgvaxg

    ```

4.  Create a file `.env` inside the `docker` folder with the following properties (example). Be sure, that the postgres password and user are like the server config in `app.properties`:

    ```
    postgres_user=dhbw
    postgres_password=iH0p3youU5EaSecretPa$$word
    postgres_port=5432
    pgadmin_user=project@dhbw.de
    pgadmin_password=test1234
    ```

5.  Copy the server certifcates into the `/docker/nginx/ssl` directory. Example certificate files can be found [here](https://1drv.ms/u/s!AudF6y3_chu503dmGqNPxsRwkyir?e=E5sMmD).

## for backend developers

1. Do the common steps.
2. Install all node modules:

   ```
   npm install
   ```

3. Change the `server.host` in the `app.properties` file to `localhost`.
4. Open terminal and start docker:

   ```
   ...\dhbw-project-backend> cd .\docker\
   ...\dhbw-project-backend\docker> docker-compose -f docker-compose-backend.yaml up --build
   ```

5. Open a second terminal and start your app. For deploying we suggest to use `nodemon`:
   ```
   node app.js or nodemon app.js
   ```

## for frontend developers

1. After the common setup steps, please start the backend:
   ```
   ...\dhbw-project-backend> cd .\docker\
   ...\dhbw-project-backend\docker> docker-compose -f docker-compose-frontend.yaml up --build
   ```
2. The backend APIs are available at: https://localhost/api/{ressource}

## for demo usage (exoplan project)

1. Clone front- and backend into the same directory
2. Be sure, that the common steps are done.
3. Start the project.
   ```
   ...\dhbw-project-backend> cd .\docker\
   ...\dhbw-project-backend\docker> docker-compose up --build
   ```

## shutdown or rebuilding the whole docker network

```
...\dhbw-project-backend\docker> docker-compose down

OR

...\dhbw-project-backend\docker> docker-compose -f docker-compose-backend.yaml down

OR

...\dhbw-project-backend\docker> docker-compose -f docker-compose-frontend.yaml down

```

# prettier setup

[Prettier](https://prettier.io/) is a useful tool to format the code in a standard way.

Install `Prettier - Code formatter` from Esben Petersen as vs-code-extension.

There's a [.prettierrc.json](.prettierrc.json) in the root directory of this repository, which defines how the code should be formatted.

You can use prettier by right clicking in the editor inside a code file.
`Format Document With`: and choose `Prettier - Code formatter` or `Alt + Shift + F` (Windows) / `Command + Shift + F` (Mac).

# postman setup

1. Install postman.
2. Use the import function and import the collection and environments found inside the [postman](/postman) folder.
3. Select the correct environment for your usage and you are ready\* to go.
   1. "Peojekt-Backend" is for backend developers.
   2. "Peojekt-Frontend" is for frontend developers.
4. [frontend-only] When using postman to verify the routes please disable ssl certificate verification in postman.
   1. Disable _file &rarr; settings &rarr; ssl certificate verification_.****

\* Important Note: To use the route addLecturerCV you need to access an PDF File on your computer. There already is an example file ("resume.pdf") within the postman-folder. To access it you either have to set your Postman-Working-Directory (Settings -> General -> Working directory section) to your Postman folder within the Peojekt-Backend structure. (e. g. "/Users/[yourName]/Documents/GitHub/dhbw-project-backend/postman"). It is also possible to select an own pdf-file in your current working directory or select the option to give access outside the working directory. 

\* Routes that require an ID need to be filled by you.
These parameters have the value `[REQUIRED]` and need to be updated by you.

\* There are two collections that can be used for testing. The Peoject-Test Collection provides status tests for every route in a logical order. In addition to that you can use the Project-Test-Errors Collection to check on error status-messages for e.g. wrong use of the route or missing permissions. Make sure to run Peojekt-Test before Peoject-Test-Errors to have everything setup properly.


# login

You can use `admin` as login name with password `test` or its token `eyJpe0JEKTAiOjAsImFsZyI6IkhTMjU2IiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGlyZWN0b3JPZlN0dWRpZXNfaWQiOjEsImlhdCI6MTU5MjE3NjQ4MCwiZXhwIjoxNTk4MTM4MDgwfQ.CFzby-2_Q6h-_LsP_dP7IIzyL5ozu_UdV-dzyJdnQAk` to authenticate yourself.
To see how authentication with the token works take a look at the postman collection.
(It uses this token as variable `{{token}}`.)

# local files

PDF files are stored in `pdf`-folder which will be created automatically if `app.forceSync` is set to true.
For better structuring there is a subfolder for each type of PDF files.
Currently we only store CVs of lecturers in `pdf/cv`.
The files are named `{ID}.pdf` where `{ID}` is the `lecturer_id` of the corresponding lecturer.

There is a configuration file where the register key and Google API key is saved.
It is automatically updated when one of the corresponding routes is called and created when `app.forceSync` is set to true.
The file `keys.json` has the following format:

```json
{
   "registerKey": "used to create an account",
   "googleCalendar": {
      "apiKey": "api key",
      "[further keys]": "[further values]"
   }
}
```

# routes

## general information

If you want to know how to use the routes and speak german, take a look at the postman collection or the [api docs](docs/README.md).
If you want to know more about our database design and speak german, take a look at our [database documentation](docs/database/README.md)

## current status

| route name                                                                 | http method | route                | parameters                                                                               | status             | docs                                                    |
| -------------------------------------------------------------------------- | ----------- | -------------------- | ---------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------- |
| Login                                                                      | `POST`      | `/login`             |                                                                                          | :white_check_mark: | [auth.md](/docs/apis/auth.md)                           |
| [EOL] Signup                                                               | -           | -                    |                                                                                          | :no_entry:         | [auth.md](/docs/apis/auth.md)                           |
| Register with register key                                                 | `POST`      | `/register`          |                                                                                          | :white_check_mark: | [auth.md](/docs/apis/auth.md)                           |
| Change own password                                                        | `PUT`       | `/changePassword`    | `directorOfStudiesId`                                                                    | :white_check_mark: | [directorOfStudies.md](/docs/apis/directorOfStudies.md) |
| Get all attributes to the current director of studies                      | `GET`       | `/directorOfStudies` | `token`                                                                                  | :white_check_mark: | [directorOfStudies.md](/docs/apis/directorOfStudies.md) |
| Update the current director of studies                                     | `PUT`       | `/directorOfStudies` | `token`                                                                                  | :white_check_mark: | [directorOfStudies.md](/docs/apis/directorOfStudies.md) |
| [Admin routes] Get all users                                               | `GET`       | `/users`             | `token`                                                                                  | :white_check_mark: | [admin.md](/docs/apis/admin.md)                         |
| [Admin routes] Create new director of studies                              | `POST`      | `/createUser`        | `token`                                                                                  | :white_check_mark: | [admin.md](/docs/apis/admin.md)                         |
| [Admin routes] Reset password of director of studies                       | `PUT`       | `/resetPassword`     | `token`, `directorOfStudiesId`                                                           | :white_check_mark: | [admin.md](/docs/apis/admin.md)                         |
| [Admin routes] Give director of studies admin privileges                   | `PUT`       | `/upgradeToAdmin`    | `token`, `directorOfStudiesId`                                                           | :white_check_mark: | [admin.md](/docs/apis/admin.md)                         |
| [Admin routes] Get register key                                            | `GET`       | `/registerKey`       | `token`                                                                                  | :white_check_mark: | [admin.md](/docs/apis/admin.md)                         |
| [Admin routes] Update register key                                         | `PUT`       | `/registerKey`       | `token`                                                                                  | :white_check_mark: | [admin.md](/docs/apis/admin.md)                         |
| Get google calender api key                                                | `GET`       | `/googleCalendarAPI` | `token`                                                                                  | :white_check_mark: | [googleCalendar.md](/docs/apis/googleCalendar.md)       |
| [Admin routes] Update google calender api key                              | `PUT`       | `/googleCalendarAPI` | `token`                                                                                  | :white_check_mark: | [googleCalendar.md](/docs/apis/googleCalendar.md)       |
| Get all courses                                                            | `GET`       | `/courses`           | `token`                                                                                  | :white_check_mark: | [courses.md](/docs/apis/courses.md)                     |
| Create a course                                                            | `POST`      | `/courses`           | `token`                                                                                  | :white_check_mark: | [courses.md](/docs/apis/courses.md)                     |
| Update a course                                                            | `PUT`       | `/courses`           | `token`, `courseId`                                                                      | :white_check_mark: | [courses.md](/docs/apis/courses.md)                     |
| Delete a course                                                            | `DELETE`    | `/courses`           | `token`, `courseId`                                                                      | :white_check_mark: | [courses.md](/docs/apis/courses.md)                     |
| Create a semester                                                          | `POST`      | `/semesters`         | `token`                                                                                  | :white_check_mark: | [semesters.md](/docs/apis/semesters.md)                 |
| Update a semester                                                          | `PUT`       | `/semesters`         | `token`, `semesterId`                                                                    | :white_check_mark: | [semesters.md](/docs/apis/semesters.md)                 |
| Delete a semester                                                          | `DELETE`    | `/semesters`         | `token`, `semesterId`                                                                    | :white_check_mark: | [semesters.md](/docs/apis/semesters.md)                 |
| Get all main focuses                                                       | `GET`       | `/mainFocuses`       | `token`                                                                                  | :white_check_mark: | [mainFocus.md](/docs/apis/mainFocuses.md)               |
| Create a main focus                                                        | `POST`      | `/mainFocuses`       | `token`                                                                                  | :white_check_mark: | [mainFocus.md](/docs/apis/mainFocuses.md)               |
| Update a main focus                                                        | `PUT`       | `/mainFocuses`       | `token`, `mainFocusId`                                                                   | :white_check_mark: | [mainFocus.md](/docs/apis/mainFocuses.md)               |
| Delete a main focus                                                        | `DELETE`    | `/mainFocuses`       | `token`, `mainFocusId`                                                                   | :white_check_mark: | [mainFocus.md](/docs/apis/mainFocuses.md)               |
| Get all lecturers                                                          | `GET`       | `/lecturers`         | `token`, optional [coming soon]: `experience`, `comment`, `extern`, `lastname`, `extern` | :white_check_mark: | [lecturers.md](/docs/apis/lecturers.md)                 |
| Create a lecturer                                                          | `POST`      | `/lecturers`         | `token`                                                                                  | :white_check_mark: | [lecturers.md](/docs/apis/lecturers.md)                 |
| Update a lecturer                                                          | `PUT`       | `/lecturers`         | `token`, `lecturerId`                                                                    | :white_check_mark: | [lecturers.md](/docs/apis/lecturers.md)                 |
| Delete a lecturer                                                          | `DELETE`    | `/lecturers`         | `token`, `lecturerId`                                                                    | :white_check_mark: | [lecturers.md](/docs/apis/lecturers.md)                 |
| Get the CV of a specific lecturer                                          | `GET`       | `/lecturerCV`        | `token`, `lecturerId`                                                                    | :white_check_mark: | [lecturers.md](/docs/apis/lecturers.md)                 |
| [DEPRECATED] Update the CV of a specific lecturer                          | `POST`      | `/lecturerCV`        | `token`, `lecturerId`                                                                    | :end:              | [lecturers.md](/docs/apis/lecturers.md)                 |
| Update the CV of a specific lecturer                                       | `PUT`       | `/lecturerCV`        | `token`, `lecturerId`                                                                    | :white_check_mark: | [lecturers.md](/docs/apis/lecturers.md)                 |
| Delete the CV of a specific lecturer                                       | `DELETE`    | `/lecturerCV`        | `token`, `lecturerId`                                                                    | :white_check_mark: | [lecturers.md](/docs/apis/lecturers.md)                 |
| Get all fields of study                                                    | `GET`       | `/fieldsOfStudy`     | `token`, optional: `withMajorSubject`                                                    | :white_check_mark: | [fieldsOfStudy.md](/docs/apis/fieldsOfStudy.md)         |
| Create a field of study                                                    | `POST`      | `/fieldsOfStudy`     | `token`                                                                                  | :white_check_mark: | [fieldsOfStudy.md](/docs/apis/fieldsOfStudy.md)         |
| Update a field of study                                                    | `PUT`       | `/fieldsOfStudy`     | `token`, `fieldOfStudyId`                                                                | :white_check_mark: | [fieldsOfStudy.md](/docs/apis/fieldsOfStudy.md)         |
| Delete a field of study                                                    | `DELETE`    | `/fieldsOfStudy`     | `token`, `fieldOfStudyId`                                                                | :white_check_mark: | [fieldsOfStudy.md](/docs/apis/fieldsOfStudy.md)         |
| Get all major subjects for a given field of study                          | `GET`       | `/majorSubjects`     | `token`, `fieldOfStudyId`                                                                | :white_check_mark: | [majorSubjects.md](/docs/apis/majorSubjects.md)         |
| Update a major subject                                                     | `PUT`       | `/majorSubjects`     | `token`, `majorSubjectId`                                                                | :white_check_mark: | [majorSubjects.md](/docs/apis/majorSubjects.md)         |
| Delete a major subject                                                     | `DELETE`    | `/majorSubjects`     | `token`, `majorSubjectId`                                                                | :white_check_mark: | [majorSubjects.md](/docs/apis/majorSubjects.md)         |
| Get all presentations for a given course OR given lecturer                 | `GET`       | `/presentations`     | `token`, `courseId` OR `lecturerId`, optional: `semesterId`, `getCoLecturers`            | :white_check_mark: | [presentations.md](/docs/apis/presentations.md)         |
| Create a presentation                                                      | `POST`      | `/presentations`     | `token`                                                                                  | :white_check_mark: | [presentations.md](/docs/apis/presentations.md)         |
| Update a presentation                                                      | `PUT`       | `/presentations`     | `token`, `presentationId`                                                                | :white_check_mark: | [presentations.md](/docs/apis/presentations.md)         |
| Delete a presentation                                                      | `DELETE`    | `/presentations`     | `token`, `presentationId`                                                                | :white_check_mark: | [presentations.md](/docs/apis/presentations.md)         |
| Get all academic records                                                   | `GET`       | `/academicRecords`   | `token`                                                                                  | :white_check_mark: | [academicRecords.md](/docs/apis/academicRecords.md)     |
| Create a academic record                                                   | `POST`      | `/academicRecords`   | `token`                                                                                  | :white_check_mark: | [academicRecords.md](/docs/apis/academicRecords.md)     |
| Update a academic record                                                   | `PUT`       | `/academicRecords`   | `token`, `academicRecordId`                                                              | :white_check_mark: | [academicRecords.md](/docs/apis/academicRecords.md)     |
| Delete a academic record                                                   | `DELETE`    | `/academicRecords`   | `token`, `academicRecordId`                                                              | :white_check_mark: | [academicRecords.md](/docs/apis/academicRecords.md)     |
| Get everything needed to display a modulecatalog for a given major subject | `GET`       | `/modulecatalog`     | `token`                                                                                  | :white_check_mark: | [moduleGroups.md](/docs/apis/moduleGroups.md)           |
| Create a module group                                                      | `POST`      | `/moduleGroups`      | `token`                                                                                  | :white_check_mark: | [moduleGroups.md](/docs/apis/moduleGroups.md)           |
| Update a module group                                                      | `PUT`       | `/moduleGroups`      | `token`, `moduleGroupId`                                                                 | :white_check_mark: | [moduleGroups.md](/docs/apis/moduleGroups.md)           |
| Delete a module group                                                      | `DELETE`    | `/moduleGroups`      | `token`, `moduleGroupId`                                                                 | :white_check_mark: | [moduleGroups.md](/docs/apis/moduleGroups.md)           |
| Get all users eligible to transfer ownership to                            | `GET`       | `/usersForTransfer`  | `token`                                                                                  | :white_check_mark: | [transferOwnership.md](/docs/apis/transferOwnership.md) |
| Transfer everything connection to one director of studies to another       | `POST`      | `/transferOwnership` | `token`                                                                                  | :white_check_mark: | [transferOwnership.md](/docs/apis/transferOwnership.md) |

Legend:

- :white_check_mark: - finished
- :ballot_box_with_check: - development finished, review in progress
- :soon: - development in progress
- :parking: - api has been defined, development has not started yet &rarr; you can mock the api response
- :eight_pointed_black_star: - api being defined &rarr; route and parameters are prone to change
- :end: - api being reworked &rarr; will be discontinued and removed soon
- :no_entry: - removed
- :o2: - not started
