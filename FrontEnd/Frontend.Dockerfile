# This is the docker file in charge of building and deploying both the API and the front end
FROM node:20.18.0 as build
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npx ng build

FROM nginx:1.27.2
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/app/browser /usr/share/nginx/html
