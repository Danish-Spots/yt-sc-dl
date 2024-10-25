# This is the docker file in charge of building and deploying both the API and the front end
FROM node:20.17.1
WORKDIR /app
COPY ./package.json ./package-lock-json ./
RUN npm install
