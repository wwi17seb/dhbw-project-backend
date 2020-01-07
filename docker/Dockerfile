FROM node:11-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY api ./api
COPY config ./config
COPY queries ./queries
COPY sql ./sql
COPY tools ./tools
COPY app.js ./app.js
COPY env ./env

EXPOSE 3000
CMD [ "node", "app.js" ]