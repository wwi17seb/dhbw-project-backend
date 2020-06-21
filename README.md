# dhbw-project-backend <!-- omit in toc -->

Please create feature branches and then use pull requests to merge to master branch.
Read more on https://guides.github.com/introduction/flow/.

## Content <!-- omit in toc -->

- [backend usage](#backend-usage)
  - [common setup](#common-setup)
  - [for backend developers](#for-backend-developers)
  - [for frontend developers](#for-frontend-developers)
  - [for demo usage (exoplan project)](#for-demo-usage-exoplan-project)
  - [shutdown or rebuilding the hole docker network](#shutdown-or-rebuilding-the-hole-docker-network)
- [postman setup](#postman-setup)
- [login](#login)
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

5.  Copy the server certifcates into the `/docker/nginx/ssl` directory. The certificate files can be found inside the `backend_doku->ssl` onedrive directory.

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

## shutdown or rebuilding the hole docker network

```
...\dhbw-project-backend\docker> docker-compose down

OR

...\dhbw-project-backend\docker> docker-compose -f docker-compose-backend.yaml down

OR

...\dhbw-project-backend\docker> docker-compose -f docker-compose-frontend.yaml down

```

# postman setup

1. Install postman.
2. Use the import function and import the collection and environments found inside the [postman](/postman) folder.
3. Select the correct environment for your usage and you are ready\* to go.
   1. "Peojekt-Backend" is for backend developers.
   2. "Peojekt-Frontend" is for frontend developers.
4. [frontend-only] When using postman to verify the routes please disable ssl certificate verification in postman.
   1. Disable _file &rarr; settings &rarr; ssl certificate verification_.

\* Routes that require an ID need to be filled by you.
These parameters have the value `[REQUIRED]` and need to be updated by you.

# login

You can use `admin` as login name with password `test` or its token `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTkwNjUzMTgzLCJleHAiOjE1OTkyOTMxODN9.MyEYyZJsyYr7ODop4Knv9RAWWzx7LnL_LlpkviFVqeU` to authenticate yourself.
To see how authentication with the token works take a look at the postman collection.
(It uses this token as variable `{{token}}`.)

# routes

## general information

If you want to know how to use the routes you can simply look at the postman collection or the [api docs](/docs/api.md).

## current status

| route name                                                                 | http method | route                | parameters                                                                               | status                  | docs                                                |
| -------------------------------------------------------------------------- | ----------- | -------------------- | ---------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------- |
| Register                                                                   | `POST`      | `/signup`            |                                                                                          | :white_check_mark:      | [auth.md](/docs/apis/auth.md)                       |
| Login                                                                      | `POST`      | `/login`             |                                                                                          | :white_check_mark:      | [auth.md](/docs/apis/auth.md)                       |
| Get all courses                                                            | `GET`       | `/courses`           | `token`                                                                                  | :ballot_box_with_check: | [courses.md](/docs/apis/courses.md)                 |
| Create a course                                                            | `POST`      | `/courses`           | `token`                                                                                  | :ballot_box_with_check: | [courses.md](/docs/apis/courses.md)                 |
| Update a course                                                            | `PUT`       | `/courses`           | `token`, `courseId`                                                                      | :ballot_box_with_check: | [courses.md](/docs/apis/courses.md)                 |
| Delete a course                                                            | `DELETE`    | `/courses`           | `token`, `courseId`                                                                      | :ballot_box_with_check: | [courses.md](/docs/apis/courses.md)                 |
| Create a semester                                                          | `POST`      | `/semesters`         | `token`                                                                                  | :ballot_box_with_check: | [semesters.md](/docs/apis/semesters.md)             |
| Update a semester                                                          | `PUT`       | `/semesters`         | `token`, `semesterId`                                                                    | :ballot_box_with_check: | [semesters.md](/docs/apis/semesters.md)             |
| Delete a semester                                                          | `DELETE`    | `/semesters`         | `token`, `semesterId`                                                                    | :ballot_box_with_check: | [semesters.md](/docs/apis/semesters.md)             |
| Get all main focuses                                                       | `GET`       | `/mainFocuses`       | `token`                                                                                  | :ballot_box_with_check: | [mainFocus.md](/docs/apis/mainFocuses.md)           |
| Create a main focus                                                        | `POST`      | `/mainFocuses`       | `token`                                                                                  | :ballot_box_with_check: | [mainFocus.md](/docs/apis/mainFocuses.md)           |
| Update a main focus                                                        | `PUT`       | `/mainFocuses`       | `token`, `mainFocusId`                                                                   | :ballot_box_with_check: | [mainFocus.md](/docs/apis/mainFocuses.md)           |
| Delete a main focus                                                        | `DELETE`    | `/mainFocuses`       | `token`, `mainFocusId`                                                                   | :ballot_box_with_check: | [mainFocus.md](/docs/apis/mainFocuses.md)           |
| Get all lecturers                                                          | `GET`       | `/lecturers`         | `token`, optional [coming soon]: `experience`, `comment`, `extern`, `lastname`, `extern` | :ballot_box_with_check: | [lecturers.md](/docs/apis/lecturers.md)             |
| Get the CV of a specific lecturer                                          | `GET`       | `/lecturerCV`        | `token`, `lecturerId`                                                                    | :ballot_box_with_check: | [lecturers.md](/docs/apis/lecturers.md)             |
| Create a lecturer                                                          | `POST`      | `/lecturers`         | `token`                                                                                  | :ballot_box_with_check: | [lecturers.md](/docs/apis/lecturers.md)             |
| Update a lecturer                                                          | `PUT`       | `/lecturers`         | `token`, `lecturerId`                                                                    | :ballot_box_with_check: | [lecturers.md](/docs/apis/lecturers.md)             |
| Delete a lecturer                                                          | `DELETE`    | `/lecturers`         | `token`, `lecturerId`                                                                    | :ballot_box_with_check: | [lecturers.md](/docs/apis/lecturers.md)             |
| Get all fields of study                                                    | `GET`       | `/fieldsOfStudy`     | `token`, optional: `withMajorSubject`                                                    | :ballot_box_with_check: | [fieldsOfStudy.md](/docs/apis/fieldsOfStudy.md)     |
| Create a field of study                                                    | `POST`      | `/fieldsOfStudy`     | `token`                                                                                  | :ballot_box_with_check: | [fieldsOfStudy.md](/docs/apis/fieldsOfStudy.md)     |
| Update a field of study                                                    | `PUT`       | `/fieldsOfStudy`     | `token`, `fieldOfStudyId`                                                                | :ballot_box_with_check: | [fieldsOfStudy.md](/docs/apis/fieldsOfStudy.md)     |
| Delete a field of study                                                    | `DELETE`    | `/fieldsOfStudy`     | `token`, `fieldOfStudyId`                                                                | :ballot_box_with_check: | [fieldsOfStudy.md](/docs/apis/fieldsOfStudy.md)     |
| Get all major subjects for a given field of study                          | `GET`       | `/majorSubjects`     | `token`, `fieldOfStudyId`                                                                | :ballot_box_with_check: | [majorSubjects.md](/docs/apis/majorSubjects.md)     |
| Update a major subject                                                     | `PUT`       | `/majorSubjects`     | `token`, `majorSubjectId`                                                                | :ballot_box_with_check: | [majorSubjects.md](/docs/apis/majorSubjects.md)     |
| Delete a major subject                                                     | `DELETE`    | `/majorSubjects`     | `token`, `majorSubjectId`                                                                | :ballot_box_with_check: | [majorSubjects.md](/docs/apis/majorSubjects.md)     |
| Get all presentations for a given course                                   | `GET`       | `/presentations`     | `token`, `courseId`, optional: `semesterId`                                              | :ballot_box_with_check: | [presentations.md](/docs/apis/presentations.md)     |
| Create a presentation                                                      | `POST`      | `/presentations`     | `token`                                                                                  | :ballot_box_with_check: | [presentations.md](/docs/apis/presentations.md)     |
| Update a presentation                                                      | `PUT`       | `/presentations`     | `token`, `presentationId`                                                                | :ballot_box_with_check: | [presentations.md](/docs/apis/presentations.md)     |
| Delete a presentation                                                      | `DELETE`    | `/presentations`     | `token`, `presentationId`                                                                | :ballot_box_with_check: | [presentations.md](/docs/apis/presentations.md)     |
| Get all academic records                                                   | `GET`       | `/academicRecords`   | `token`                                                                                  | :ballot_box_with_check: | [academicRecords.md](/docs/apis/academicRecords.md) |
| Create a academic record                                                   | `POST`      | `/academicRecords`   | `token`                                                                                  | :ballot_box_with_check: | [academicRecords.md](/docs/apis/academicRecords.md) |
| Update a academic record                                                   | `PUT`       | `/academicRecords`   | `token`, `academicRecordId`                                                              | :ballot_box_with_check: | [academicRecords.md](/docs/apis/academicRecords.md) |
| Delete a academic record                                                   | `DELETE`    | `/academicRecords`   | `token`, `academicRecordId`                                                              | :ballot_box_with_check: | [academicRecords.md](/docs/apis/academicRecords.md) |
| Get everything needed to display a modulecatalog for a given major subject | `GET`       | `/modulecatalog`     | `token`                                                                                  | :ballot_box_with_check: | [moduleGroups.md](/docs/apis/moduleGroups.md)       |
| Create a module group                                                      | `POST`      | `/moduleGroups`      | `token`                                                                                  | :ballot_box_with_check: | [moduleGroups.md](/docs/apis/moduleGroups.md)       |
| Update a module group                                                      | `PUT`       | `/moduleGroups`      | `token`, `moduleGroupId`                                                                 | :ballot_box_with_check: | [moduleGroups.md](/docs/apis/moduleGroups.md)       |
| Delete a module group                                                      | `DELETE`    | `/moduleGroups`      | `token`, `moduleGroupId`                                                                 | :ballot_box_with_check: | [moduleGroups.md](/docs/apis/moduleGroups.md)       |
| Transfer everything connection to one director of studies to another       | `POST`      | `/transferOwnership` | `token`                                                                                  | :ballot_box_with_check: | [transferOwnership.md](/docs/apis/transferOwnership.md)       |

Legend:

- :white_check_mark: - finished
- :ballot_box_with_check: - development finished, review in progress
- :soon: - development in progress
- :parking: - api has been defined, development has not started yet &rarr; you can mock the api response
- :eight_pointed_black_star: - api being defined &rarr; route and parameters are prone to change
- :o2: - not started
