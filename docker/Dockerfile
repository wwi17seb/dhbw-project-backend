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
COPY tools ./tools
COPY app.js ./app.js
COPY models ./models
COPY routes ./routes
COPY services ./services
COPY env ./env
COPY database ./database
COPY controllers ./controllers

EXPOSE 3000
CMD [ "node", "app.js" ]