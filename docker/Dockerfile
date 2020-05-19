FROM node:11-alpine

# Create app directory
WORKDIR /usr/src/app

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY database ./database
COPY controllers ./controllers
COPY env ./env
COPY helpers ./helpers
COPY models ./models
COPY routes ./routes
COPY services ./services
COPY sql ./sql
COPY app.js ./app.js

EXPOSE 3000
CMD [ "node", "app.js" ]