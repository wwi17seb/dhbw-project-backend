# dhbw-project-backend

Please create feature branches and then use pull requests to merge to master branch.
Read more on https://guides.github.com/introduction/flow/.

# How to use it

## common setup
 1. Clone this project and checkout the master branch.
 2. Create a folder `env`.
 3. Create a file `app.properties` inside the env folder with the following properties (example values):

    ```
    app.port = 3000
    server.user     = dhbw
    server.database = becker
    server.password = iH0p3youU5EaSecretPa$$word
    server.port     = 5432
    server.dialect  = postgres
    jwt.superSecret = TreevgQreNefpuUngHroreunhcgAvpugfTrznpug13
    server.host     = postgres

    pepper = ErarFgvaxg

    app.defaultUser = admin
    app.defaultPassword = defaultpasswordhere
    app.isAdmin = true
    ```

4. Create a file `.env` inside the `docker` folder with the following properties (example). Be sure, that the postgres password and user are like the server config in `app.properties`:

    ```
    postgres_user=dhbw
    postgres_password=iH0p3youU5EaSecretPa$$word
    pgadmin_user=project@dhbw.de
    pgadmin_password=test1234
    ```
5. Copy the server certifcates into the `/docker/nginx/ssl` directory. The certificate files can be found inside the `backend_doku->ssl` onedrive directory.

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
    ...\dhbw-project-backend\docker> docker-compose -f docker-compose-frontend.yaml up
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
