# dhbw-project-backend

Please create feature branches and then use pull requests to merge to master branch.
Read more on https://guides.github.com/introduction/flow/.

# install node-express
```
npm install -g express
```

# install node-postgres (pg) to be able to connect to PostgreSQL
```
npm i express pg
```

# start server
```
node index.js
```

# load properties
```
npm i properties-reader
```

# properties
- create dir "env"  
- add app.properties to that dir 

# structure of app.properties
## Application port to run the node server
app.port=xxxxxx

## Database connection to postgres
server.user=xxxxxx
server.host= xxxxxx
server.database=xxxxxx
server.password=xxxxxx
server.port=xxxxxx