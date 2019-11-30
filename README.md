# dhbw-project-backend

Please create feature branches and then use pull requests to merge to master branch.
Read more on https://guides.github.com/introduction/flow/.

# installation
```
npm install express pg properties-reader
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
node index.js
```
