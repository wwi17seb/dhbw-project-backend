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

server.user     = dhbw
server.host     = localhost
server.database = becker
server.password = [mySecretPw]
server.port     = 5432
server.dialect  = postgres

jwt.superSecret = [mySecretJWT]
```

# start server
- for deploying we suggest to use `nodemon` 
```
node app.js or nodemon app.js
```
Afterwards, you can test the API either via curl or through the web-UI with 
```
http://localhost:3000/docs
``` 
