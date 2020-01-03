# dhbw-project-backend

Please create feature branches and then use pull requests to merge to master branch.
Read more on https://guides.github.com/introduction/flow/.

# installation
```
npm install
```

# setup
env/app.properties:
```
app.port = 3000

server.user     = 'postgres'
server.host     = 'localhost'
server.database = 'becker'
server.password = 'yourpasswordhere'
server.port     = 5342
```

# start server
```
swagger project start
```
Afterwards, you can test the API either via curl or through the web-UI with 
```
swagger project edit
``` 

There might be problems with curl if you're using it with the VSC powershell terminal.


# docker project setup 

## before starting
1. Clone front- and backend into the same directory
2. Create an .env file inside the /docker/ directory of the backend repo with the following (example) values:
    ```
    postgres_user=dhbw
    postgres_password=CcgNquB2EaYxtD2Bktv6BcGFJGEDQRaeS9yQd8KufBmy8NpnjZTGxS4fEd4dyWEEjG6zHjjt
    pgadmin_user=project@dhbw.de
    pgadmin_password=test1234
    ```
3. Copy the server certifcates into the /docker/nginx/ssl directory.

## start hole project

```
...\dhbw-project-backend> cd .\docker\
...\dhbw-project-backend\docker> docker-compose up --build 
```

## start development envirnoment for backend
```
...\dhbw-project-backend> cd .\docker\
...\dhbw-project-backend\docker> docker-compose -f docker-compose-backend.yaml up --build 
```

## shutdown

```
...\dhbw-project-backend\docker> docker-compose down

OR

...\dhbw-project-backend\docker> docker-compose -f docker-compose-backend.yaml down

```