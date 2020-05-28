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
    - [example file for frontend developers](#example-file-for-frontend-developers)
  - [current status](#current-status)

# backend usage

## common setup
 1. Clone this project and checkout the master branch.
 2. Create a folder `env`.
 3. Create a file `app.properties` inside the env folder with the following properties (example values):

    ```
    app.port = 3000
    app.defaultUser = admin
    app.defaultPassword = defaultpasswordhere
    app.isAdmin = true
    app.forceSync = false

    server.user     = dhbw
    server.database = becker
    server.password = iH0p3youU5EaSecretPa$$word
    server.port = 5432
    server.dialect = postgres
    jwt.superSecret = TreevgQreNefpuUngHroreunhcgAvpugfTrznpug13
    server.host = postgres

    pepper = ErarFgvaxg

    ```

1. Create a file `.env` inside the `docker` folder with the following properties (example). Be sure, that the postgres password and user are like the server config in `app.properties`:

    ```
    postgres_user=dhbw
    postgres_password=iH0p3youU5EaSecretPa$$word
    postgres_port=5432
    pgadmin_user=project@dhbw.de
    pgadmin_password=test1234
    ```
2. Copy the server certifcates into the `/docker/nginx/ssl` directory. The certificate files can be found inside the `backend_doku->ssl` onedrive directory.

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
3. Select the correct environment for your usage and you are ready* to go.
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
If you want to know how to use the routes you can simply look at the postman collection.
Every route mentioned in the [api docs](/docs/api.md) is listed with example values for you to test.
All routes will be implemented as mentioned in the [api docs](/docs/api.md) &rarr; i. e. you can simply mock for frontend development by creating a json.file that consists of the specified answer in the [api docs](/docs/api.md).

### example file for frontend developers
Insted of using the unfinished route `lecturers` use json files like the following:

````json
{
    "message": "Successful",
    "payload": {
        "lecturers": [
            {
                "lecturer_id": 1,
                "firstname": "John",
                "lastname": "Doe",
                "academic_title": "Prof. Dr.",
                "email": "j.doe@thedoes.com",
                "salutation": "Herr",
                "phonenumber": "+1 1234 1234",
                "experience": "Schauspiel, Tanz",
                "main_focus": "Software Engineering",
                "profile": "[TO BE FILLED]",
                "research": "[TO BE FILLED]",
                "cv": "[TO BE FILLED]",
                "comment": "sehr engagiert",
                "is_extern": 0
            },
            {
                "lecturer_id": 2,
                "firstname": "Max",
                "lastname": "Musterfrau",
                "academic_title": "",
                "email": "max@die-mustermanns.de",
                "salutation": "Frau",
                "phonenumber": "+49 1234 4321",
                "experience": "Machine Learning, Computer Hardware, Business Intelligence",
                "main_focus": "Marketing",
                "profile": "[TO BE FILLED]",
                "research": "[TO BE FILLED]",
                "cv": "[TO BE FILLED]",
                "comment": "im notfall...",
                "is_extern": 2
            }
        ]
    }
}
````
Please note:
- `[TO BE FILLED]` values are still up to debate.
- In general respones are prone to change in the foreseeable future because of still to be caught up requirements.

Because you use [axios](https://github.com/axios/axios) you can import the file just like using the route.
(You need to replace `[JSON-FILE]` with your json file.)
````js
axios.get('[JSON-FILE]') // use file instead of route
  .then(
      // ...
  )
````

## current status

[Coming soon...] Routes that are defined but still in development will respond with http code `501` and message `Not yet implemented.`.

| route name                                       | http method | route             | parameters                                                                 | status                     |
| ------------------------------------------------ | ----------- | ----------------- | -------------------------------------------------------------------------- | -------------------------- |
| Register                                         | `POST`      | `/signup`         |                                                                            | :white_check_mark:         |
| Login                                            | `POST`      | `/login`          |                                                                            | :white_check_mark:         |
| Get all courses                                  | `GET`       | `/courses`        | `token`                                                                    | :soon:                     |
| Create a course                                  | `POST`      | `/courses`        | `token`                                                                    | :parking:                  |
| Update a course                                  | `PUT`       | `/courses`        | `token`, `courseId`                                                        | :parking:                  |
| Delete a course                                  | `DELETE`    | `/courses`        | `token`, `courseId`                                                        | :parking:                  |
| Update a semester                                | `PUT`       | `/semesters`      | `token`, `semesterId`                                                      | :parking:                  |
| Delete a semester                                | `DELETE`    | `/semesters`      | `token`, `semesterId`                                                      | :parking:                  |
| Get everything needed for the semesterview       | `GET`       | `/semesterview`   | `token`                                                                    | :soon:                     |
| Get all lecturers                                | `GET`       | `/lecturers`      | `token`, optional: `experience`, `comment`, `extern`, `lastname`, `extern` | :parking:                  |
| Create a new lecturer                            | `POST`      | `/lecturers`      | `token`                                                                    | :parking:                  |
| Update a lecturer                                | `PUT`       | `/lecturers`      | `token`, `lecturerId`                                                      | :parking:                  |
| Delete a lecturer                                | `DELETE`    | `/lecturers`      | `token`, `lecturerId`                                                      | :parking:                  |
| Create a lecture                                 | `POST`      | `/lectures`       | `token`                                                                    | :parking:                  |
| Update a lecture                                 | `PUT`       | `/lectures`       | `token`, `lectureId`                                                       | :parking:                  |
| Delete a lecture                                 | `DELETE`    | `/lectures`       | `token`, `lectureId`                                                       | :parking:                  |
| Get every field of study                         | `GET`       | `/fieldOfStudies` | `token`, optional: `withMajorSubject`                                      | :parking:                  |
| Create a new field of study                      | `POST`      | `/fieldOfStudies` | `token`                                                                    | :parking:                  |
| Update a field of study                          | `PUT`       | `/fieldOfStudies` | `token`, `fieldOfStudyId`                                                  | :parking:                  |
| Delete a field of study                          | `DELETE`    | `/fieldOfStudies` | `token`, `fieldOfStudyId`                                                  | :parking:                  |
| Get every major subject                          | `GET`       | `/majorSubjects`  | `token`, `fieldOfStudyId`                                                  | :parking:                  |
| Create a new major subject                       | `POST`      | `/majorSubjects`  | `token`                                                                    | :parking:                  |
| Update a major subject                           | `PUT`       | `/majorSubjects`  | `token`, `majorSubjectId`                                                  | :parking:                  |
| Delte a major subject                            | `DELETE`    | `/majorSubjects`  | `token`, `majorSubjectId`                                                  | :parking:                  |
| Get everything needed to display a modulecatalog | `GET`       | `/modulecatalog`  | `token`                                                                    | :eight_pointed_black_star: |

For more information on the api please take a look at the [api docs](/docs/api.md).

Legend:
- :white_check_mark: - finished
- :soon: - development in progress
- :parking: - api has been defined, development has not started yet &rarr; you can mock the api response
- :eight_pointed_black_star: - api being defined &rarr; route and parameters are prone to change
- :o2: - not started