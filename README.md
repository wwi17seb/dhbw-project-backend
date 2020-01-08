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

# Test API (Swagger)
go to api/swagger/ and type
```
swagger project start
```
Afterwards, you can test the API either via curl or through the web-UI with 
```
swagger project edit
``` 

There might be problems with curl if you're using it with the VSC powershell terminal.

# Start Node Server
in the main folder, type this into the cmd:
```
node app.js
``` 
