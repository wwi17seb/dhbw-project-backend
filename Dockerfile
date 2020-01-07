FROM node:11-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN apk add --no-cache make gcc g++ python && \
 # npm install && \
 # apk del make gcc g++ python

#RUN npm rebuild bcrypt --build-from-source

 
RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN echo "Bundle app source"
# Bundle app source
COPY api ./api
COPY config ./config
COPY queries ./queries
COPY sql ./sql
COPY tools ./tools
COPY app.js ./app.js
COPY env ./env

RUN echo "ADD certs"
# On Windows root will own the files, and they will have permissions 755
#COPY ./server.key  ./ca/server.key
#COPY ./server.crt ./ca/server.crt

RUN echo "update the privileges"
# update the privileges on the .key, no need to touch the .crt  
#RUN chmod 600 ./ca/server.key
#RUN chown postgres:postgres ./ca/server.key

EXPOSE 3000
CMD [ "node", "app.js" ]